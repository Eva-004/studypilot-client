"use client";

import { motion, Variants } from "framer-motion";
import { FiTarget, FiBookOpen, FiActivity } from "react-icons/fi";
import FeatureCard from "../cards/FeatureCard";
import { FaWandMagicSparkles } from "react-icons/fa6";


export default function Features() {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const featuresData = [
        {
            icon: <FaWandMagicSparkles className="text-xl" />,
            badge: "Agentic AI",
            title: "AI Study Planner",
            description:
                "Create personalized study plans based on your goals, available study hours, exam schedule, and learning preferences. The planner adapts as your progress changes.",
            points: [
                "Analyze study goals & deadlines",
                "Generate personalized daily plans",
                "Adjust schedules based on progress",
            ],
            isAgentic: true,
            ctaLink: "/dashboard/ai-planner",
        },
        {
            icon: <FiActivity className="text-xl" />,
            badge: "Agentic AI",
            title: "Learning Recommendation Agent",
            description:
                "Receive personalized study recommendations by analyzing completed tasks, learning progress, and weak subjects to help you stay on track.",
            points: [
                "Track learning progress",
                "Recommend next study topics",
                "Identify weak subjects automatically",
            ],
            isAgentic: true,
            ctaLink: "/dashboard/ai-recommendations",
        },
        {
            icon: <FiTarget className="text-xl" />,
            title: "Smart Task Management",
            description:
                "Organize study tasks, manage priorities, and track daily progress with a clean and intuitive dashboard.",
            points: [
                "Create and manage study tasks",
                "Priority & deadline tracking",
                "Visual progress overview",
            ],
        },
        {
            icon: <FiBookOpen className="text-xl" />,
            title: "Explore Study Resources",
            description:
                "Browse community-created study plans and learning resources. Save, copy, and customize them for your own study journey.",
            points: [
                "Search and filter study plans",
                "Sort by popularity or date",
                "Save useful resources",
            ],
        },
    ];

    return (
        <section className="bg-[#F8F9FA] pt-10 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

               
                <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
                    <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4F46E5]">
                        Core Features
                    </h2>

                    <p className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
                        Intelligent Agents Built for Academic Success
                    </p>

                    <p className="mt-4 text-base text-[#6C757D]">
                        StudyPilot AI helps students stay organized with intelligent planning,
                        personalized recommendations, and productivity tools designed to make
                        learning more effective.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {featuresData.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            badge={feature.badge}
                            title={feature.title}
                            description={feature.description}
                            points={feature.points}
                            isAgentic={feature.isAgentic}
                            ctaLink={feature.ctaLink}
                        />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}