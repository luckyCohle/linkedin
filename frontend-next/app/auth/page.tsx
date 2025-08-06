"use client";
import { login, signup } from "@/utils/auth";
import { authResponseType } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type AuthMode = "login" | "signup";

export default function page() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    img:""
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response:authResponseType;
    if(mode == "signup"){
        response = await signup(form);
    }else{
        response = await login(form);
    }

    if(response.isSuccess){
        toast.success(response.message);
        router.push('/feed')
    }else{
        toast.error(response.message)
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {mode === "signup" ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                placeholder="JohnDoe"
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

           {mode === "signup" && (
            <div>
              <label className="text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="img"
                placeholder="enter the link to your image"
                className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.img}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium rounded-lg py-2 mt-4 hover:bg-blue-700 transition"
          >
            {mode === "signup" ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-600 hover:underline font-medium"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}