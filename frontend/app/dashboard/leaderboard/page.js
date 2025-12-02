"use client";

import { useState, useEffect } from "react";
import { api } from "../../../lib/axios";
import { useAuth } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import { Trophy, Medal, User } from "lucide-react";

export default function LeaderboardPage() {
    const { user } = useAuth();
    const [leaderboard, setLeaderboard] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get("/leaderboard");
                if (res.data.success) {
                    setLeaderboard(res.data.data.leaderboard);
                    setUserRank(res.data.data.userRank);
                }
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                        Global Standings <Trophy className="text-yellow-500" size={32} />
                    </h1>
                    <p className="text-gray-600 mt-2">See how you rank among other learners.</p>
                </div>

                {/* User Rank Card */}
                {userRank && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6 min-w-[280px]"
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-medium text-gray-500">Your Rank</span>
                            <span className="text-4xl font-bold text-gray-900">#{userRank.rank}</span>
                        </div>
                        <div className="h-12 w-px bg-gray-200"></div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">Total XP</span>
                            <span className="text-2xl font-bold text-emerald-600">{userRank.xp} XP</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-emerald-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 w-24">Rank</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 w-32">XP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {leaderboard.map((entry, index) => {
                                const rank = index + 1;
                                const isCurrentUser = user?.id === entry.id;

                                return (
                                    <motion.tr
                                        key={entry.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`hover:bg-gray-50/50 transition-colors ${isCurrentUser ? 'bg-emerald-50/30' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center w-8 h-8 font-bold text-gray-700">
                                                {rank === 1 ? <Medal className="text-yellow-500" size={24} /> :
                                                    rank === 2 ? <Medal className="text-gray-400" size={24} /> :
                                                        rank === 3 ? <Medal className="text-amber-600" size={24} /> :
                                                            `#${rank}`}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                                    <img
                                                        src={entry.avatar || `https://robohash.org/${entry.name || 'user'}.png`}
                                                        alt={entry.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className={`font-medium ${isCurrentUser ? 'text-emerald-700' : 'text-gray-900'}`}>
                                                    {entry.name || "Anonymous User"}
                                                    {isCurrentUser && " (You)"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-emerald-600">{entry.xp} XP</span>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {leaderboard.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No users found on the leaderboard yet.
                    </div>
                )}
            </div>
        </div>
    );
}
