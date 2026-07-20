"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface StepCardProps {
  icon: React.ReactNode;
  stepNumber: string;
  title: string;
  description: string;
}

export default function StepCard({ icon, stepNumber, title, description }: StepCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="absolute top-6 right-6 text-sm font-bold font-mono text-[#E9ECEF]">
        {stepNumber}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl mb-5 bg-[#F1F3F5] text-[#4F46E5]">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-[#6C757D] leading-relaxed">{description}</p>
    </motion.div>
  );
}