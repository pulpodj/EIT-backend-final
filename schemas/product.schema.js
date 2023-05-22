const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true, minLenght: 3, maxLenght: 30},
    description: {type:String},
    price: {type: Number,required: true, min: 0, max:10000000},
    image: {type:String,required: true},
    stock: {type:Number, required: true,default: 1},
    active: {type:Boolean,required: true,default: true},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}, 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true

    }
})

module.exports = mongoose.model('Product',productSchema)