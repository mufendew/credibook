const jwt = require('jsonwebtoken')
const {User} = require('../models')

const auth = (req,res,next) => {
    try {
        let {id,email,name} = jwt.verify(req.headers.token,process.env.JWT_SECRET)
        req.user = {id,email,name}
        console.log(id);
        next()
    } catch (error) {
        next({type : "unauthorized"})
    }    
}
const authGraph = (req,res,next) => {
    try {
        let {id,email,name} = jwt.verify(req.headers.token,process.env.JWT_SECRET)
        req.user = {id,email,name}
        console.log(id);
    } catch (error) {
        req.user = null
    }
    next()   
}

const authorization = (req, res, next) => {

    User.findByPk(req.user.id)
    .then((data) =>{
        if (data === null) {
            next({type : "Data Not Found"})
        }
        else if (data.role === "admin") {
            next();
        }else {
            next({type : "unauthorized"})
        }
    })
    .catch((err) =>{
        next(err)
    })
}

module.exports = {auth , authorization, authGraph}