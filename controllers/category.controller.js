const res = require('express/lib/response');
const Category = require('../schemas/category.schema')
const {responseCreator} = require('../utils/utils')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const getCategorys = async (req,res) => {
    try {
        
        const categories = await Category.find()

        if(!categories){
            return res.status(404).send({
                msg:`No se encontraron los Productos`
            }) 
        }else{
        return   res.status(200).send({
            msg: 'Productos obtenidos correctamente',
            categories: categories
        });
        }   
    } catch (error) {
        return res.status(500).send({
            msg: 'Error al Obtener los Productos',
            });
    }    
}

const addCategory = async (req,res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        return res.status(200).send('Categoria añadida correctamente');
        
    } catch (error) {
        return res.status(500).send('La categoria no se pudo guardar');
    }
    
}


const deleteCategory = async (req,res) => {
    try {
        const id = req.params.idProduct;
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

const getCategory = async (req,res) => {
    try {
        const idParam = req.params.id;
        if(!idParam){
        return res.status(400).send({
        mgs:`Es necesario que mande ID`
        })
        }

        const product = await Product.findById(idParam);    
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

async function updateCategory(req,res) {
    try {
    const id = req.query.id;
    const data = req.body

   const newProduct =  await Product.findByIdAndUpdate(id,data,{new:true})
    
   if(!newProduct){
        return res.status(404).send({
            msg:`El producto no se actualizo`
        }) 
   }

   
   return res.status(200).send({
            msg: 'Producto encontrado',
            newProduct: newProduct
        })
     
    } catch(error)  {
        console.log(error);
        return res.status(500).send({
            msg: `No se pudo actualizar el producto`
            })
        }
}

module.exports = {
    getCategorys,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
}