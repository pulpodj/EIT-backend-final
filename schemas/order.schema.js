const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            productId: {type:Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number,required: true, min: 1},
            price: {type: Number,required: true, min: 0, max:10000000}
        }
       ],
    total: {type: Number,required: true, min: 1, max:10000000},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type:Date , required:true,default: Date.now},
    status:{type:String, default:'onhold' , enum:['onhold','inprogress','done']},
    updateAt:{type:Date , required:true,default: Date.now},
    observaciones: {type:String}
})

module.exports = mongoose.model('Order',orderSchema)