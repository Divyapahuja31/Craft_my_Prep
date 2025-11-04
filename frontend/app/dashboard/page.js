"use client";

import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#e8f4f8]">
                <p className="text-xl text-[#7ec4b6] font-semibold">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex min-h-screen" style={{ background: "linear-gradient(180deg, #a8d5e2 0%, #e8f4f8 50%, #fef5e7 100%)" }}>
            <Sidebar />

            <main className="flex-1 p-8 pt-20 xl:pt-8 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-white/80 text-center"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Hello, {user?.name || "User"}!</h1>
                    <p className="text-lg text-gray-600">Welcome to your dashboard</p>
                    {user?.email && <p className="text-md text-gray-500 mt-2">{user.email}</p>}
                </motion.div>
            </main>
        </div>
    );
}
