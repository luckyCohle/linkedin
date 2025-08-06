

A modern, full-stack blogging platform built for developers to share ideas, technical journeys, and resources. Connect with the dev community through an intuitive interface designed for seamless content creation and discovery.



## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication and authorization
- 👤 **User Profiles** - Personalized profiles with bio, posts, and activity tracking
- 📖 **Rich Post Creation** - Create and share technical articles and insights
- 🎨 **Responsive Design** - Mobile-first UI that works across all devices
- ⚡ **Fast Performance** - Optimized with Next.js App Router and server-side rendering
- 🗄️ **Type-Safe Database** - Prisma ORM with PostgreSQL for reliable data management

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[JWT](https://jwt.io/)** - Secure authentication tokens

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/devblog.git
```

### 2. Frontend Setup
```bash
cd frontend-next
npm install

# Create environment file
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/" > .env.local

# Start development server
npm run dev
```
The frontend will be available at `http://localhost:3000`

### 3. Backend Setup
```bash
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database configuration
```

Add the following to your `.env` file:
```env
DATABASE_URL="postgresql://neondb_owner:npg_x6sK7TOCzQXJ@ep-cold-morning-ad05go6b-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations (if applicable)
npx prisma db push

# Start development server
npm run dev
```
The backend will be available at `http://localhost:8080`

## 🔑 Demo Account

You can test the platform using the following demo credentials:

| Field | Value |
|-------|-------|
| **Email** | `rahul@gmail.com` |
| **Password** | `rahul123` |

## 📁 Project Structure

```
devblog/
├── frontend-next/          # Next.js frontend
│   ├── components/         # Reusable UI components
│   ├── app/               # App router pages
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── backend/               # Express.js backend
│   ├── routes/            # API route handlers
│   ├── prisma/           # Database schema and migrations
│   └── utils/            # Backend utilities
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Users
- `GET /user/profile/:id` - Get user profile and posts


### Posts
- `GET /posts` - Get all posts
- `POST /post` - Create new post

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/
```

### Backend (.env)
```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret-key"
PORT=8080
NODE_ENV=development
```

## 🐛 Troubleshooting

### Common Issues

**Frontend not connecting to backend:**
- Ensure the backend is running on port 8080
- Check that `NEXT_PUBLIC_BACKEND_URL` is correctly set

**Database connection errors:**
- Verify your PostgreSQL connection string
- Run `npx prisma generate` to ensure the client is up to date

**Authentication issues:**
- Check that JWT_SECRET is set in backend environment
- Verify tokens are being passed correctly in request headers

## 📧 Contact

If you have any questions or suggestions, feel free to reach out:

- **GitHub Issues**: [Create an issue](https://github.com/luckyCohle/linkedin/issues)
- **Email**: aayushyadav373@gmail.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **Don't forget to star this repository if you found it helpful!**
