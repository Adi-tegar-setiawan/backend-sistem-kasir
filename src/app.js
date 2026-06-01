const express = require('express');
const cors = require('cors');

const app = express();

const routerUser = require('./routes/auth.route');
const adminRoute = require('./routes/admin.route');
const categoryRoute = require('./routes/category.route');
const productRoute = require('./routes/product.route');
const transactionRoute = require('./routes/transaction.route');

app.use(cors())
app.use(express.json())


app.use('/api/auth', routerUser)
app.use('/api/admin', adminRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/products', productRoute)
app.use('/api/transactions', transactionRoute)


module.exports = app;