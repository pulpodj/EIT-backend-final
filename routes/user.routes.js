const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwtVerify = require('../middlewares/jwtVerify');
const isAdmin = require('../middlewares/isAdmin');

//obtener todos los usuarios
router.get("/users", [jwtVerify, isAdmin],userController.getAllUsers)

//obtener un usuario segun su id
router.get("/users/:id", jwtVerify,userController.getUser)

//Agregar un usuario
router.post("/users",userController.postUser)

//borrar usuario
router.delete("/users/:id",[jwtVerify, isAdmin],userController.deleteUser)

//Actualizar Usuario
router.put("/users/:id",jwtVerify,userController.updateUser)

//Actualizar Password
router.put("/users/:id/password",jwtVerify,userController.updatePassword)

//login
router.post("/login",userController.login)

module.exports = router