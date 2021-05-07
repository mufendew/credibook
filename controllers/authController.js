const {User,Account} = require('../models')
const {hash,compare} = require('../helper/hash')
const { generateToken } = require('../helper/jwt-help.js');

class authController{
    static login(req, res, next){
        User.findOne({
            where: {
                username: req.body.username,
            }
        })
        .then(({id,name,username,password}) => {
            if (id && compare(req.body.password, password)) {
                const token = generateToken({id, name, username})
                res.status(200).json({id,name,username,token})
            }else{
                next({type : "wrong credential"})
            }
        })
        .catch(err =>{
            next({type : "wrong credential"})
        })
    }

    static register(req, res,next){
        User.create({
            name: req.body.name,
            username: req.body.username,
            password: hash(req.body.password)
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            if (err.name === "SequelizeValidationError") {
                next({type : "SequelizeValidationError",msg : err.errors})
            }else if(err.name === "SequelizeUniqueConstraintError"){
                next({type : "SequelizeUniqueConstraintError",msg : err.errors})
            }else{
                next(err)
            }
            
        })
    }
    

}

module.exports = authController

