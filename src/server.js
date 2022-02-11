import express from 'express'
import { authenticateDatabase } from './utils/db/connect.js'
import listEndpoints from 'express-list-endpoints'
// import pool from './utils/db/connect.js'
import productsRouter from './service/products/products.js'
import reviewsRouter from './service/reviews/reviews.js'
import usersRouter from './service/users/users.js'
import categoryRouter from './service/category/category.js'

const server = express()

const {PORT =5001} = process.env
//const result = await pool.query("SELECT NOW();")

server.use(express.json())


server.use('/products',productsRouter)
server.use('/reviews',reviewsRouter)
server.use('/users',usersRouter)
server.use('/category', categoryRouter)
server.listen(PORT, ()=> {
    authenticateDatabase()
    console.log("server has is running ",PORT)
})
console.table(listEndpoints(server))
server.on("error", (error)=> {
    console.log("server has stopped ",error)
})