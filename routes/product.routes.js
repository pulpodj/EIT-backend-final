const express = require('express');
const router = express.Router();
const productosController = require('../controllers/product.controller')
const jwtVerify = require('../middlewares/jwtVerify');
const isAdmin = require('../middlewares/isAdmin');
const uploadController = require('../controllers/upload.controller')

//obtener todos los productos
router.get("/products",productosController.getProducts)

//obtener un productos
router.get("/products/:id",productosController.getProduct)

//Agregar un productos
router.post("/products",[jwtVerify, isAdmin],uploadController.uploadProduct,productosController.addProduct)

//Borrar producto
router.delete("/products/:id",[jwtVerify, isAdmin],productosController.deleteProduct)

//actualizar el producto
router.put("/products/:id",[jwtVerify, isAdmin],productosController.updateProduct)

//actualizar imagen del producto
router.put("/products/:id/image",[jwtVerify,isAdmin],uploadController.uploadProduct,productosController.updateProduct)

module.exports = router