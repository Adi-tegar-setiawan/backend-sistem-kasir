const prisma = require('../lib/prisma')


const createTransaction = async (userId, items) => {
    let totalAmount = 0;
    const transactionItems = [];

    for (const item of items) {
        const product = await prisma.product.findFirst({
        where: {
            id: item.productId,
            deletedAt: null
        }
    });

        if(!product) {
            throw new Error('produk tidak ditemukan')
        }

        if(product.stock < item.quantity) {
            throw new Error(`stok ${product.name} tidak cukup`)
        }

        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;

        transactionItems.push({
            productId: product.id,
            quantity : item.quantity,
            price : product.price,
            subtotal
        })
    }

    const result = await prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.create({
            data : {
                userId,
                totalAmount
            }
        })

        for (const item of transactionItems) {
            await tx.transactionItem.create({
                data : {
                    transactionId : transaction.id,
                    productId : item.productId,
                    quantity : item.quantity,
                    price: item.price,
                    subtotal : item.subtotal
                }
            })

            await tx.product.update({
                where : {
                    id: item.productId
                },
                data : {
                    stock : {
                        decrement : item.quantity
                    }
                }
            })
        }
        return transaction
    })
    return result
}

const getTransactions = async (userId, date) => {
    const where = {};
    if(userId){
        where.userId = userId
    }

    if(date) {
        const startDate = new Date(date);
        const endDate = new Date(date)
        endDate.setDate(endDate.getDate() + 1)

        where.createdAt = {
            gte : startDate,
            lt: endDate
        }
    }
    return prisma.transaction.findMany({
        where,
        include : {
            user : {
                select : {
                    id: true,
                    username : true,
                    email: true
                }
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    })
}

const getTransactionsById =  async (id) => {
    const transaction = await prisma.transaction.findUnique({
        where : {
            id
        },
        include : {
            user : {
                select : {
                    id: true,
                    username : true,
                    email : true
                }
            },
            items : {
                include : {
                    product : true
                }
            }
        }
    });

    if(!transaction) {
        throw new Error('transakasi tidak ditemukan')
    }

    return transaction
}

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionsById
}