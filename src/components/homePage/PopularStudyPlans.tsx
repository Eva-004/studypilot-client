
"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiBookOpen, FiClock, FiActivity, FiArrowUpRight } from "react-icons/fi";

interface PlanCardProps {
  title: string;
  subject: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  enrollments: string;
}

function PlanCard({ title, subject, duration, difficulty, enrollments }: PlanCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const diffColors = {
    Beginner: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Intermediate: "bg-amber-50 text-amber-700 border-amber-100",
    Advanced: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group flex flex-col justify-between rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-semibold text-[#6C757D] uppercase tracking-wider">
            {subject}
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${diffColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#4F46E5] transition-colors duration-200">
          {title}
        </h3>

        <div className="mt-6 flex items-center gap-4 text-xs text-[#6C757D] border-t border-[#E9ECEF] pt-4">
          <div className="flex items-center gap-1.5">
            <FiClock className="text-[#4F46E5]" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiActivity className="text-[#4F46E5]" />
            <span>{enrollments} clones</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/explore"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#E9ECEF] bg-white py-2.5 text-xs font-semibold text-[#495057] transition-all duration-200 hover:bg-[#F1F3F5] hover:text-[#1A1A1A]"
        >
          View Blueprint
          <FiArrowUpRight />
        </Link>
      </div>
    </motion.div>
  );
}

export default function PopularStudyPlans() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const plansData: PlanCardProps[] = [
    {
      title: "Mastering Data Structures & Algorithms",
      subject: "Computer Science",
      duration: "12 Weeks",
      difficulty: "Advanced",
      enrollments: "1.4k",
    },
    {
      title: "Full-Stack Web Core Foundations",
      subject: "Software Engineering",
      duration: "8 Weeks",
      difficulty: "Intermediate",
      enrollments: "920",
    },
    {
      title: "Discrete Mathematics Architecture",
      subject: "Mathematics",
      duration: "6 Weeks",
      difficulty: "Beginner",
      enrollments: "650",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] mb-3">
              Community Blueprints
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
              Popular Study Plans
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-[#4F46E5]/10 transition-all duration-300 hover:opacity-95 hover:shadow-md"
          >
            Browse All Plans
            <FiBookOpen className="text-xs" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plansData.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}