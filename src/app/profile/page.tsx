"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FiUser,
    FiMail,
    FiCamera,
    FiSave,
    FiCheckCircle,
    FiAlertCircle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
    const userData = authClient.useSession();
    const user = userData?.data?.user;

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    // Session data load হওয়ার পর state update হবে
    useEffect(() => {
        if (user) {
            setName(user.name ?? "");
            setPreviewURL(user.image ?? "");
        }
    }, [user]);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            setSelectedFile(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    const handleProfileUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!user) {
            setMessage({
                type: "error",
                text: "User session not found.",
            });
            return;
        }

        setIsUploading(true);
        setMessage(null);

        try {
            let finalPhotoURL = user.image ?? "";

            // Upload new image
            if (selectedFile) {
                const formData = new FormData();
                formData.append("image", selectedFile);

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const imgData = await res.json();

                if (imgData.success) {
                    finalPhotoURL = imgData.data.url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            // Update your database
            const patchResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${user.email}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    image: finalPhotoURL,
                }),
            });

            if (!patchResponse.ok) {
                throw new Error("Failed to update database");
            }

            setPreviewURL(finalPhotoURL);

            setMessage({
                type: "success",
                text: "Profile updated successfully!",
            });
        } catch (error) {
            console.error(error);

            setMessage({
                type: "error",
                text: "Something went wrong. Please try again.",
            });
        } finally {
            setIsUploading(false);
        }
    };

    // Session loading
    if (userData.isPending) {
        return (
            <main className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
                <p className="text-sm text-[#6C757D]">
                    Loading profile...
                </p>
            </main>
        );
    }

    // No user session
    if (!user) {
        return (
            <main className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
                <p className="text-sm text-[#6C757D]">
                    Please login to view your profile.
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8F9FA] py-10 lg:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                        Account Settings
                    </h1>

                    <p className="mt-1 text-sm text-[#6C757D]">
                        Manage your public profile identity and personal details.
                    </p>
                </div>

                {message && (
                    <div
                        className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold ${
                            message.type === "success"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-rose-50 text-rose-700 border border-rose-100"
                        }`}
                    >
                        {message.type === "success" ? (
                            <FiCheckCircle className="text-lg" />
                        ) : (
                            <FiAlertCircle className="text-lg" />
                        )}

                        <span>{message.text}</span>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl border border-[#E9ECEF] p-6 sm:p-8 shadow-sm"
                >
                    <form
                        onSubmit={handleProfileUpdate}
                        className="space-y-6"
                    >
                        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 border-b border-[#E9ECEF] pb-8">

                            <div className="relative group">
                                <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-[#4F46E5] relative bg-[#F1F3F5]">

                                    {previewURL ? (
                                        <Image
                                            src={previewURL}
                                            alt="Profile Avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-[#9CA3AF]">
                                            <FiUser className="text-4xl" />
                                        </div>
                                    )}

                                </div>

                                <label
                                    htmlFor="photo-upload"
                                    className="absolute bottom-0 right-0 p-2.5 bg-[#4F46E5] hover:bg-[#3B32C4] text-white rounded-full shadow-md cursor-pointer transition-all duration-200"
                                >
                                    <FiCamera className="text-base" />
                                </label>

                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#1A1A1A] text-center sm:text-left">
                                    Profile Picture
                                </h3>

                                <p className="text-xs text-[#6C757D] mt-1 text-center sm:text-left">
                                    Supports JPG, PNG or WEBP. Uploading to ImgBB server.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#495057] mb-2">
                                Full Name
                            </label>

                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C757D]">
                                    <FiUser className="text-base" />
                                </div>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="block w-full pl-10 pr-4 py-3 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#1A1A1A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#495057] mb-2">
                                Email Address
                            </label>

                            <div className="relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                                    <FiMail className="text-base" />
                                </div>

                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="block w-full pl-10 pr-4 py-3 bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl text-sm text-[#6C757D] cursor-not-allowed select-none"
                                />
                            </div>

                            <span className="text-[11px] text-[#9CA3AF] mt-1 block">
                                Email address is read-only and associated with your account identity.
                            </span>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isUploading}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4F46E5]/10 transition-all duration-300 hover:opacity-95 disabled:opacity-50"
                            >
                                <FiSave className="text-base" />

                                {isUploading
                                    ? "Saving Changes..."
                                    : "Save Profile"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}