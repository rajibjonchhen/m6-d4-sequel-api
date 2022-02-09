import {Router} from 'express'
import pool from '../utils/db/connect.js'

const reviewsRouter = Router()

// get all the reviews
reviewsRouter.get('/:product_id', async(req,res,next) => {
try {
    const result = await pool.query(`SELECT * FROM reviews WHERE product_id=$1;`,[req.params.product_id])
    res.send(result.rows)
} catch (error) {
    res.status(500).send({msg:error.message})
}
});

// post new reviews
reviewsRouter.post('/:product_id', async(req,res,next) => {
    try {
        const result = await pool.query(`INSERT INTO 
        reviews(
           comment,
           rating,
           product_id
            )
            VALUES($1,$2,$3)
            RETURNING *;`,
            [req.body.comment,
            req.body.rating,
            req.params.product_id
            ]);

        res.send(result.rows)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
    })

     // getting the review by id 
     reviewsRouter.get('/:review_id', async(req,res,next) => {
        try {
            const result = await pool.query(`SELECT * FROM reviews WHERE review_id=$1;`, [req.params.review_id]);
            if(result.rows[0]){
                res.send(result.rows)
            } else{
                res.status(404).send({msg:"the review not found"})
            }
        
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
        })

          // updating the review info by id 
     reviewsRouter.put('/:review_id', async(req,res,next) => {
        try {
           const query = `UPDATE reviews SET ${Object.keys(req.body)
            .map((key,i) => `${key} = $${i+1}`)
            .join(",")} WHERE review_id = $${Object.keys(req.body).length+1} RETURNING *;`;
            const result =await pool.query(query,[
           ...Object.values(req.body),req.params.review_id
            ])
         
                res.send(result.rows[0])
        
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
        })
    

    // delete review
    reviewsRouter.delete('/:review_id', async(req,res,next) => {
        try {
            await pool.query(`DELETE FROM reviews WHERE review_id=$1;`,[req.params.review_id]);
                res.status(204).send()
        
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
        })
export default reviewsRouter