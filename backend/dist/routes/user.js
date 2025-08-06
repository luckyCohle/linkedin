"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const userRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
userRouter.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const userData = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: true
            }
        });
        if (!userData) {
            res.status(404).send({
                message: "user not found"
            });
        }
        res.status(200).send({
            userData
        });
    }
    catch (error) {
        res.status(400).send({
            message: "error while fetching data",
            error
        });
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map