import express from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.get('/profile/:id',async (req,res)=>{
    const userId = req.params.id;
    try {
        const userData = await prisma.user.findUnique({
            where:{
                id:userId
            },
            include:{
                posts:true
            }
        })
        if(!userData){
            res.status(404).send({
                message:"user not found"
            })
        }
        res.status(200).send({
            userData
        })
    } catch (error) {
        res.status(400).send({
            message:"error while fetching data",
            error
        })
    }
})
export default userRouter ;