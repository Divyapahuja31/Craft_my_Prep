"use client";

import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import DashboardHeader from "./_components/DashboardHeader";
import DailyChallengeCard from "./_components/DailyChallengeCard";
import PlansCard from "./_components/PlansCard";
import MiniProjectsCard from "./_components/MiniProjectsCard"; // Re-imported
// import RecentActivityCard from "./_components/RecentActivityCard"; // Removed
import QuoteCard from "./_components/QuoteCard";
import StickyNotesSection from "./_components/StickyNotesSection";
import LeaderboardCard from "./_components/LeaderboardCard";
import RecommendedResourceCard from "./_components/RecommendedResourceCard";
import DashboardActions from "./_components/DashboardActions";

export default function Dashboard() {
    const { user } = useAuth();
    const [dailyChallenge, setDailyChallenge] = useState(null);
    const [recentPlans, setRecentPlans] = useState([]);
    const [miniProjects, setMiniProjects] = useState([]);
    const [leaderboardData, setLeaderboardData] = useState(null); // Added state for leaderboard
    const [notes, setNotes] = useState([]);
    const [quote, setQuote] = useState(null);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const challengeRes = await api.get("/daily-challenge/today");
                setDailyChallenge(challengeRes.data);

                const plansRes = await api.get(`/users/${user.id}/plans`);
                setRecentPlans(plansRes.data.plans.slice(0, 2));

                const projectsRes = await api.get("/miniprojects");
                setMiniProjects(projectsRes.data.projects || []);

                // Fetch leaderboard data
                const leaderboardRes = await api.get("/leaderboard");
                if (leaderboardRes.data.success) {
                    setLeaderboardData(leaderboardRes.data.data);
                }

                const notesRes = await api.get("/notes");
                setNotes(notesRes.data.notes);

                const today = new Date().toDateString();
                const cachedQuote = localStorage.getItem("daily_quote");
                const cachedQuoteDate = localStorage.getItem("daily_quote_date");

                if (cachedQuote && cachedQuoteDate === today) {
                    setQuote(JSON.parse(cachedQuote));
                } else {
                    try {
                        const quoteRes = await fetch('https://dummyjson.com/quotes/random');
                        const quoteData = await quoteRes.json();
                        setQuote(quoteData);
                        localStorage.setItem("daily_quote", JSON.stringify(quoteData));
                        localStorage.setItem("daily_quote_date", today);
                    } catch (e) {
                        console.error("Failed to fetch quote", e);
                        setQuote({ quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" });
                    }
                }

                const cachedArticle = localStorage.getItem("daily_article");
                const cachedArticleDate = localStorage.getItem("daily_article_date");

                if (cachedArticle && cachedArticleDate === today) {
                    setArticle(JSON.parse(cachedArticle));
                } else {
                    try {
                        const articleRes = await fetch('https://dev.to/api/articles?tag=career&per_page=10');
                        const articles = await articleRes.json();
                        if (articles && articles.length > 0) {
                            const randomArticle = articles[Math.floor(Math.random() * articles.length)];
                            setArticle(randomArticle);
                            localStorage.setItem("daily_article", JSON.stringify(randomArticle));
                            localStorage.setItem("daily_article_date", today);
                        }
                    } catch (e) {
                        console.error("Failed to fetch article", e);
                    }
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleAddNote = async (content) => {
        if (!content.trim()) return;
        try {
            const res = await api.post("/notes", { content });
            setNotes([res.data.note, ...notes]);
        } catch (error) {
            console.error("Failed to add note:", error);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(n => n.id !== id));
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-7xl mx-auto space-y-8"
        >
            {/* Header */}
            <DashboardHeader user={user} itemVariants={itemVariants} />

            <hr className="border-gray-200/50" />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column */}
                <div className="space-y-8 flex flex-col h-full">
                    <DailyChallengeCard dailyChallenge={dailyChallenge} itemVariants={itemVariants} />
                    <PlansCard plans={recentPlans} itemVariants={itemVariants} />
                    {/* Replaced RecentActivityCard with MiniProjectsCard */}
                    <MiniProjectsCard projects={miniProjects} itemVariants={itemVariants} />
                </div>

                {/* Right Column */}
                <div className="space-y-8 flex flex-col h-full">
                    <QuoteCard quote={quote} itemVariants={itemVariants} />
                    <StickyNotesSection
                        notes={notes}
                        onAdd={handleAddNote}
                        onDelete={handleDeleteNote}
                        itemVariants={itemVariants}
                    />
                    <LeaderboardCard data={leaderboardData} itemVariants={itemVariants} />
                    <RecommendedResourceCard article={article} itemVariants={itemVariants} />
                </div>
            </div>

            {/* Bottom Actions */}
            <DashboardActions itemVariants={itemVariants} />
        </motion.div>
    );
}