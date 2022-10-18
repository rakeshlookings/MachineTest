const BookService = require('../services/Book.service')
const validate = (body) => {
    let message = "Please provide adequate Information"

    if (!body?.name?.length || !body?.price?.length || !body?.author?.length) {
       if (!body?.name?.length) {
        message = message + ' name is missing'
       }
       if (!body?.price) {
        message = message + ' price is missing'
       }
       if (!body?.author?.length) {
        message = message + ' author is missing'
       }
       throw new Error(message)
    }
}
const create = async(req,res) => {
    try {
        validate(req.body)
        const response = await BookService.create(req)
        return res.status(201).json(response)
    } catch(err) {
        return res.status(400).json({
            message:err.message
        })
    }
}

const list = async(req,res) => {
    try {
        const response = await BookService.list(req)
        return res.status(200).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const getOne = async(req,res) => {
    try {
        const response = await BookService.getOne(req)
        return res.status(200).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const update = async(req,res) => {
    try {
        const response = await BookService.update(req)
        return res.status(200).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}
const remove = async(req,res) => {
    try {
        const response = await BookService.remove(req)
        return res.status(202).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}


module.exports = {
   create,
   update,
   list,
   getOne,
   remove
}
