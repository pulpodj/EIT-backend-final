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

const addOrder = (req,res) => {
    const order = new Order(req.body)
    order.save().then(() => {
        res.status(200).send('Orden añadida correctamente');
    }).catch(error => {
        console.log(error)
        res.status(500).send('LA orden no se pudo guardar');
    })
    
}

const deleteOrder = (req,res) => {
    const id = req.params.idOrder;
    Order.findByIdAndDelete(id)
    .then((deleted) => {
        if(!deleted){
            return res.status(404).send({mgr:'no se encontro la orden a borrar'});
            }

        return res.status(200).send({
            msg: 'Orden borrada correctamente',
            deleted
        })
    })
    .catch(error => {
        console.log(error);
        return res.status(500).send({
            msg: 'Error al borrar la orden'
        });
    })
}

const getOrder = (req,res) => {
    const idParam = req.params.id;

if(!idParam){
    return res.status(400).send({
        mgs:`Es necesario que mande ID`
    })
}

    Order.findById(idParam).then((order) =>{    
        if(!order){
            return res.status(404).send({
                mgs:`No se encontro la orden`
            })
        }    
        res.status(200).send({
            msg: 'Orden borrada',
            order
        });
    })
    
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

async function getUserOrders(){
const userID = req.params.id;





}

module.exports = {
    getOrders,
    getOrder,
    addOrder,
    deleteOrder,
    updateOrder
}