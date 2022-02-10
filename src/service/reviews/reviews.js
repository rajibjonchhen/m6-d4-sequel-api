import {Router} from 'express'
import Review from './reviews-model.js';

const reviewsRouter = Router()

// get all the reviews
reviewsRouter.get('/', async(req,res,next) => {
try {
    const reviews = await Review.findAll({})
    res.send(reviews)
} catch (error) {
    res.status(500).send({msg:error.message})
}
});

// post new reviews
reviewsRouter.post('/:product_id/:user_id', async(req,res,next) => {
    try {
        const newReview = await Review.create({
            ...req.body,productId:req.params.product_id, userId:req.params.user_id})
        res.send(newReview)
    } catch (error) {
    res.status(500).send({msg:error.message})

    }
    })

     // getting the review by id 
     reviewsRouter.get('/:review_id', async(req,res,next) => {
        try {
            const newReview = await Review.findByPk(req.params.review_id)
            res.send(newReview)
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })

          // updating the review info by id 
     reviewsRouter.put('/:review_id', async(req,res,next) => {
        try {
            const [success, updatedReview] = await Review.update(req.body,{
                where:{
                id:req.params.product_id
                }
            })

            if(success)
            res.status(204).send(updatedReview)
            else    
            res.status(404).send({msg:"the review not found"})
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })
    

    // delete review
    reviewsRouter.delete('/:review_id', async(req,res,next) => {
        try {
            const newReview = await Review.destroy({
                where:{
                id:req.params.review_id
                }
            })
            res.status(204).send()
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })
export default reviewsRouter