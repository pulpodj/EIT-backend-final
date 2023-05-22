const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {type: String, required: true, minLenght: 6, maxLenght: 150},
    email: {
            type: String, 
            required: true, 
            minLenght: 6, 
            maxLenght: 150,
            unique: true,
            index: true,
            validate: {
                validator: function(value){
                    return /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(value) 
                },
                message:props => `${props.value} no se un correo válido`
            }
        },
    password: {type: String, required: true, minLenght: 8, maxLenght: 150},
    role: {type: String, required: true, default: 'CLIENT_ROLE',
    enum: [
        'SUPERADMIN_ROLE',
        'ADMIN_ROLE',
        'USER_ROLE',
        'CLIENT_ROLE'
        ]},
    gender: {type: String, required: true, minLenght: 3, maxLenght: 30},
    date: {type: Date},
    country: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: Date.now}
    
})

module.exports = mongoose.model('User',userSchema)