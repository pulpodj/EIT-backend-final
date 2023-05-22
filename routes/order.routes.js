const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller')


//obtener todas las ordenes
router.get("/orders/:idUser/user",orderController.getOrders)

//obtener un Orden
router.get("/orders/:id",orderController.getOrder)

//agregar un Orden
router.post("/orders",orderController.addOrder)

//Borrar un Orden
router.delete("/orders/:id",orderController.deleteOrder)

//actualizar el order
router.put("/orders/",orderController.updateOrder)



module.exports = router