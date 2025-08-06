import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import userRouter from "./routes/user";
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.use("/post",postRouter);
app.use("/user",userRouter);
app.use("/auth",authRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

