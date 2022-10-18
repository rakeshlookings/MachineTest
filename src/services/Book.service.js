const { body } = require('express-validator')
const Book = require('../models/book.model')

const create = async({body}) => {
    const object =  new Book({
        name:body.name, author: body.author, price:body.price, phone: body.phone, imageUrl: body.imageUrl,
        pages:body.pages
    })
    const obj = await object.save()
    return {
        status: true,
        obj:obj
    }
}

const list = async() => {
    const books = await Book.find().lean()
    return {
        status:true,
        items: books
    }
}

const getOne = async({params}) => {
    const book = await Book.findOne({_id:params.id}).lean()
    return {
        status:true,
        items: book
    }
}

const createUpdationObject = (body) => {
    const object =  {}
    if (body.name) {
        object.name = body.name
    }
    if (body.price) {
        object.price = body.price
    }
    if (body.pages) {
        object.pages = body.pages
    }
    if (body.author) {
        object.author = body.author
    }
    if (body.imageUrl) {
        object.imageUrl = body.imageUrl
    }
    return object
}

const update = async({params,body}) => {
  
    const object = createUpdationObject(body)
    const obj = await Book.updateOne({_id:params.id },object)
    return {
        status: true,
        items:obj
    }
}

const remove = async({params}) => {
    const obj = await Book.deleteOne({_id:params.id })
    return {
        status: true
    }
}

module.exports = {
   create,
   update,
   list,
   getOne,
   remove
}
