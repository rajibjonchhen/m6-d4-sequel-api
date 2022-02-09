import {Router} from 'express'
import pool from '../utils/db/connect.js'

const productsRouter = Router()

// get all the products
productsRouter.get('/', async(req,res,next) => {
try {
    const result = await pool.query(`
    SELECT 
        product_name,
        product_description,
            category,
            brand,
            price,
            image_url,
            comment,
            rating 
    FROM products 
    JOIN reviews 
    ON products.product_id = reviews.product_id;`)
    res.send(result.rows)
} catch (error) {
    res.status(500).send({msg:error.message})
}
});

// post new products
productsRouter.post('/', async(req,res,next) => {
    try {
        const result = await pool.query(`INSERT INTO 
        products(
            product_name,
            product_description,
            category,
            brand,
            price,
            image_url
            )
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *;`,
            [req.body.product_name,
            req.body.product_description,
            req.body.category,
            req.body.brand,
            req.body.price,
            req.body.image_url 
            ]);

        res.send(result.rows)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
    })

     // getting the product by id 
     productsRouter.get('/:product_id', async(req,res,next) => {
        try {
            const result = await pool.query(`SELECT 
            product_name,
            products.product_id As product_id,
            product_description,
            category,
            brand,
            price,
            image_url,
            comment,
            rating 
        FROM products 
        JOIN reviews 
        ON products.product_id = reviews.product_id
             WHERE products.product_id=$1;`, [req.params.product_id]);
            if(result.rows[0]){
                res.send(result.rows)
            } else{
                res.status(404).send({msg:"the product not found"})
            }
        
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
        })

          // updating the product info by id 
     productsRouter.put('/:product_id', async(req,res,next) => {
        try {
           const query = `UPDATE products SET ${Object.keys(req.body)
            .map((key,i) => `${key} = $${i+1}`)
            .join(",")} WHERE product_id = $${Object.keys(req.body).length+1} RETURNING *;`;
            const result =await pool.query(query,[
           ...Object.values(req.body),req.params.product_id
            ])
         
                res.send(result.rows[0])
        
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
        })
    

    // delete product
    productsRouter.delete('/:product_id', async(req,res,next) => {
        try {
            await pool.query(`DELETE FROM products WHERE product_id=$1;`,[req.params.product_id]);
                res.status(204).send()
        
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
        })
export default productsRouter