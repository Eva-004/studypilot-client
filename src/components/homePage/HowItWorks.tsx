"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FiUserPlus, FiLayers, FiCpu, FiTrendingUp } from "react-icons/fi";
import StepCard from "../cards/StepCard";


export default function HowItWorks() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stepsData = [
    {
      icon: <FiUserPlus className="text-xl" />,
      stepNumber: "01",
      title: "Create Account",
      description: "Sign up securely using Google authentication to setup your private cloud workspace and baseline academic portfolio.",
    },
    {
      icon: <FiLayers className="text-xl" />,
      stepNumber: "02",
      title: "Log Study Parameters",
      description: "Input your core academic target parameters, impending exam dates, current weak topics, and available daily preparation hours.",
    },
    {
      icon: <FiCpu className="text-xl" />,
      stepNumber: "03",
      title: "Agent Execution",
      description: "Intelligent cognitive agents cross-reference targets against historical system metrics to compute adaptive pathways.",
    },
    {
      icon: <FiTrendingUp className="text-xl" />,
      stepNumber: "04",
      title: "Execute & Optimize",
      description: "Follow customized schedules, review precise automated recommendations, and iteratively enhance real-time execution.",
    },
  ];

  return (
    <section className="bg-[#F8F9FA] py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#4F46E5]/5 to-transparent blur-[140px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] mb-3">
            Execution Pipeline
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
            How StudyPilot Orchestrates Success
          </p>
          <p className="mt-4 text-base text-[#6C757D]">
            A seamless linear workflow converting raw academic targets into high-efficiency learning pathways through autonomous processing.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}