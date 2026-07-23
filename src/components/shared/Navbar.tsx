"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight, FiUser, FiLogOut } from "react-icons/fi";


interface NavbarProps {
  isLoggedIn?: boolean;
  userPhoto?: string;
  onLogout?: () => void;
}

export default function Navbar({ 
  isLoggedIn = false, 
  userPhoto, 
  onLogout 
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/plans" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const dashboardLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "AI Planner", href: "/ai-planner" },
    { name: "Manage Plans", href: "/manage-plans" },
    { name: "Profile", href: "/profile" },
  ];

  const currentLinks = isLoggedIn ? [...navLinks.slice(0, 2), ...dashboardLinks] : navLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#E9ECEF] bg-[#F8F9FA]/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
         
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8">
                <Image 
                  src="/images/logo.png" 
                  alt="StudyPilot AI Logo" 
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                StudyPilot<span className="text-[#4F46E5]">.AI</span>
              </span>
            </Link>
          </div>

         
          <div className="hidden md:flex items-center gap-1">
            {currentLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? "text-[#4F46E5] bg-[#F1F3F5]" 
                      : "text-[#495057] hover:text-[#4F46E5] hover:bg-[#F1F3F5]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#E9ECEF] bg-[#F1F3F5] flex items-center justify-center">
                  {userPhoto ? (
                    <Image src={userPhoto} alt="User Profile" fill className="object-cover" />
                  ) : (
                    <FiUser className="text-[#6C757D] text-lg" />
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#6C757D] hover:text-[#4F46E5] transition-colors duration-200 rounded-lg hover:bg-[#F1F3F5]"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm font-medium text-[#495057] hover:text-[#4F46E5] transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-4 py-2 text-sm font-medium text-white shadow-sm shadow-[#4F46E5]/20 transition-all duration-300 hover:opacity-95 hover:shadow-md hover:shadow-[#4F46E5]/30 active:scale-[0.98]"
                >
                  Register
                  <FiArrowRight className="text-xs" />
                </Link>
              </div>
            )}
          </div>

          
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-[#495057] hover:bg-[#F1F3F5] hover:text-[#1A1A1A] transition-colors"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

    
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-[#E9ECEF] bg-white md:hidden overflow-hidden"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {currentLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive 
                        ? "text-[#4F46E5] bg-[#F8F9FA]" 
                        : "text-[#495057] hover:bg-[#F8F9FA] hover:text-[#4F46E5]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              
              <div className="mt-4 border-t border-[#E9ECEF] pt-4 flex flex-col gap-2">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E9ECEF] bg-white px-4 py-2.5 text-base font-medium text-[#6C757D] hover:bg-[#F8F9FA]"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex w-full items-center justify-center rounded-xl border border-[#E9ECEF] bg-white px-4 py-2.5 text-base font-medium text-[#495057] hover:bg-[#F8F9FA]"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-4 py-2.5 text-base font-medium text-white shadow-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                      <FiArrowRight />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}