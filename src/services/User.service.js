const User = require('../models/user.model')
const {ROLES} = require('../utils/constants.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ENV = process.env
const addUser = async(body) => {
        const passwordHash = await bcrypt.hash(body.password,Number(ENV.SALT))
        const userObject =  new User({
            name:body.name, role: body.role, expertise:body.expertise, phone: body.phone, description: body.description,
            password:passwordHash
        })
        const user = await userObject.save()
        delete user.password;
        delete user.__v;

        const jsonWebToken = await jwt.sign({
            user:user
        },ENV.JWT_KEY)

        return {
            success: true,
            code: 201,
            jwt:jsonWebToken,
            message: 'new user added to the database'
        }
}

const addDoctor = async(body) => {
    const userObject =  new User({
        name:body.name, role: ROLES.DOCTOR, expertise:body.expertise, phone: body.phone, description: body.description
    })
    const user = await userObject.save()

    return {
        success: true,
        code: 201,
        payload:user,
        message: 'new user added to the database'
    }
}


const login = async(body) => {

    const user = await User.findOne({
        phone:body.phone
    })

    if (!user){
        return {
            success:false,
            message:'user does not exist',
            code: 401
        }
    }

    const match = await bcrypt.compare(body.password, user.password)

    if (!match) {
        return {
            success:false,
            message:'incorrect login information',
            code: 401
        }
    }

    delete user.password;
    delete user.__v;

    const jsonWebToken = await jwt.sign({
        user:user
    },ENV.JWT_KEY)

    return {
        success: true,
        code: 200,
        jwt:jsonWebToken,
        message: 'logged in successfully'
    }
}


const getUserProfile = async(req) => {
    
    return {
        success: true,
        code: 201,
        data:JSON.stringify(req.oidc.user),
        message: 'user profile fetched sucessfully'
    }
}

module.exports = {
    addUser,
    getUserProfile,
    login,
    addDoctor
}