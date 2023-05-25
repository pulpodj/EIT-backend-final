const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller')


//obtener todas las ordenes
router.get("/orders/:idUser/user",orderController.getOrders)

//obtener una Orden por su id
router.get("/orders/:id",orderController.getOrder)

//agregar una Orden
router.post("/orders",orderController.addOrder)

//Borrar una Orden
router.delete("/orders/:id",orderController.deleteOrder)

//actualizar una order
router.put("/orders/",orderController.updateOrder)



module.exports = router