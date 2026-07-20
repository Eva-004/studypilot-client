"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FiCpu, FiCheckSquare, FiClock, FiUsers } from "react-icons/fi";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatItem({ icon, value, label }: StatItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#E9ECEF]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F3F5] text-[#4F46E5] mb-4">
        {icon}
      </div>
      <div className="text-3xl font-black text-[#1A1A1A] tracking-tight">{value}</div>
      <div className="mt-1 text-xs font-medium text-[#6C757D] uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

export default function Statistics() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const statsData: StatItemProps[] = [
    {
      icon: <FiCpu className="text-lg" />,
      value: "450k+",
      label: "Agent Calculations",
    },
    {
      icon: <FiCheckSquare className="text-lg" />,
      value: "98.2%",
      label: "Plan Completion",
    },
    {
      icon: <FiClock className="text-lg" />,
      value: "1.2M+",
      label: "Optimized Hours",
    },
    {
      icon: <FiUsers className="text-lg" />,
      value: "25k+",
      label: "Active Students",
    },
  ];

  return (
    <section className="bg-[#F8F9FA] py-20 lg:py-24 relative overflow-hidden border-y border-[#E9ECEF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] mb-3">
            System Metrics
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Empowering Academic Growth at Scale
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statsData.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}