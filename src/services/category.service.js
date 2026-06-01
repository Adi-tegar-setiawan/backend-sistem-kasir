const prisma = require('../lib/prisma')

const createCategory = async (data) => {
    const existingCategory = await prisma.category.findUnique({
        where: {
            name: data.name
        }
    })

    if (existingCategory) {
        throw new Error("Kategori sudah ada")
    }

    return prisma.category.create({
        data
    })
}

const getCategory = async () => {
    return prisma.category.findMany({
        orderBy : {
            createdAt : "desc"
        }
    })
}

const getCategoryById = async (id) => {
    const category =  await prisma.category.findUnique({
        where : {
            id
        }
    })

    if (!category) {
        throw new Error("Kategori tidak ditemukan")
    }

    return category
}

const updateCategory =  async (id, data) => {
    await getCategoryById(id);

    return prisma.category.update({
        where: {
            id
        },
        data
    })
}

const deleteCategory = async (id) => {
    await getCategoryById(id);
    return prisma.category.delete({
        where: {
            id
        }
    })
}

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}