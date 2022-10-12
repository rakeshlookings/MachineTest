const User = require('../models/user.model')
const {ROLES, SLOTS} = require('../utils/constants.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ENV = process.env
const addUser = async(body) => {
        const passwordHash = await bcrypt.hash(body.password,Number(ENV.SALT))
        const userObject =  new User({
            name:body.name, role: ROLES.USER, expertise:body.expertise, phone: body.phone, description: body.description,
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

const addDoctor = async(req) => {
    const body = req.body
    console.log(Object.keys(req.headers))
    const token = req.headers.authorization.split(':')[1]
    const role = jwt.verify(token, ENV.JWT_KEY)?.user?.role
    console.log(jwt.verify(token, ENV.JWT_KEY))
    if (role !== ROLES.SUPER_ADMIN) {
        throw new Error('Unauthorized entry')
    }
    const userObject =  new User({
        name:body.name, role: ROLES.DOCTOR, expertise:body.expertise, phone: body.phone,
        description: body.description,availableSlots:body.availableSlots
    })
    const user = await userObject.save()

    return {
        success: true,
        code: 201,
        payload:user,
        message: 'new user added to the database'
    }
}

const updateDoctor = async({body, params}) => {

    const token = header['Authorization'].split(':')[1]
    const role = jwt.verify(token, ENV.JWT_KEY).ROLE
    if (role !== ROLES.SUPER_ADMIN) {
        throw new Error('Unautorized entry')
    }
    
    const user = await User.updateOne({ _id:params.id }, body)

    return {
        success: true,
        code: 201,
        message: 'updated'
    }
}

const deleteDoctor = async({body, params}) => {

    const token = header['Authorization'].split(':')[1]
    const role = jwt.verify(token, ENV.JWT_KEY).ROLE
    if (role !== ROLES.SUPER_ADMIN) {
        throw new Error('Unautorized entry')
    }
    
    const user = await User.deleteOne({ _id:params.id })

    return {
        success: true,
        code: 200,
        message: 'updated'
    }
}

const listDoctor = async({body, params}) => {
    
    const user = await User.find()

    return {
        success: true,
        code: 200,
        payload:user,
        message: 'updated'
    }
}

const getDoctor = async({params}) => {
    
    const user = await User.find({ _id: params.id})

    return {
        success: true,
        code: 200,
        payload:user,
        message: 'updated'
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

const getSlots = async(req) => {
    
    return {
        success: true,
        code: 200,
        data:SLOTS,
        message: 'slots fetched sucessfully'
    }
}




module.exports = {
    addUser,
    getUserProfile,
    login,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    listDoctor,
    getDoctor, 
    getSlots
}