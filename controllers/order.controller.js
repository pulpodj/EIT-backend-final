const res = require('express/lib/response');
const Order = require('../schemas/order.schema')


const getOrders = async (req,res) => {
    try {
       const idUser = req.params.idUser; 
       const orders =  await Order.find({userId: idUser})
                       .populate('products.productId',{name:1,description:1,image:1})
                          
       if(!orders){
        res.status(401).send({
            msg: 'No hay ordenes'
        });
       }else{
        res.status(200).send({
            msg: 'Ordenes obtenidas correctamente',
            Ordenes: orders
        });

       }    
                    
        
    } catch (error) {
        res.status(500).send({
            msg: 'Error al obtener las Ordenes',
            error: error
        });
        console.log(error)

    }
    
    
}

const addOrder = async (req,res) => {
    try {
        const order = new Order(req.body)
        await order.save()
        res.status(200).send('Orden añadida correctamente');
    } catch (error) {
        res.status(500).send({
            msg: 'La orden no se pudo guardar',
            error: error
        });
        console.log(error)
    }       
}

const deleteOrder = async (req,res) => {
    try {
        const id = req.params.idOrder;
        const deleted = Order.findByIdAndDelete(id)
        if(!deleted){
        return res.status(404).send({mgr:'no se encontro la orden a borrar'});
        }
        return res.status(200).send({
            msg: 'Orden borrada correctamente',
            deleted
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: 'Error al borrar la orden'
        });
    }
    
}

const getOrder = async (req,res) => {
    try {
        const idParam = req.params.id;

        if(!idParam){
            return res.status(400).send({
            mgs:`Es necesario que mande ID`
            })
        }

        const order = Order.findById(idParam)    
        if(!order){
            return res.status(404).send({
                mgs:`No se encontro la orden`
            })
        }    
        res.status(200).send({
            msg: 'Orden borrada',
            order
        });
    

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: 'Error al borrar la orden'
        });
    }
    
    
}

async function updateOrder(req,res) {
    try {
    const id = req.query.id;
    const data = req.body

   const newOrder =  await Order.findByIdAndUpdate(id,data,{new:true})
    
   if(!newOrder){
        return res.status(404).send({
            msg:`La Orden no se actualizo`
        }) 
   }

   
   return res.status(200).send({
            msg: 'Orden encontrada',
            newOrder: newOrder
        })
     
    } catch(error)  {
        console.log(error);
        return res.status(500).send({
            msg: `No se pudo actualizar la orden`
            })
        }
}


module.exports = {
    getOrders,
    getOrder,
    addOrder,
    deleteOrder,
    updateOrder
}