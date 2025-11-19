"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../../lib/axios";
import ProjectsHeader from "./_components/ProjectsHeader";
import EmptyState from "./_components/EmptyState";
import CreateProjectModal from "./_components/CreateProjectModal";
import ProjectsFilter from "./_components/ProjectsFilter";
import ProjectCard from "./_components/ProjectCard";

export default function MiniProjects() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [filter, setFilter] = useState("All");

    const fetchProjects = async () => {
        try {
            const res = await api.get("/miniprojects");
            if (res.data.success) {
                setProjects(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (projectData) => {
        setIsGenerating(true);
        try {
            const res = await api.post("/miniprojects/generate", projectData);
            if (res.data.success) {
                // Refresh projects list
                await fetchProjects();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Failed to create project. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDelete = async (projectId) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await api.delete(`/miniprojects/${projectId}`);
            if (res.data.success) {
                setProjects(projects.filter(p => p.id !== projectId));
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project");
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
        const isCompleted = project.isCompleted;

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

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-7xl mx-auto space-y-4 p-4"
        >
            <ProjectsHeader onCreateClick={() => setIsModalOpen(true)} />

            <ProjectsFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filter={filter}
                setFilter={setFilter}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            itemVariants={itemVariants}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <EmptyState 
                        searchQuery={searchQuery} 
                        onCreateClick={() => setIsModalOpen(true)} 
                    />
                )}
            </div>

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateProject}
                isGenerating={isGenerating}
            />
        </motion.div>
    );
}
