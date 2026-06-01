const { createProductSchema, updateProductSchema } = require('../validations/product.validation')

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../services/product.service')

const create = async (req, res) => {
    try {
        const validatedData = createProductSchema.parse(req.body)
        const product = await createProduct(validatedData)
        res.status(201).json({
            success: true,
            data : product
        })
    } catch (error) {
        res.status(400).json({
        success: false,
        message: error.message,
        });
    }
}

const findAll = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getProducts(search, page, limit);
        res.status(200).json({
            success : true,
            ...result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

const findOne = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        res.status(200).json({
            success : true,
            data : product
        })
    } catch (error) {
        res.status(404).json({
            success : false,
            message : error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const validatedData = updateProductSchema.parse(req.body);
        const product = await updateProduct(req.params.id, validatedData)
        res.status(200).json({
            success : true,
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message : error.message
        })
    }
}

const remove = async (req, res) => {
    try {
        await deleteProduct(req.params.id)
        res.status(200).json({
            success: true,
            message : "product berhasil dihapus"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message : error.message
        })
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove
}