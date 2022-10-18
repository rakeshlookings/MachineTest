const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const bookSchema = new Schema({
    name: {type:String, require:true},
    imageUrl: String,
    author:{type:String, require:true},
    pages:Number,
    price:{type:Number, require:true}
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
