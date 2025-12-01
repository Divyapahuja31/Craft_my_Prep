"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "../../../../../lib/axios"; // Adjust path as needed

export default function QuestionsDisplay() {
  const params = useParams();
  const companyName = params.company ? decodeURIComponent(params.company).toUpperCase() : "COMPANY";
  const roleSlug = params.role;
  const roleTitle = roleSlug ? roleSlug.replace(/-/g, " ").toUpperCase() : "ROLE";

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Use the roleSlug directly or map it if needed. Backend expects 'role'.
        // We pass the company name as is (e.g. "google")
        const res = await api.get("/company-questions", {
          params: {
            company: params.company, // e.g. "google"
            role: roleTitle // e.g. "SDE 1"
          }
        });
        setQuestions(res.data.questions);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (params.company && roleSlug) {
      fetchQuestions();
    }
  }, [params.company, roleSlug, roleTitle]);

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Link href={`/dashboard/company-questions/${params.company}`} className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Roles
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          {companyName} - {roleTitle}
        </h1>
        <p className="text-gray-600 text-lg">
          Top 10 Interview Questions (AI Generated)
        </p>
      </motion.div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 py-10">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <motion.div
              key={q.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-800">
                  {index + 1}. {q.question}
                </span>
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="p-5 pt-0 text-gray-600 bg-gray-50 border-t border-gray-100">
                  <p className="whitespace-pre-wrap">{q.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
