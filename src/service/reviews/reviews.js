import {Router} from 'express'
import Review from './reviews-model.js';

const reviewsRouter = Router()

// get all the reviews
reviewsRouter.get('/', async(req,res,next) => {
try {
    const {offset = 0, limit = 9} = req.query
    const totalReview =  await Review.count({})
    const reviews = await Review.findAll({
        offset,
        limit
    })
    res.send(reviews)
} catch (error) {
    res.status(500).send({msg:error.message})
}
});


// post new reviews
reviewsRouter.post('/:productId/:userId', async(req,res,next) => {
    console.log(req.params.productId)
    console.log(req.params.userId)
    try {
        const newReview = await Review.create({
            ...req.body,productId:req.params.productId, userId:req.params.userId})
        res.send(newReview)
    } catch (error) {
    res.status(500).send({msg:error.message})

    }
    })

     // getting the review by id 
     reviewsRouter.get('/:reviewId', async(req,res,next) => {
        try {
            const newReview = await Review.findByPk(req.params.reviewId)
            res.send(newReview)
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })

          // updating the review info by id 
     reviewsRouter.put('/:reviewId', async(req,res,next) => {
        try {
            const [success, updatedReview] = await Review.update(req.body,{
                where:{
                id:req.params.productId
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
    reviewsRouter.delete('/:reviewId', async(req,res,next) => {
        try {
            const newReview = await Review.destroy({
                where:{
                id:req.params.reviewId
                }
            })
            res.status(204).send()
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })
export default reviewsRouter