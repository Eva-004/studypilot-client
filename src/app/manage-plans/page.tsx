"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiPlus,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
  FiBookOpen,
  FiEdit3,
  FiTrash2
} from "react-icons/fi";
import { authClient, useSession } from "@/lib/auth-client";
import UpdatePlan from "@/components/pageComponent/UpdatePlan";
import DeletePlan from "@/components/pageComponent/DeletePlan";

// Core Data Type Definition
export interface StudyPlan {
  _id: string;
  title: string;
  subject: string;
  examDate: string;
  dailyHours: number;
  goal: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Pending" | "Completed";
  userEmail: string;
  createdAt?: string;
}

interface AlertMessage {
  type: "success" | "error";
  text: string;
}

const ManagePlansPage: React.FC = () => {
  const router = useRouter();
  const userData = authClient.useSession();
  const user = userData?.data?.user;

  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<AlertMessage | null>(null);


  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetchPlans = useCallback(async () => {
    if (!user?.email) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${SERVER_URL}/plans`
      );


      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }

      const data = await response.json();

      const expectedData = data.filter(dt => dt.userEmail === user.email);

      setPlans(expectedData);
    } catch (error) {
      console.error("Error fetching plans:", error);

      setMessage({
        type: "error",
        text: "Failed to load study plans.",
      });
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleUpdatePlan = async (
    planId: string,
    updates: Partial<StudyPlan>
  ): Promise<void> => {
    try {
      const response = await fetch(
        `${SERVER_URL}/plans/${planId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update plan");
      }

      const data = await response.json();

      console.log("Updated plan:", data);

      // Update UI immediately
      setPlans((previousPlans) =>
        previousPlans.map((plan) =>
          plan._id === planId
            ? { ...plan, ...updates }
            : plan
        )
      );

      setMessage({
        type: "success",
        text: "Study plan updated successfully.",
      });

    } catch (error) {
      console.error("Update plan error:", error);

      setMessage({
        type: "error",
        text: "Failed to update study plan.",
      });
    }
  };

  const handleDeletePlan = async (planId: string): Promise<void> => {
    try {
      const response = await fetch(`${SERVER_URL}/plans/${planId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete plan");
      }

      
      setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId));

      setMessage({
        type: "success",
        text: "Study plan deleted successfully.",
      });
    } catch (error) {
      console.error("Delete plan error:", error);
      setMessage({
        type: "error",
        text: "Failed to delete study plan.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <FiLoader className="animate-spin text-3xl text-[#4F46E5]" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#F8F9FA] py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              Manage Your Blueprints
            </h1>
            <p className="mt-1 text-sm text-[#6C757D]">
              Review, edit parameters, or delete your active study roadmaps.
            </p>
          </div>

          <Link
            href="/add-plan"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:opacity-95"
          >
            <FiPlus className="text-base" />
            Create New Plan
          </Link>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold ${message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-rose-50 text-rose-700 border border-rose-100"
              }`}
          >
            {message.type === "success" ? <FiCheckCircle className="text-lg" /> : <FiAlertCircle className="text-lg" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Plans Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-56 bg-white rounded-2xl border border-[#E9ECEF] p-6 animate-pulse" />
            ))}
          </div>
        ) : plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan._id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm hover:border-indigo-100 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-md">
                      {plan.subject}
                    </span>
                    <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full border bg-gray-50 text-gray-600 border-gray-100">
                      {plan.priority} Priority
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1A1A1A] line-clamp-1">{plan.title}</h3>
                  <p className="mt-1 text-xs text-[#6C757D] line-clamp-2">{plan.goal}</p>

                  <div className="mt-4 pt-3 border-t border-[#E9ECEF] grid grid-cols-2 gap-2 text-xs text-[#495057]">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="text-[#4F46E5]" />
                      <span>{plan.examDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock className="text-[#4F46E5]" />
                      <span>{plan.dailyHours}h/day</span>
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="mt-6 pt-4 border-t border-[#E9ECEF] flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F8F9FA] text-[#1A1A1A]">
                    {plan.status}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <UpdatePlan plan={plan} onUpdate={handleUpdatePlan} />
                    <DeletePlan plan={plan} onDelete={handleDeletePlan}/>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E9ECEF]">
            <FiBookOpen className="mx-auto text-3xl text-[#6C757D] mb-3" />
            <h3 className="text-base font-bold text-[#1A1A1A]">No Study Plans Created Yet</h3>
            <p className="mt-1 text-xs text-[#6C757D]">Start by creating your first academic blueprint.</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default ManagePlansPage;