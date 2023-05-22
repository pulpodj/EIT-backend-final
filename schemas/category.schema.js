const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, required: true, minLenght: 3, maxLenght: 30,unique:true},
    description: {type:String}
    
})

module.exports = mongoose.model('Category',CategorySchema)