"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const authRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const secret = "mysecret";
authRouter.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("req body=> ");
    console.log(req.body);
    if (!email || !password) {
        return res.status(401).send({
            message: "email and password is required"
        });
    }
    try {
        const userData = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!userData) {
            return res.status(402).send({
                message: "user not found"
            });
        }
        // console.log("password => "+userData.password+", "+password)
        const isCorrPwd = await bcrypt.compare(password, userData?.password || "");
        if (!isCorrPwd) {
            return res.status(403).send({
                message: "incorrect password"
            });
        }
        const jwtPayload = {
            id: userData?.id,
            email: userData?.email
        };
        const token = jwt.sign(jwtPayload, secret);
        return res.status(200).send({
            message: "login successfull",
            token: token
        });
    }
    catch (error) {
        return res.send({
            message: "error while fetching data",
            error: error
        });
    }
});
authRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const imgUrl = req.body.img;
    console.log("req body=> ");
    console.log(req.body);
    if (!email || !password || !username) {
        return res.status(401).send({
            message: "email , username and password is required"
        });
    }
    try {
        const userData = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (userData) {
            return res.status(402).send({
                message: "user already exists"
            });
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                profileImg: imgUrl,
                password: hashedPwd
            }
        });
        const jwtPayload = {
            id: newUser.id,
            email
        };
        const token = jwt.sign(jwtPayload, secret);
        return res.status(200).send({
            message: "signup successfull",
            token: token
        });
    }
    catch (error) {
        return res.send({
            message: "error while fetching data",
            error: error
        });
    }
});
exports.default = authRouter;
//# sourceMappingURL=auth.js.map