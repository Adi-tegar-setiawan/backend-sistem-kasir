const {z} = require('zod')

const createTransactionSchema = z.object({
    items : z.array(
        z.object({
            productId: z.string(),
            quantity : z.number().int().positive()
        })
    ).min(1)
})

module.exports = {
    createTransactionSchema
}