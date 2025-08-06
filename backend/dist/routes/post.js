"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const postRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
postRouter.get('/', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });
        if (!posts)
            res.status(404).send({ message: " no posts  found", postArray: [] });
        res.status(200).send({
            postArray: posts
        });
    }
    catch (error) {
        res.status.send({
            message: "error while fetching data",
            error
        });
    }
});
postRouter.post('/', async (req, res) => {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
        res.status(400).send({
            message: "incomplete request object"
        });
    }
    try {
        const newPost = await prisma.post.create({
            data: {
                userId,
                title,
                description
            }
        });
        res.status(200).send({
            message: "post created successfully",
            postId: newPost.id
        });
    }
    catch (error) {
        res.status(400).send({
            message: "error while fetching data",
            error
        });
    }
});
exports.default = postRouter;
//# sourceMappingURL=post.js.map