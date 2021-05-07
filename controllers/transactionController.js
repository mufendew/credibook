const {User,Account,Transaction} = require('../models')
const { Op } = require("sequelize");

class TransactionController{
    
    static getTransaction(req, res,next){
        let limit = req.query.limit || 10
        let offset = req.query.offset || 0

        let qlause = {
            where :{
                UserId : req.user.id
            },
            limit,
            offset
        }
        //order by 
        if (req.query.sort === "amount") {
            qlause.order = [["amount", req.query.by||"DESC"]]
        }else if(req.query.sort === "date"){
            qlause.order = [["date", req.query.by||"DESC"]]
        }

        //filter type
        if (req.query.type) {
            qlause.where = {
                ...qlause.where,
                type : req.query.type || "income"
            }
        }
        //amount range filter
        if (req.query.amountmin || req.query.amountmax) {
            qlause.where = {
                ...qlause.where,
                amount : {[Op.and]:[
                    {[Op.gte] : req.query.amountmin || 0},
                    {[Op.lte] : req.query.amountmax || 999999999999},
                ]}
            }
        }

        Transaction.findAll(qlause)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            if (err.name === "SequelizeDatabaseErrorr") {
                next({type : "SequelizeDatabaseError",msg : err.errors})
            }else{
                next(err)
            }
            
        })
    }
    static createTransaction(req, res,next){
        Transaction.create({
            UserId: req.user.id,
            amount: req.body.amount,
            type: req.body.type,
            note: req.body.note,
            date: req.body.date,
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            if (err.name === "SequelizeValidationError") {
                next({type : "SequelizeValidationError",msg : err.errors})
            }else{
                next(err)
            }
            
        })
    }
    static updateTransaction(req, res,next){
        Transaction.update({
            UserId: req.user.id,
            amount: req.body.amount,
            type: req.body.type,
            note: req.body.note,
            date: req.body.date,
        },{
            where:{
                id: req.params.id,
                UserId: req.user.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            if (err.name === "SequelizeValidationError") {
                next({type : "SequelizeValidationError",msg : err.errors})
            }else{
                next(err)
            }
            
        })
    }
    static deleteTransaction(req, res,next){
        Transaction.destroy({
            where:{
                id: req.params.id,
                UserId: req.user.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            if (err.name === "SequelizeValidationError") {
                next({type : "SequelizeValidationError",msg : err.errors})
            }else{
                next(err)
            }
            
        })
    }
    

}

module.exports = TransactionController

