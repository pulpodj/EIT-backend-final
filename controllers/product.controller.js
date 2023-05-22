const res = require('express/lib/response');
const Product = require('../schemas/product.schema')
const {responseCreator} = require('../utils/utils')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const getProducts = async (req,res) => {
    try {
        // //limit la cantidad de productos por pagina
        // const itemLimit = 5;
        // //skip es el numero de pagina
        // const itemToSkip = itemLimit * ( req.query.skip - 1) ;
        const productos = await Product.find().sort({createdAt: 1}).populate('category')

        if(!productos){
            return res.status(404).send({
                msg:`No se encontraron los Productos`
            }) 
        }else{
        return   res.status(200).send({
            msg: 'Productos obtenidos correctamente',
            productos: productos
        });
        }   
    } catch (error) {
        return res.status(500).send({
            msg: 'Error al Obtener los Productos',
            });
    }    
}

const addProduct = async (req,res) => {
    try {
        const product = new Product(req.body)
        //product.image = req.image
        await product.save()
        return res.status(200).send('Producto añadido correctamente');
        
    } catch (error) {
        return res.status(500).send('El producto no se pudo guardar');
    }
    
}


const deleteProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(id)
    
        if(!deleteProduct){
            return res.status(404).send({mgr:'no se encontro el producto a borrar'});
            }

        return res.status(200).send({
            msg: 'Producto borrado correctamente',
            deleteProduct
        })
    
    }catch(error) {
        return res.status(500).send({
            msg: 'Error al borrar el producto'
        });
    }
}

const getProduct = async (req,res) => {
    try {
        const idParam = req.params.id;
        if(!idParam){
        return res.status(400).send({
        mgs:`Es necesario que mande ID`
        })
        }

        const product = await Product.findById(idParam).populate('category');    
        if(!product){
            return res.status(404).send({
                mgs:`No se encontro el producto`
            })
        }    
        res.status(200).send({
            msg: 'Producto encontrado',
            product
        });
    
    } catch (error) {
        return res.status(500).send({
            msg: 'Error al obtener el producto'
        });
    }
    
    
}

const updateProduct = async (req,res) => {
    try {
    const id = req.params.id;
    const data = req.body
    
    const updateProduct =  await Product.findByIdAndUpdate(id,data,{new:true})
    
    if(!updateProduct){
        return res.status(404).send({
            msg:`El producto no se actualizo`
        }) 
    }

   return res.status(200).send({
            msg: 'Producto actualizado correctamente',
            newProduct: updateProduct
        })
     
    } catch(error)  {
        console.log(error);
        return res.status(500).send({
            msg: `No se pudo actualizar el producto`
        })
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}