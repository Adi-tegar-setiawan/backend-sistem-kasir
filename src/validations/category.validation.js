const { z } = require('zod');

const createCategorySchema = z.object({
    name : z.string().min(3, "Nama kategori minimal 3 karakter").max(50, "Nama kategori maksimal 50 karakter")
})

const updateCategorySchema = z.object({
    name : z
    .string()
    .min(3, "Nama kategori minimal 3 karakter")
    .max(50, "Nama kategori maksimal 50 karakter"),
})

module.exports = {
    createCategorySchema,
    updateCategorySchema
}