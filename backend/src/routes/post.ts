import express from "express";
import { PrismaClient } from "@prisma/client";

const postRouter = express.Router();
const prisma = new PrismaClient();

postRouter.get('/', async (req:any,res:any) => {
  try {
    const posts = await  prisma.post.findMany({
        include:{
            user:{
                select:{
                    username:true
                }
            }
        }
    });
    if(!posts)res.status(404).send({message:" no posts  found",postArray:[]})
        res.status(200).send({
            postArray:posts
    })
  } catch (error) {
    res.status.send({
        message:"error while fetching data",
        error
    })
  }
});

postRouter.post('/',async (req,res)=>{
    const {title,description,userId} = req.body;
    if(!title||!description||!userId){
        res.status(400).send({
            message:"incomplete request object"
        })
    }
    try {
        const newPost = await prisma.post.create({
        data:{
            userId,
            title,
            description
        }
    })
    res.status(200).send({
        message:"post created successfully",
        postId:newPost.id
    })
    } catch (error) {
        res.status(400).send({
            message:"error while fetching data",
            error
        })
    }
})
export default postRouter;