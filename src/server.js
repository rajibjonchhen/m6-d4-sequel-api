import express from 'express'
// import { authenticateDatabase } from './utils/db/connect.js'
import pool from './utils/db/connect.js'
import productsRouter from './service/products.js'
import reviewsRouter from './service/reviews.js'

const server = express()

const {PORT =5001} = process.env
// const result = await pool.query("SELECT NOW();")

server.use(express.json())
server.use('/products',productsRouter)
server.use('/reviews',reviewsRouter)
server.listen(PORT, ()=> {
    //  authenticateDatabase()
    console.log("server has is running ",PORT)
})

server.on("error", (error)=> {
    console.log("server has stopped ",error)
})