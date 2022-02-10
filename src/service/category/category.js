import {Router} from 'express'
import Category from './category-model.js';

const categoryRouter = Router()

// get all the Categories
categoryRouter.get('/', async(req,res,next) => {
try {
    const categories = await Category.findAll({})
    res.send(categories)
} catch (error) {
    res.status(500).send({msg:error.message})
}
});


// post new Categories
categoryRouter.post('/', async(req,res,next) => {
    try {
        const newCategory = await Category.create(req.body)
        res.send(newCategory)
    } catch (error) {
    res.status(500).send({msg:error.message})

    }
    })

     // getting the Category by id 
     categoryRouter.get('/:category_id', async(req,res,next) => {
        try {
            const newCategory = await Category.findByPk(req.params.category_id)
            res.send(newCategory)
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })

          // updating the Category info by id 
     categoryRouter.put('/:category_id', async(req,res,next) => {
        try {
            const [success, updatedCategory] = await Category.update(req.body,{
                where:{
                id:req.params.product_id
                }
            })

            if(success)
            res.status(204).send(updatedCategory)
            else    
            res.status(404).send({msg:"the Category not found"})
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })
    

    // delete Category
    categoryRouter.delete('/:category_id', async(req,res,next) => {
        try {
            const newCategory = await Category.destroy({
                where:{
                id:req.params.category_id
                }
            })
            res.status(204).send()
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })
export default categoryRouter