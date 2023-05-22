const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')


//obtener todas las categoria
router.get("/categorys",categoryController.getCategorys)

//obtener un categoria
router.get("/categorys/:id",categoryController.getCategory)

//agregar un categoria
router.post("/categorys",categoryController.addCategory)

//Borrar un categoria
router.delete("/categorys/:id",categoryController.deleteCategory)

//actualizar el categoria
router.put("/categorys/",categoryController.updateCategory)

module.exports = router