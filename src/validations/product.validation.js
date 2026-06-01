const { z } = require('zod');

const createProductSchema = z.object({
    name : z.string().min(3, "nama produk minimal 3 karakter"),
    description : z.string().optional(),
    image : z.string().optional(),
    price : z.number().positive("harga harus lebih dari 0"),
    stock : z.number().int().nonnegative("stok tidak boleh negatif"),
    categoryId : z.string()
})

const updateProductSchema = createProductSchema.partial();

module.exports = {
    createProductSchema,
    updateProductSchema
}