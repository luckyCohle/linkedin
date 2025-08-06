import express from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const authRouter = express.Router();
const prisma = new PrismaClient();
const secret = "mysecret";

authRouter.post('/login',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log("req body=> ");
    console.log(req.body)
    if(!email || !password){
        return res.status(401).send({
            message:"email and password is required"
        })
    }

    try {
        const userData = await prisma.user.findFirst({
        where:{
            email
        }        
    }) 
        if(!userData){
            return res.status(402).send({
                message:"user not found"
            })
        }
        // console.log("password => "+userData.password+", "+password)
        const isCorrPwd = await bcrypt.compare(password,userData?.password||"");

        if(!isCorrPwd){
            return res.status(403).send({
                message:"incorrect password"
            })
        }

        const jwtPayload = {
            id:userData?.id,
            email:userData?.email
        }
        const token = jwt.sign(jwtPayload,secret);

        return res.status(200).send({
            message:"login successfull",
            token:token
        })
        
    } catch (error) {
        return res.send({
            message:"error while fetching data",
            error: error 
        })
    }

   
})

authRouter.post('/signup',async (req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const imgUrl = req.body.img;
    console.log("req body=> ");
    console.log(req.body)
    if(!email || !password ||!username){
        return res.status(401).send({
            message:"email , username and password is required"
        })
    }

    try {
        const userData = await prisma.user.findFirst({
        where:{
            email
        }        
    }) 
        if(userData){
            return res.status(402).send({
                message:"user already exists"
            })
        }
        const hashedPwd = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data:{
                email,
                username,
                profileImg:imgUrl,
                password:hashedPwd
            }
        })
        const jwtPayload ={
            id:newUser.id,
            email
        }
        const token = jwt.sign(jwtPayload,secret);

        return res.status(200).send({
            message:"signup successfull",
            token:token
        })

    } catch (error) {
        return res.send({
            message:"error while fetching data",
            error: error 
        })
    }

   
})

export default authRouter;