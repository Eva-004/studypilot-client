"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiBookOpen,
    FiCalendar,
    FiClock,
    FiTarget,
    FiPlusCircle,
    FiLoader,
    FiCheckCircle,
    FiAlertCircle
} from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

const CreatePlanPage = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        examDate: "",
        dailyHours: 2,
        goal: "",
        priority: "Medium",
        status: "Pending",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "dailyHours" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const payload = {
                ...formData,
                userEmail: session?.user?.email,
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/plans`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage({ type: "success", text: "Study plan created successfully!" });
                setTimeout(() => {
                    router.push("/plans");
                }, 1500);
            } else {
                throw new Error(data.message || "Failed to create study plan");
            }
        } catch (error: unknown) {
            console.error(error);

            setMessage({
                type: "error",
                text:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again.",
            });
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
                <FiLoader className="animate-spin text-3xl text-[#4F46E5]" />
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <main className="min-h-screen bg-[#F8F9FA] py-10 lg:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/plans"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6C757D] hover:text-[#4F46E5] transition-colors"
                    >
                        <FiArrowLeft className="text-sm" /> Back to Blueprints
                    </Link>
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                        Create Study Blueprint
                    </h1>
                    <p className="mt-1 text-sm text-[#6C757D]">
                        Set your target execution parameters to generate an adaptive study roadmap.
                    </p>
                </div>

                {/* Status Message */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold ${message.type === "success"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-rose-50 text-rose-700 border border-rose-100"
                            }`}
                    >
                        {message.type === "success" ? (
                            <FiCheckCircle className="text-lg shrink-0" />
                        ) : (
                            <FiAlertCircle className="text-lg shrink-0" />
                        )}
                        <span>{message.text}</span>
                    </div>
                )}

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl border border-[#E9ECEF] p-6 sm:p-8 shadow-sm"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-[#495057] mb-2">
                                Plan Title
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C757D]">
                                    <FiBookOpen className="text-base" />
                                </div>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="e.g. Mastering Advanced Data Structures"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] placeholder-[#ADB5BD] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                />
                            </div>
                        </div>

                        {/* Subject & Priority */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-[#495057] mb-2">
                                    Subject / Domain
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    placeholder="e.g. Computer Science"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] placeholder-[#ADB5BD] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="priority" className="block text-xs font-bold uppercase tracking-wider text-[#495057] mb-2">
                                    Priority Level
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                >
                                    <option value="High">High Priority</option>
                                    <option value="Medium">Medium Priority</option>
                                    <option value="Low">Low Priority</option>
                                </select>
                            </div>
                        </div>

                        {/* Exam Date & Daily Hours */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="examDate" className="block text-xs font-bold uppercase tracking-wider text-[#495057] mb-2">
                                    Exam / Target Date
                                </label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C757D]">
                                        <FiCalendar className="text-base" />
                                    </div>
                                    <input
                                        id="examDate"
                                        name="examDate"
                                        type="date"
                                        required
                                        value={formData.examDate}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="dailyHours" className="block text-xs font-bold uppercase tracking-wider text-[#495057] mb-2">
                                    Daily Hours Allocation
                                </label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C757D]">
                                        <FiClock className="text-base" />
                                    </div>
                                    <input
                                        id="dailyHours"
                                        name="dailyHours"
                                        type="number"
                                        min="1"
                                        max="16"
                                        required
                                        value={formData.dailyHours}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Goal */}
                        <div>
                            <label htmlFor="goal" className="block text-xs font-bold uppercase tracking-wider text-[#495057] mb-2">
                                Core Goal / Target
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute top-3.5 left-3.5 flex items-center pointer-events-none text-[#6C757D]">
                                    <FiTarget className="text-base" />
                                </div>
                                <textarea
                                    id="goal"
                                    name="goal"
                                    rows={3}
                                    required
                                    placeholder="Describe your primary learning milestone for this study plan..."
                                    value={formData.goal}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] placeholder-[#ADB5BD] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-[#4F46E5]/10 transition-all duration-300 hover:opacity-95 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FiLoader className="animate-spin text-base" />
                                        Creating Blueprint...
                                    </>
                                ) : (
                                    <>
                                        <FiPlusCircle className="text-base" />
                                        Create Study Plan
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </motion.div>
            </div>
        </main>
    );
};

export default CreatePlanPage;