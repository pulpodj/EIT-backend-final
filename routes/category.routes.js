const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')


//obtener todas las categorias
router.get("/categorys",categoryController.getCategorys)

//obtener un categoria por su id
router.get("/categorys/:id",categoryController.getCategory)

//agregar un categoria
router.post("/categorys",categoryController.addCategory)

//Borrar un categoria
router.delete("/categorys/:id",categoryController.deleteCategory)

//actualizar una categoria
router.put("/categorys/",categoryController.updateCategory)

module.exports = router