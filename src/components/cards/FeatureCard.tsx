"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { FaWandMagicSparkles } from "react-icons/fa6";

interface FeatureCardProps {
  icon: React.ReactNode;
  badge?: string;
  title: string;
  description: string;
  points: string[];
  isAgentic?: boolean;
  ctaLink?: string;
}

export default function FeatureCard({
  icon,
  badge,
  title,
  description,
  points,
  isAgentic,
  ctaLink,
}: FeatureCardProps) {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md ${
        isAgentic
          ? "border-indigo-100 bg-gradient-to-b from-indigo-50/20 to-white"
          : "border-[#E9ECEF]"
      }`}
    >
      <div>
        {badge && (
          <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">
            <FaWandMagicSparkles className="text-xs" />
            {badge}
          </span>
        )}

        <div
          className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
            isAgentic
              ? "bg-[#4F46E5] text-white shadow-sm shadow-[#4F46E5]/20"
              : "bg-[#F1F3F5] text-[#4F46E5]"
          }`}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#6C757D]">
          {description}
        </p>

        <div className="mt-5 space-y-2 border-t border-[#E9ECEF] pt-4">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs text-[#495057]"
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  isAgentic ? "bg-[#4F46E5]" : "bg-[#6C757D]"
                }`}
              />

              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {ctaLink ? (
          <Link
            href={ctaLink}
            className="group inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] transition-colors hover:text-[#3B32C4]"
          >
            Try Now

            <FiArrowUpRight className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ) : (
          <span className="text-xs font-semibold text-[#4F46E5]">
            Learn More
          </span>
        )}
      </div>
    </motion.div>
  );
}