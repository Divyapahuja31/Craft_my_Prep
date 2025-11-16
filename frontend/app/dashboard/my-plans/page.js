"use client";

import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import PlansHeader from "./_components/PlansHeader";
import PlansFilter from "./_components/PlansFilter";
import PlanCard from "./_components/PlanCard";
import EmptyState from "./_components/EmptyState";

export default function MyPlans() {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchPlans = async () => {
            if (!user) return;
            try {
                const res = await api.get(`/users/${user.id}/plans`);
                setPlans(res.data.plans);
            } catch (error) {
                console.error("Error fetching plans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, [user]);

    const calculateProgress = (roadmap) => {
        if (!Array.isArray(roadmap) || roadmap.length === 0) return 0;
        const completed = roadmap.filter(step => step.completed).length;
        return Math.round((completed / roadmap.length) * 100);
    };

    const filteredPlans = plans.filter(plan => {
        const matchesSearch = plan.jd.toLowerCase().includes(searchQuery.toLowerCase());
        const progress = calculateProgress(plan.roadmap);
        const isCompleted = progress === 100;

        if (filter === "Completed") return matchesSearch && isCompleted;
        if (filter === "In Progress") return matchesSearch && !isCompleted;
        return matchesSearch;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    const handleDeletePlan = async (planId) => {
        if (!confirm("Are you sure you want to delete this plan?")) return;

        try {
            await api.delete(`/plans/${planId}`);
            setPlans(plans.filter(p => p.id !== planId));
        } catch (error) {
            console.error("Error deleting plan:", error);
            alert("Failed to delete plan");
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-7xl mx-auto space-y-8 p-6"
        >
            <PlansHeader />

            <PlansFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filter={filter}
                setFilter={setFilter}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.length > 0 ? (
                    filteredPlans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            itemVariants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            onDelete={handleDeletePlan}
                        />
                    ))
                ) : (
                    <EmptyState searchQuery={searchQuery} />
                )}
            </div>
        </motion.div>
    );
}
