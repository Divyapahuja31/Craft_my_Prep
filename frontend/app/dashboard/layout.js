"use client";

import Sidebar from "../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
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

    return (
        <div className="flex min-h-screen" style={{ background: "linear-gradient(180deg, #a8d5e2 0%, #e8f4f8 50%, #fef5e7 100%)" }}>
            <Sidebar />
            <main className="flex-1 p-8 pt-20 xl:pt-8 flex items-center justify-center">
                {children}
            </main>
        </div>
    );
}
