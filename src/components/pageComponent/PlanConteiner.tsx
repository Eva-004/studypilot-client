"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FiPlus, FiSearch, FiFilter, FiBookOpen } from "react-icons/fi";
import Link from "next/link";
import PlanCard, { PlanType } from "../cards/PlanCard";
import { useRouter, useSearchParams } from "next/navigation";

interface PlanContainerProps {
    plans: PlanType[];
}

export default function PlanConteiner({
    plans: initialPlans,
}: PlanContainerProps) {

   
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
     
    const plans = initialPlans;

    const [sort, setSort] = useState("");



    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    console.log(plans);

    const filteredPlans = plans.filter((plan) => {
        const matchesSearch =
            plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plan.subject.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPriority =
            selectedPriority === "" || plan.priority === selectedPriority;

        return matchesSearch && matchesPriority;
    });

    return (
        <main className="min-h-screen bg-[#F8F9FA] py-10 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                            Study Blueprints
                        </h1>
                        <p className="mt-1 text-sm text-[#6C757D]">
                            Manage and track your active academic plans and execution timelines.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/add-plan"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4F46E5]/10 transition-all duration-300 hover:opacity-95 active:scale-[0.98]"
                    >
                        <FiPlus className="text-base" />
                        Create Study Plan
                    </Link>
                </div>


                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#E9ECEF] shadow-sm">
                    <div className="relative w-full sm:flex-1">
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6C757D] text-base" />
                        <input
                            type="text"
                            placeholder="Search by title or subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] placeholder-[#ADB5BD] focus:outline-none focus:border-[#4F46E5] transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <FiFilter className="text-[#6C757D] text-sm shrink-0" />

                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="w-full sm:w-auto bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm font-medium text-[#495057] focus:outline-none focus:border-[#4F46E5] transition-colors"
                        >
                            <option value="">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select
                            value={sort}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSort(value);

                                const params = new URLSearchParams(searchParams.toString());

                                if (value) {
                                    params.set("sort", value);
                                } else {
                                    params.delete("sort");
                                }

                                router.push(`/plans?${params.toString()}`);
                            }}
                            className="w-full sm:w-auto bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl px-4 py-2.5 text-sm font-medium text-[#495057] focus:outline-none focus:border-[#4F46E5] transition-colors"
                        >
                            <option value="">Sort By</option>
                            <option value="asc">Exam Date (Oldest)</option>
                            <option value="desc">Exam Date (Newest)</option>
                        </select>
                    </div>
                </div>




                {filteredPlans.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredPlans.map((plan, index) => (
                            <PlanCard key={plan._id || index} plan={plan} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-[#E9ECEF]">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1F3F5] text-[#6C757D] mb-4">
                            <FiBookOpen className="text-xl" />
                        </div>
                        <h3 className="text-base font-bold text-[#1A1A1A]">No Study Plans Found</h3>
                        <p className="mt-1 text-xs text-[#6C757D]">
                            Try adjusting your search criteria or create a new plan.
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}