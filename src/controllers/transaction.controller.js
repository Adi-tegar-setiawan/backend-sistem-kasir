const { createTransactionSchema } = require('../validations/transaction.validation')
const { createTransaction, getTransactions, getTransactionsById } = require('../services/transaction.service')

const create = async (req, res) => {
    try {
        const validatedData = createTransactionSchema.parse(req.body)
        const result = await createTransaction(req.user.id, validatedData.items)
        res.status(201).json({
            success : true,
            data : result
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const findAll = async (req, res) => {
    try {
        const { userId, date} = req.query;
        const transaction = await getTransactions(userId, date);
        res.status(200).json({
            success : true,
            data : transaction
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

const findOne = async (req, res) => {
    try {
        const transaction = await getTransactionsById(req.params.id)
        res.status(200).json({
            success : true,
            data : transaction
        })
    } catch (error) {
        res.status(404).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {
    create,
    findOne,
    findAll
}