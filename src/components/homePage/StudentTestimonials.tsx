// components/StudentTestimonials.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FiStar } from "react-icons/fi";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
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
      className="flex flex-col justify-between rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm"
    >
      <div>
        <div className="flex items-center gap-0.5 mb-4">
          {[...Array(rating)].map((_, i) => (
            <FiStar key={i} className="text-amber-400 fill-amber-400 text-sm" />
          ))}
        </div>
        <p className="text-sm text-[#495057] italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-[#E9ECEF] flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center text-white text-xs font-bold font-mono">
          {author.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#1A1A1A] tracking-tight">{author}</h4>
          <p className="text-[11px] text-[#6C757D] font-medium">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StudentTestimonials() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const testimonialsData: TestimonialCardProps[] = [
    {
      quote: "The Planner Agent accurately partitioned my dynamic programming topics down into clear blocks right before my midterms.",
      author: "Alex Mercer",
      role: "Computer Science Undergraduate",
      rating: 5,
    },
    {
      quote: "The autonomous context scanning pinpointed my issues with graph compilation algorithms instantly. Lifesaver for engineering.",
      author: "Sarah Jenkins",
      role: "Software Engineering Student",
      rating: 5,
    },
    {
      quote: "I stopped spending hours setting up calendars manually. The reasoning optimization does all the backend mapping seamlessly.",
      author: "David Kim",
      role: "Data Analytics Major",
      rating: 5,
    },
  ];

  return (
    <section className="bg-[#F1F3F5] py-10 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] mb-3">
            Validation
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Student Testimonials
          </p>
          <p className="mt-4 text-base text-[#6C757D]">
            See how undergraduates scale their academic capacity by relying on specialized agent architectures.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}