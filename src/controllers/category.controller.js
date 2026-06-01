const { createCategorySchema, updateCategorySchema } = require('../validations/category.validation');

const {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../services/category.service');

const create = async (req, res) => {
    try {
        const validatedData = createCategorySchema.parse(req.body);
        const category =  await createCategory(validatedData);
        res.status(201).json({
            success: true,
            data : category
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
        const categoryes = await getCategory();
        res.status(200).json({
            success: true,
            data: categoryes
        })
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
}

const findOne = async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);
        res.status(200).json({
            success : true,
            data: category
        })
    } catch (error) {
        res.status(404).json({
        success: false,
        message: error.message,
        });
    }
}

const update = async (req, res) => {
    try {
        const validatedData = updateCategorySchema.parse(req.body);
        const category = await updateCategory(req.params.id, validatedData)

        res.status(200).json({
            success : true,
            data : category
        })
    } catch (error) {
        res.status(400).json({
        success: false,
        message: error.message,
        });
    }
}

const remove = async (req, res) => {
    try {
        await deleteCategory(req.params.id);
        res.status(200).json({
            success : true,
            message : "kategori berhasil dihapus"
        })
    } catch (error) {
        res.status(404).json({
        success: false,
        message: error.message,
        });
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove
}