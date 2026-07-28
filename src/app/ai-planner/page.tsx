"use client";

import React, { useState } from "react";
import {
    FiBookOpen,
    FiCalendar,
    FiClock,
    FiTarget,
    FiAlertTriangle,
    FiCpu,
    FiCheckCircle,
    FiActivity,
    FiLayers,
    FiCompass,
} from "react-icons/fi";
import { toast } from "react-toastify";

// Types
export interface PlannerInput {
    subject: string;
    examDate: string;
    dailyHours: number;
    weakTopics: string;
    goal: string;
}

export interface DaySchedule {
    day: number;
    date: string;
    topic: string;
    hours: number;
    focusArea: string;
}

export interface AiPlannerResult {
    deadlineAnalysis: string;
    prioritizedTopics: { topic: string; priority: "High" | "Medium" | "Low" }[];
    dailySchedule: DaySchedule[];
    revisionDays: string[];
    practiceStrategy: string[];
}

const AiStudyPlanner: React.FC = () => {
    const [formData, setFormData] = useState<PlannerInput>({
        subject: "Data Structures",
        examDate: "2026-08-15",
        dailyHours: 3,
        weakTopics: "Trees, Graph",
        goal: "Score A+",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [planResult, setPlanResult] = useState<AiPlannerResult | null>(null);
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGeneratePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${SERVER_URL}/api/generate-plan`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setPlanResult(data.plan);
            } else {
                toast.error(data.message || "Failed to generate plan");
            }
        } catch (error) {
            console.error("Failed to generate plan:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-indigo-100 text-[#4F46E5] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <FiCpu /> StudyPilot AI Agent
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                        Smart AI Study Planner
                    </h1>
                    <p className="text-sm text-[#6C757D] mt-1">
                        Let AI analyze your exam deadline and generate a realistic, high-yield study schedule.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Input Form */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E9ECEF] shadow-sm">
                        <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                            <FiBookOpen className="text-[#4F46E5]" /> Plan Parameters
                        </h2>

                        <form onSubmit={handleGeneratePlan} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#495057] uppercase tracking-wider mb-1">
                                    Subject Name
                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Data Structures"
                                    className="w-full px-4 py-2.5 text-sm border border-[#E9ECEF] rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#495057] uppercase tracking-wider mb-1 flex items-center gap-1">
                                        <FiCalendar /> Exam Date
                                    </label>

                                    <input
                                        type="date"
                                        name="examDate"
                                        value={formData.examDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2.5 text-sm border border-[#E9ECEF] rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#495057] uppercase tracking-wider mb-1 flex items-center gap-1">
                                        <FiClock /> Daily Hours
                                    </label>

                                    <input
                                        type="number"
                                        name="dailyHours"
                                        min="1"
                                        max="16"
                                        value={formData.dailyHours}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2.5 text-sm border border-[#E9ECEF] rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#495057] uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <FiAlertTriangle className="text-amber-500" /> Weak Topics
                                </label>

                                <input
                                    type="text"
                                    name="weakTopics"
                                    value={formData.weakTopics}
                                    onChange={handleChange}
                                    placeholder="e.g. Trees, Graph, Dynamic Programming"
                                    className="w-full px-4 py-2.5 text-sm border border-[#E9ECEF] rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#495057] uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <FiTarget /> Target Goal
                                </label>

                                <select
                                    name="goal"
                                    value={formData.goal}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 text-sm border border-[#E9ECEF] rounded-xl focus:ring-2 focus:ring-[#4F46E5] focus:outline-none transition-all"
                                >
                                    <option value="Score A+">Score A+ (Comprehensive Mastery)</option>
                                    <option value="Pass Comfortably">Pass Comfortably</option>
                                    <option value="Quick Revision">Quick Revision</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white py-3 px-4 rounded-xl font-semibold shadow-md hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <FiCpu className="animate-spin text-lg" />
                                        Analyzing & Reasoning...
                                    </>
                                ) : (
                                    <>
                                        <FiCpu className="text-lg " /> Generate AI Blueprint
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Panel: AI Result View */}
                    <div className="lg:col-span-7">
                        {planResult ? (
                            <div className="space-y-6">
                                {/* 1. Deadline Analysis */}
                                <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#4F46E5] mb-2 flex items-center gap-2">
                                        <FiActivity /> Deadline & Feasibility Analysis
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
                                        {planResult.deadlineAnalysis}
                                    </p>
                                </div>

                                {/* 2. Prioritized Topics */}
                                <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#4F46E5] mb-3 flex items-center gap-2">
                                        <FiLayers /> Prioritized Focus Matrix
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {planResult.prioritizedTopics.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${item.priority === "High"
                                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                                    : item.priority === "Medium"
                                                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                        : "bg-slate-50 text-slate-700 border border-slate-200"
                                                    }`}
                                            >
                                                <span>{item.topic}</span>
                                                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/80 border">
                                                    {item.priority}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Daily Schedule */}
                                <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#4F46E5] mb-3 flex items-center gap-2">
                                        <FiCalendar /> Breakdown Schedule
                                    </h3>
                                    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                        {planResult.dailySchedule.map((item) => (
                                            <div
                                                key={item.day}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-white bg-[#4F46E5] w-7 h-7 rounded-lg flex items-center justify-center">
                                                        D{item.day}
                                                    </span>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{item.topic}</p>
                                                        <p className="text-gray-500 text-[11px]">{item.focusArea}</p>
                                                    </div>
                                                </div>
                                                <span className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                                                    {item.hours} hrs
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Revision & Practice Strategy */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] mb-2 flex items-center gap-1.5">
                                            <FiCheckCircle /> Dedicated Revision
                                        </h3>
                                        <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                                            {planResult.revisionDays.map((rev, idx) => (
                                                <li key={idx}>{rev}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] mb-2 flex items-center gap-1.5">
                                            <FiCompass /> Practice Strategy
                                        </h3>
                                        <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                                            {planResult.practiceStrategy.map((strat, idx) => (
                                                <li key={idx}>{strat}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Empty Placeholder */
                            <div className="h-full min-h-[400px] bg-white rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-6">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 text-[#4F46E5] flex items-center justify-center text-xl mb-3">
                                    <FiCpu />
                                </div>
                                <h3 className="text-base font-bold text-gray-800">No Blueprint Generated Yet</h3>
                                <p className="text-xs text-gray-500 max-w-sm mt-1">
                                    Fill in your subject details and exam deadline on the left to let AI reason and output a personalized plan.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiStudyPlanner;