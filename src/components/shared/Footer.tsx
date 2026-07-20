"use client";

import React from "react";
import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin, FiCommand } from "react-icons/fi";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Features", href: "#features" },
        { label: "Execution Pipeline", href: "#how-it-works" },
        { label: "Public Blueprints", href: "/explore" },
        { label: "Metrics", href: "#metrics" },
      ],
    },
    {
      title: "System",
      links: [
        { label: "AI Planner Agent", href: "/dashboard/ai-planner" },
        { label: "Recommendation Agent", href: "/dashboard/ai-recommendations" },
        { label: "Task Engine", href: "/dashboard" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-[#E9ECEF] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-12">
          
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl  text-white shadow-sm ">
                 <div className="relative h-8 w-8">
                                 <Image 
                                   src="/images/logo.png" 
                                   alt="StudyPilot AI Logo" 
                                   fill
                                   className="object-contain transition-transform duration-300 group-hover:scale-105"
                                   priority
                                 />
                               </div>
                </div>
                <span className="text-xl font-black text-[#1A1A1A] tracking-tight">
                  StudyPilot<span className="text-[#4F46E5]">.ai</span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-[#6C757D] leading-relaxed max-w-sm">
                Cognitive reasoning agents designed to architect optimal academic pathways and scale student execution capability.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-xl bg-[#F1F3F5] text-[#495057] transition-colors duration-200 hover:bg-[#E9ECEF] hover:text-[#1A1A1A]">
                <FiGithub className="text-lg" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#F1F3F5] text-[#495057] transition-colors duration-200 hover:bg-[#E9ECEF] hover:text-[#1A1A1A]">
                <FiTwitter className="text-lg" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#F1F3F5] text-[#495057] transition-colors duration-200 hover:bg-[#E9ECEF] hover:text-[#1A1A1A]">
                <FiLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((group, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link, idx) => (
                    <li key={idx}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-[#6C757D] transition-colors duration-200 hover:text-[#4F46E5]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className="pt-8 border-t border-[#E9ECEF] flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-[#6C757D] font-medium">
            &copy; {currentYear} StudyPilot AI. All rights reserved.
          </p>
          <p className="text-xs text-[#6C757D] font-medium">
            Engineered for high-fidelity performance.
          </p>
        </div>
      </div>
    </footer>
  );
}