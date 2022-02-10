import { Router } from "express";
import User from "./users-model.js";
import Review from '../reviews/reviews-model.js';

const usersRouter = Router()

usersRouter.get('/', async(req,res,next) => {
    try {
        const users = await User.findAll({})
        res.send(users)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
    });
    
    // post new users
    usersRouter.post('/', async (req,res,next) => {
        try {
            const newUser = await User.create(req.body)
            res.send(newUser)
        } catch (error) {
        res.status(500).send({msg:error.message})
        }
        });
    
         // getting the User by id 
         usersRouter.get('/:user_id', async(req,res,next) => {
            try {
                const newUser = await User.findByPk(req.params.user_id)
                res.send(newUser)
            } catch (error) {
            res.status(500).send({msg:error.message})
            }
            });
    
              // updating the User info by id 
         usersRouter.put('/:user_id', async(req,res,next) => {
            try {
                const [success, updatedUser] = await User.update(req.body,{
                    where:{
                    id:req.params.user_id
                    }
                })
    
                if(success)
                res.status(204).send(updatedUser)
                else    
                res.status(404).send({msg:"the User not found"})
            } catch (error) {
            res.status(500).send({msg:error.message})
            }
            });
        
    
        // delete User
        usersRouter.delete('/:user_id', async(req,res,next) => {
            try {
                const newUser = await User.destroy({
                    where:{
                    id:req.params.user_id
                    }
                })
                res.status(204).send()
            } catch (error) {
            res.status(500).send({msg:error.message})
            }
            });
export default usersRouter