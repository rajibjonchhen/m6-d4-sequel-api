import {Router} from 'express'
import Product from "./products-model.js";
import Review from '../reviews/reviews-model.js';
import sequelize,{ Op } from 'sequelize';
import Category from '../category/category-model.js';
const productsRouter = Router()

// Implement search on products by  name, description
// Implement filters by price range
// order products in ASC/DESC order


// get all the products
productsRouter.get('/', async(req,res,next) => {
try {
    const products = await Product.findAll({
        include:[Review,
           {
          model:Category,
        attributes:['name']}],
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
              sequelize.fn("count", sequelize.col("productId")), // SELECT COUNT(productId) AS total_comments
              "integer"
            ),
            "numberOfReviews",
          ],
        ],
        group: ["productId", "product.id"],
        include: [{ model: Product}], // <-- nested include
      });
      res.send(stats);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

   // getting the product by id 
   productsRouter.get('/:productId', async(req,res,next) => {
    try {
        const products = await Product.findOne({
          where:{
            id:req.params.productId
          },
          include:[Review, Category]
        })
        if(products)
            res.send(products)
            else
            res.status(404).send({msg:'product not found'})

    } catch (error) {
        
    }
    })

// post new products with multiple categories
productsRouter.post('/', async(req,res,next) => {
   try {
    const newProduct = await Product.create(req.body);
    if (req.body.categories) {
      for await (const categoryName of req.body.categories) {
        const category = await Category.create({ name: categoryName });
        await newProduct.addCategory(category, {
          through: { selfGranted: false },
        });
      }
    }
    // and add to product
    /*this will go and insert relationship to product_categories table*/
    /*find product by id and join Category,Review tables*/
    const productWithCategory = await Product.findOne({
      where: { id: newProduct.id },
      include: [Category, Review],
    });
    res.send(productWithCategory);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


productsRouter.post("/:productId/review", async (req, res, next) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      productId: req.params.productId,
    });
    res.send(newReview);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


  //to add product category
  productsRouter.post("/:productId/category", async (req, res, next) => {
    try {
      // find the product that you want to add category
      const product = await Product.findByPk(req.params.productId);
      console.log("req.params.productId",req.params.productId)
      if (product) {
        // create the category
        const category = await Category.create(req.body);
        // and add to product
        /*this will go and insert relationship to product_categories table*/
        await product.addCategory(category, { through: { selfGranted: false } });
        /*find product by id and join Category,Review tables*/
        res.send(category);
      } else {
        res.status(404).send({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

    // updating the product info by id 
     productsRouter.put('/:productId', async(req,res,next) => {
        try {
            const [success, updatedProduct] = await Product.update(req.body,{
                where:{
                id:req.params.productId
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
    productsRouter.delete('/:productId', async(req,res,next) => {
        try {
            const newReview = await Product.destroy({
                where:{
                id:req.params.productId
                }
            })
            res.status(204).send()
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        })
export default productsRouter