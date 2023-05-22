const res = require('express/lib/response');
const User = require('../schemas/user.schema');
const bcrypt = require('bcrypt');
const {responseCreator} = require('../utils/utils')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


async function postUser(req,res){
    try {
        const user = new User(req.body);
        const passHash = await bcrypt.hash( user.password,saltRounds); 
        user.password = passHash;
        const newUser = await user.save();
        return res.status(201).send({
            msg:`Usuario creado correctamente`,
            user: newUser
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('El usuario no se pudo guardar');
    }
}

const login = async (req,res) => {
    try {
        const emailLogin = req.body.email;
        const passLogin = req.body.password;
        //chequeo si me pasaron los datos
        if(!emailLogin||!passLogin){
            return res.status(400).send({msg:`Datos del Login incompletos`})
        }
        //busco el usuario en la base
        const user = await User.findOne({email:emailLogin})

        if(!user){
            return res.status(404).send({
                msg:`Usuarios o Contraseña Incorrecto`
            }) 
        }

        const result = await bcrypt.compare(passLogin,user.password)
        if(!result){
            return res.status(404).send({
                msg:`Usuarios o Contraseña Incorrecto`
            }) 
        }

        user.password = undefined;

        const token = jwt.sign(user.toJSON(), secret)


        return res.status(201).send({
            msg:`Login Correcto`,
            token:token,
            user
        })

    } catch (error) {
        return responseCreator(res,500,'Error al querer hacer el Login')
    }
    

}

async function getUser(req,res){ 
    try {
        const id = req.params.id;
        
        if(req.user.role !== 'ADMIN_ROLE' && req.user._id !== id){
            return res.status(401).responseCreatore(res,401,"No puede obtener este usuario")
        }

        const user = await User.findById(id,{password:0});
        if(!user){
            return responseCreator(res,404,'No se encontro el usuario') 
        }
        return responseCreator(res,200,'Ususarios obtenidos correctamente',{user});
    } catch (error) {
        return responseCreator(res,500,'error al obtener usuarios')
    }
}

async function getAllUsers (req,res){
    try {
        const user = await User.find();
        if(!user){
            return res.status(404).send({msg:`No se encontraron del usuarios`})  
        }
        return responseCreator(res,200,'Ususarios obtenidos correctamente',{user})
    } catch (error) {
        return res.status(500).send({msg: `Error al obtener usuarios`})
    }
}

async function deleteUser(req,res){
    try {
        const id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser){
            return responseCreator(res,404,'No se encontro el usuario') 
        }
        return responseCreator(res,200,'Ususarios borrado correctamente',{deleteUser});
    } catch (error) {
        return responseCreator(res,500,'error al borrar usuarios')
    }

    
}

async function updateUser(req,res){

    try {
        const id = req.params.id;

        if(req.user.role !== 'ADMIN_ROLE' && id !== req.user._id){
            return responseCreator(res,401,'No tiene permiso para modificar')
        }

        const data = req.body;
        data.password = undefined;
        const updateUser = await User.findByIdAndUpdate(id,data,{new:true});
        if(!updateUser){
            return responseCreator(res,404,'No se encontro el usuario') 
        }
        return responseCreator(res,200,'Ususarios actualizado correctamente',{updateUser});
    } catch (error) {
        return responseCreator(res,500,'error al actualizar el usuarios')
    }
    
}

async function updatePassword(req,res){
    try {
        const id = req.params.id;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const user = await User.findById(id);
        if(!user){
            return responseCreator(res,404,'No se encontro el usuario') 
        }
        
        const pwdCompare = await bcrypt.compare(oldPassword,user.password)
        
        if(!pwdCompare)
            return responseCreator(res,401,'No se pudo modificar la contraseña')
            
        const nuevoPassword = await bcrypt.hash(newPassword,saltRounds);
        
        await User.findByIdAndUpdate (id,{password: nuevoPassword})
            
        return responseCreator(res,200,'Password actualizado correctamente');
    
    
    } catch (error) {
        console.log(error)
        return responseCreator(res,500,'error al actualizar el password')
    }
    
}

module.exports = {
    postUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
    login,
    updatePassword
}