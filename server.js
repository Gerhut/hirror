require('dotenv').config()
const Koa = require('koa')

const app = new Koa()
app.use(require('.')(process.env['TARGET']))
app.listen(process.env['PORT'])
