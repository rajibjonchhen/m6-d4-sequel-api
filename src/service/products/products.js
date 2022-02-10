import {Router} from 'express'
import Product from "./products-model.js";
import Review from '../reviews/reviews-model.js';
import sequelize,{ Op } from 'sequelize';

const productsRouter = Router()

// Implement search on products by  name, description
// Implement filters by price range
// order products in ASC/DESC order


// get all the products
productsRouter.get('/', async(req,res,next) => {
try {
    const products = await Product.findAll({
        include:[Review],
        order:[["createdAt", "DESC"]]
    })
    res.send(products)
} catch (error) {
    
}
});


// get with search
productsRouter.get("/search", async (req, res, next) => {
  try {
      console.log(req.query)
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${req.query.q}%`
              },
            },
            {
              description: {
                [Op.iLike]: `%${req.query.q}%`
              },
            },
            {
                category: {
                  [Op.iLike]: `%${req.query.q}%`
                },
              },
            {
                category: {
                  [Op.iLike]: `%${req.query.c}%`
                },
              },
              {
                brand: {
                  [Op.iLike]: `%${req.query.q}%`
                },
              },
              {
                price: {
                  [Op.between]: [0,parseInt(req.query.q)],
                },
              },
          ],
        },
        include: [Review],
      });
      res.send(products);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  //stats
  productsRouter.get("/stats", async (req, res, next) => {
    try {
      const stats = await Review.findAll({
        // select list : what you want to get ?
        attributes: [
          [
            sequelize.cast(
              // cast function converts datatype
              sequelize.fn("count", sequelize.col("product_id")), // SELECT COUNT(blog_id) AS total_comments
              "integer"
            ),
            "numberOfReviews",
          ],
        ],
        group: ["product_id", "product.id"],
        include: [{ model: Product}], // <-- nested include
      });
      res.send(stats);
    } catch (error) {
      res.status(500).send({ message: error.message });
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
            const products = await Product.findByPk(req.params.product_id)
            if(products)
                res.send(products)
                else
                res.status(404).send({msg:'product not found'})

        } catch (error) {
            
        }
        })

          // updating the product info by id 
     productsRouter.put('/:product_id', async(req,res,next) => {
        try {
            const [success, updatedProduct] = await Product.update(req.body,{
                where:{
                id:req.params.product_id
                }
            })

            if(success)
            res.status(204).send(updatedProduct)
            else    
            res.status(404).send({msg:"the product not found"})
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })
    

    // delete product
    productsRouter.delete('/:product_id', async(req,res,next) => {
        try {
            const newReview = await Product.destroy({
                where:{
                id:req.params.product_id
                }
            })
            res.status(204).send()
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })
export default productsRouter