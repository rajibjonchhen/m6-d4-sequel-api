import {Router} from 'express'
import Product from "./products-model.js";
import Review from './reviews-model.js';
const productsRouter = Router()

// get all the products
productsRouter.get('/', async(req,res,next) => {
try {
    const products = await Product.findAll({
        include:[Review]
    })
    res.send(products)
} catch (error) {
    
}
});

// post new products
productsRouter.post('/', async(req,res,next) => {
    try {
        const newProduct = await Product.create(req.body)
        res.send(newProduct)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
    })

     // getting the product by id 
     productsRouter.get('/:product_id', async(req,res,next) => {
        try {
            const products = await Product.findAll({})
            res.send(products)
        } catch (error) {
            
        }
        })

          // updating the product info by id 
     productsRouter.put('/:product_id', async(req,res,next) => {
        
        })
    

    // delete product
    productsRouter.delete('/:product_id', async(req,res,next) => {
        
        })
export default productsRouter