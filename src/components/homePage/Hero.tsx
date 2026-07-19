"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowRight,  FiCheckCircle, FiCalendar } from "react-icons/fi";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function Hero() {
  // Container animation variants for staggered children load
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Fixed cubic-bezier type mismatch by enforcing fixed array literal type
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#F8F9FA]  p-10">
     
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-b from-[#4F46E5]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-t from-[#6366F1]/5 to-transparent blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          
          <motion.div 
            className="flex flex-col items-start space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
         
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E9ECEF] bg-white px-3.5 py-1.5 text-xs font-medium text-[#4F46E5] shadow-sm"
            >
              <FaWandMagicSparkles className="animate-pulse" />
              Agentic AI Study Companion
            </motion.div>

            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl"
            >
              Plan Smarter.<br />
              Study Better.<br />
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent">
                Achieve More.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="max-w-md text-base text-[#6C757D] sm:text-lg"
            >
              AI-powered platform that helps students plan, organize, analyze, and improve their study journey using intelligent agents.
            </motion.p>

          
            <motion.div 
              variants={itemVariants}
              className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/ai-planner"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-6 py-3.5 text-sm font-medium text-white shadow-md shadow-[#4F46E5]/10 transition-all duration-300 hover:opacity-95 hover:shadow-lg hover:shadow-[#4F46E5]/20 active:scale-[0.98]"
              >
                Generate AI Study Plan
                <FiArrowRight className="text-sm" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center justify-center rounded-xl border border-[#E9ECEF] bg-white px-6 py-3.5 text-sm font-medium text-[#495057] transition-all duration-200 hover:bg-[#F1F3F5] hover:text-[#1A1A1A]"
              >
                Explore Resources
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            
            <div className="w-full max-w-md rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-xl shadow-slate-200/50">
              
           
              <div className="mb-4 flex items-center justify-between border-b border-[#E9ECEF] pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-2 text-xs font-mono text-[#6C757D]">study-agent.py</span>
                </div>
                <span className="rounded bg-[#F1F3F5] px-2 py-0.5 text-[10px] font-medium text-[#4F46E5]">
                  Status: Optimizing
                </span>
              </div>

            
              <div className="space-y-3">
                <div className="rounded-xl bg-[#F8F9FA] p-3 border border-[#E9ECEF]">
                  <p className="text-xs text-[#6C757D]">Target Subject</p>
                  <p className="text-sm font-semibold text-[#1A1A1A]">Data Structures & Algorithms</p>
                </div>

                <div className="relative space-y-2.5">
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 rounded-xl border border-[#E9ECEF] bg-white p-3 shadow-sm"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                      <FiCalendar className="text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[#1A1A1A]">Analyzing deadline...</p>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-[#F1F3F5] overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#4F46E5]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="flex items-center gap-3 rounded-xl border border-[#E9ECEF] bg-white p-3 shadow-sm"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <FiCheckCircle className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#1A1A1A]">Prioritizing Weak Topics</p>
                      <p className="text-[11px] text-[#6C757D]">Graph algorithms & Balanced Trees isolated.</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 1.4, 
                      type: "spring", 
                      stiffness: 100 
                    }}
                    className="absolute -bottom-6 -right-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-3.5 shadow-md max-w-[180px]"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">AI Recommendation</p>
                    <p className="mt-1 text-xs font-medium text-[#1A1A1A]">Allocate 4.5 hours for Shortest Path BFS/DFS models.</p>
                  </motion.div>

                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}