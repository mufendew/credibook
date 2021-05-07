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


module.exports = {auth , authorization, authGraph}