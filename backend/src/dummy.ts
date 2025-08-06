import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();
const posts = [
    {
        title: "Breaking into Tech: My Journey",
        description: "I recently transitioned into the tech industry after years in a different field. The learning curve was steep, but the community support and resources made it doable. Here's what helped me the most and how you can make the leap too.",
        userId: "06bfab90-2f1e-42a0-9ca3-4c93e4ce3168"
    },
    {
        title: "Mastering TypeScript",
        description: "TypeScript has drastically improved the quality of my code. In this post, I share my favorite features, how it helps catch bugs early, and some tips for migrating from JavaScript without breaking your project.",
        userId: "7a6b9a8a-29c9-4637-b978-4ffc2c6ca738"
    },
    {
        title: "Why Soft Skills Matter in Tech",
        description: "We often focus on hard skills like coding, but soft skills such as communication and empathy are equally crucial. Here's how they helped me lead projects more effectively and improve team dynamics.",
        userId: "9ea08925-756b-4514-b8a8-08d38c3f17f6"
    },
    {
        title: "Building My First Fullstack App",
        description: "I recently completed my first fullstack app using Node.js, Prisma, and React. From setting up a backend to designing a functional frontend, here's a breakdown of what I learned and what I would do differently next time.",
        userId: "06bfab90-2f1e-42a0-9ca3-4c93e4ce3168"
    },
    {
        title: "Understanding Database Relationships",
        description: "One-to-many, many-to-many, and the ever-confusing joins — in this post, I break down database relationships using Prisma and PostgreSQL with practical code examples and visual diagrams.",
        userId: "7a6b9a8a-29c9-4637-b978-4ffc2c6ca738"
    },
    {
        title: "Debugging Node.js Like a Pro",
        description: "Debugging is a core part of development. I compiled my top strategies for identifying, isolating, and fixing issues in Node.js apps, including using tools like Chrome DevTools and logging patterns.",
        userId: "9ea08925-756b-4514-b8a8-08d38c3f17f6"
    },
    {
        title: "Deploying with Railway",
        description: "Deployment doesn't have to be scary. I walk through deploying a fullstack Prisma + Express app using Railway, including database setup, env configs, and CI/CD considerations.",
        userId: "06bfab90-2f1e-42a0-9ca3-4c93e4ce3168"
    },
    {
        title: "My Daily Coding Routine",
        description: "Productivity is a skill. Here’s a peek into how I structure my day as a developer—from prioritizing tasks, using the Pomodoro technique, and managing distractions while staying creative.",
        userId: "7a6b9a8a-29c9-4637-b978-4ffc2c6ca738"
    },
    {
        title: "How I Fixed a Memory Leak",
        description: "Tracking down a memory leak in a production Node.js app taught me a lot about heap snapshots and proper cleanup. This post explains the problem, tools I used, and the final fix.",
        userId: "9ea08925-756b-4514-b8a8-08d38c3f17f6"
    },
    {
        title: "Exploring Prisma Middleware",
        description: "Prisma supports middleware hooks like beforeCreate, beforeUpdate etc. I experimented with them for logging and data validation. Here’s a step-by-step guide on how to implement and use them effectively.",
        userId: "06bfab90-2f1e-42a0-9ca3-4c93e4ce3168"
    },
    {
        title: "Making REST APIs with Express",
        description: "RESTful APIs are the backbone of modern web apps. I explain the principles of REST and walk you through building a basic CRUD API using Express and Prisma.",
        userId: "7a6b9a8a-29c9-4637-b978-4ffc2c6ca738"
    },
    {
        title: "The Importance of Testing",
        description: "From unit tests to integration tests, having test coverage is vital. In this post, I explain how I added Jest-based tests to a Node project and the bugs I caught early because of it.",
        userId: "9ea08925-756b-4514-b8a8-08d38c3f17f6"
    },
    {
        title: "Handling Auth in Node.js",
        description: "Authentication can be tricky. I walk through how I implemented JWT-based auth with secure password hashing and refresh tokens in a real-world Express app.",
        userId: "06bfab90-2f1e-42a0-9ca3-4c93e4ce3168"
    },
    {
        title: "What I Learned from 30 Days of Coding",
        description: "For a month, I committed to coding and sharing something every day. Here's what I built, the struggles I faced, and how consistency changed my mindset.",
        userId: "7a6b9a8a-29c9-4637-b978-4ffc2c6ca738"
    },
    {
        title: "UI/UX Lessons from Reddit",
        description: "Reddit may not be the prettiest, but its usability is underrated. This post analyzes small but clever UX patterns Reddit uses that we can all learn from.",
        userId: "9ea08925-756b-4514-b8a8-08d38c3f17f6"
    },
    {
        title: "CLI Tools I Can't Live Without",
        description: "From `fzf` to `httpie`, command-line tools boost my productivity as a developer. I list my top 10 and explain how each one saves me time daily.",
        userId: "06bfab90-2f1e-42a0-9ca3-4c93e4ce3168"
    },
    {
        title: "Async/Await Deep Dive",
        description: "We use async/await every day, but do we really understand how it works? This post explores how the JavaScript event loop handles promises and async code under the hood.",
        userId: "7a6b9a8a-29c9-4637-b978-4ffc2c6ca738"
    },
    {
        title: "Common Mistakes in REST APIs",
        description: "From poor status codes to inconsistent routes, REST APIs often have flaws. I list common mistakes I’ve seen and how to fix them to make your API cleaner and more predictable.",
        userId: "9ea08925-756b-4514-b8a8-08d38c3f17f6"
    },
    {
        title: "Boosting Performance with Caching",
        description: "Caching is an underrated superpower. I explain how I implemented Redis caching in a Node.js API and reduced database load by 60%.",
        userId: "06bfab90-2f1e-42a0-9ca3-4c93e4ce3168"
    },
    {
        title: "How Open Source Helped Me Grow",
        description: "Contributing to open source can be intimidating. Here’s how I started, the issues I fixed, and how it improved my confidence, skills, and network.",
        userId: "7a6b9a8a-29c9-4637-b978-4ffc2c6ca738"
    }
];
const users = [
  {
    username: "arjun",
    email: "arjun@gmail.com",
    password: "arjun123",
    bio: "I'm a backend developer with a strong foundation in Node.js, TypeScript, and PostgreSQL. I enjoy building scalable REST APIs and optimizing server performance. When I'm not coding, I love reading about distributed systems and contributing to open-source projects.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtlUb8uQCQpU99w_d9FS_y_8pmqmqPONkqkw&s"
  },
  {
    username: "meera",
    email: "meera@gmail.com",
    password: "meera123",
    bio: "I'm a front-end engineer who loves creating intuitive and accessible UIs with React and Tailwind CSS. I believe good design is all about usability, and I'm always exploring new tools to improve user experience.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqmGoWoGbSMBKOLM1e0ddW3jWnDQKd3QLJww&s"
  },
  {
    username: "rahul",
    email: "rahul@gmail.com",
    password: "rahul123",
    bio: "I'm a full-stack developer with a passion for building robust, real-world web applications. I enjoy solving complex problems, writing clean code, and helping others grow in their dev journey. Lately, I've been diving into microservices and DevOps.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-jgqvETLU8yIkdkvFn2BHr6MO-DDwrJXbZg&s"
  },
  {
    username: "nisha",
    email: "nisha@gmail.com",
    password: "nisha123",
    bio: "I'm a product-focused developer who enjoys turning ideas into polished features. With a background in both development and design, I love collaborating across teams to deliver clean and impactful user experiences.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWbZojVdtiDAu_v6gnrGngQnwePqL4dmOEnA&s"
  }
];
const userIds = ['1d2b18f0-bf88-4853-9488-6c7ad8db1be4','7bd00429-36a2-4865-a20c-1147aeb0a6cb',
    '94db59e9-6296-4046-a22b-8cbdedffd5fc','f3c6b6c6-27ff-4b81-b80d-16601b3516de'
]
async function putData() {
    for (let post of posts) {
        const result = await prisma.post.create({
            data:{
                userId:userIds[Math.floor(Math.random()*3)]||'f3c6b6c6-27ff-4b81-b80d-16601b3516de',
                title:post.title,
                description:post.description
            }
        })
        console.log(result);
    }
}
async function putUserData(){
    for(let u of users){
        const result = await axios.post('http://localhost:8080/auth/signup',u)
    console.log(result);
    }
}
// putData()
// putUserData();
async function updateUserData() {
    for(let u of users){
        const result = await prisma.user.update({
            where:{
                email:u.email
            },
            data:{
                bio:u.bio
            }
        })
        console.log(result);
    }
}
updateUserData()