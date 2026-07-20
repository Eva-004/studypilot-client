"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCommand, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: true,
      callbackURL: "/",
    });
    console.log(data)
    if(error){
      toast.error(error.message)
    }else{
      toast.success("Login successfully!")
    }
  };

  const handleGoogleSignIn = async()=>{
      const data = await authClient.signIn.social({
      provider: "google",
    });
    toast.success("Login successfully!")
    console.log(data);
    }

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#4F46E5]/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-sm shadow-[#4F46E5]/20">
              <FiCommand className="text-lg" />
            </div>
            <span className="text-xl font-black text-[#1A1A1A] tracking-tight">
              StudyPilot<span className="text-[#4F46E5]">.ai</span>
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-[#6C757D]">
          Don{"'"}t have an account?{" "}
          <Link href="/register" className="font-semibold text-[#4F46E5] hover:text-[#3B32C4] transition-colors">
            create your workspace
          </Link>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-sm border border-[#E9ECEF] sm:rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#495057]">
                Email Address
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C757D]">
                  <FiMail className="text-base" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] placeholder-[#ADB5BD] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#495057]">
                  Password
                </label>
                <div className="text-xs">
                  <a href="#" className="font-semibold text-[#4F46E5] hover:text-[#3B32C4] transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C757D]">
                  <FiLock className="text-base" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] placeholder-[#ADB5BD] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full cursor-pointer flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4F46E5]/10 transition-all duration-300 hover:opacity-95 hover:shadow-md group"
              >
                Sign In
                <FiArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E9ECEF]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="px-3 bg-white text-[#6C757D] font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={handleGoogleSignIn}
                type="button"
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 rounded-xl border border-[#E9ECEF] bg-white text-sm font-semibold text-[#495057] transition-all duration-200 hover:bg-[#F1F3F5] hover:text-[#1A1A1A]"
              >
                <FcGoogle className="text-lg" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}