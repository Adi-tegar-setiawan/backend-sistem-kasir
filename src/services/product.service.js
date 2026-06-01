const prisma = require('../lib/prisma')

const createProduct = async (data) => {
    const category = await prisma.category.findUnique({
        where : {
            id: data.categoryId
        }
    })

    if (!category) {
        throw new Error("kategori tidak ditemukan")
    }
    return prisma.product.create({
        data,
        include : {
            category: true
        }
    })
}

const getProducts = async (search, page, limit) => {
    const skip = (page - 1) * limit;
    const where =  search ? {
        name : {
            contains : search,
            mode : 'insensitive'
        }
    } : {};

    const products =
        await prisma.product.findMany({
            where: {
                ...where,
                deletedAt: null
            },

            include: {
                category: true
            },

            skip,
            take: limit
        });

    const total = await prisma.product.count({
        where: {
            ...where,
            deletedAt: null
        }
    });

    return {
        products,
        pagination : {
            total,
            page,
            limit,
            totalPage : Math.ceil(total / limit)
        }
    }
}

const getProductById = async (id) => {
    const product =
        await prisma.product.findFirst({
            where: {
                id,
                deletedAt: null
            },

            include: {
                category: true
            }
        });

    if (!product) {
        throw new Error(
            "produk tidak ditemukan"
        );
    }

    return product;
}

const updateProduct = async (id, data) => {
    await getProductById(id);
        const category = await prisma.category.findUnique({
            where : {
                id: data.categoryId
            }
        })

    if(!category) {
        throw new Error('kategori tidak ditemukan')
    }

    return prisma.product.update({
        where: {
            id
        },
        data,
        include : {
            category: true
        }
    })
}

const deleteProduct = async (id) => {
    const product = await getProductById(id)

    return prisma.product.update({
        where: {
            id
        },
        data: {
            deletedAt: new Date()
        }
    });
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}