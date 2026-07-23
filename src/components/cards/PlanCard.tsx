"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock } from "react-icons/fi";

export interface PlanType {
    _id?: string;
    title: string;
    subject: string;
    examDate: string;
    dailyHours: number;
    goal: string;
    priority: "High" | "Medium" | "Low" | string;
    status: "In Progress" | "Pending" | "Completed" | string;
    createdBy?: string;
}

interface PlanCardProps {
    plan: PlanType;
}

export default function PlanCard({ plan }: PlanCardProps) {
    const priorityStyles: Record<string, string> = {
        High: "bg-rose-50 text-rose-600 border-rose-100",
        Medium: "bg-amber-50 text-amber-600 border-amber-100",
        Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };

    const statusStyles: Record<string, string> = {
        Completed: "bg-emerald-500",
        "In Progress": "bg-[#4F46E5]",
        Pending: "bg-amber-400",
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col justify-between rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-100"
        >
            <div>
               
                <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-md">
                        {plan.subject}
                    </span>
                    <div className="flex items-center gap-2">
                        <span
                            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${priorityStyles[plan.priority] || "bg-gray-50 text-gray-600 border-gray-100"
                                }`}
                        >
                            {plan.priority} Priority
                        </span>
                    </div>
                </div>

                
                <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#4F46E5] transition-colors duration-200 line-clamp-2">
                    {plan.title}
                </h3>

                
                <p className="mt-2 text-xs text-[#6C757D] leading-relaxed line-clamp-2">
                    {plan.goal}
                </p>

                
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#E9ECEF] pt-4">
                    <div className="flex items-center gap-2 text-xs text-[#495057]">
                        <FiCalendar className="text-[#4F46E5] text-sm shrink-0" />
                        <span className="truncate">{plan.examDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#495057]">
                        <FiClock className="text-[#4F46E5] text-sm shrink-0" />
                        <span>{plan.dailyHours} hrs/day</span>
                    </div>
                </div>
            </div>

            
            <div className="mt-6 pt-4 border-t border-[#E9ECEF] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span
                        className={`h-2 w-2 rounded-full ${statusStyles[plan.status] || "bg-gray-400"
                            }`}
                    />
                    <span className="text-xs font-medium text-[#1A1A1A]">{plan.status}</span>
                </div>
                <button className="text-xs font-semibold text-[#4F46E5] hover:text-[#3B32C4] transition-colors">
                    View Details →
                </button>
            </div>
        </motion.div>
    );
}