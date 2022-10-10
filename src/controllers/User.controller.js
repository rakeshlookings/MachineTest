const userService = require('../services/User.service')
const { validator } = require('../utils/validator')
require('express')
const addUser = async(req,res) => {
    try {
        const response = await userService.addUser(req.body)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const addDoctor = async(req,res) => {
    try {
        const response = await userService.addDoctor(req.body)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const updateDoctor = async(req,res) => {
    try {
        const response = await userService.updateDoctor(req.body)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const removeDoctor = async(req,res) => {
    try {
        const response = await userService.updateDoctor(req.body)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const listDoctors = async(req,res) => {
    try {
        const response = await userService.updateDoctor(req.body)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const showDoctorProfile = async(req,res) => {
    try {
        const response = await userService.updateDoctor(req.body)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const getUserProfile = async(req,res) => {
    try {
        const response = await userService.getUserProfile(req)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const login = async(req,res) => {
    try {
        const errorCheck = validator(req)
        if (!errorCheck.status) {
            return res.status(401).json({
                message:'fields are missing',
            })
        }
        const response = await userService.login(req.body)
        return res.status(200).json(response)
    } catch(err) {
        const response = await res.status(401).json({
            message:err.message
        })
        return response
    }
}

module.exports = {
    addUser,
    getUserProfile,
    login,
    addDoctor
}