const router = require('express').Router();
// const product = require('./RProduct');
const {auth} = require('../middleware/auth')
const TransactionController = require('../controllers/transactionController')

router.use(auth)
router.get('/', TransactionController.getTransaction)
router.post('/', TransactionController.createTransaction)
router.put('/:id', TransactionController.updateTransaction)
router.delete('/:id', TransactionController.deleteTransaction)


module.exports = router