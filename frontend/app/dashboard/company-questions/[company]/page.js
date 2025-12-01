"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const roles = [
  { title: "SDE 1", icon: "💻", color: "from-blue-50 to-blue-100" },
  { title: "SDE 2", icon: "🚀", color: "from-purple-50 to-purple-100" },
  { title: "Product Manager", icon: "📊", color: "from-green-50 to-green-100" },
  { title: "Data Analyst", icon: "📈", color: "from-yellow-50 to-yellow-100" },
  { title: "UI/UX Designer", icon: "🎨", color: "from-pink-50 to-pink-100" },
  { title: "Backend Engineer", icon: "⚙️", color: "from-gray-50 to-gray-100" },
];

export default function RoleSelection() {
  const params = useParams();
  const companyName = params.company ? decodeURIComponent(params.company).toUpperCase() : "COMPANY";

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Link href="/dashboard/company-questions" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Companies
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          {companyName} Roles
        </h1>
        <p className="text-gray-600 text-lg">
          Select a role to view top interview questions for {companyName}.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <Link href={`/dashboard/company-questions/${params.company}/${role.title.toLowerCase().replace(/ /g, "-").replace(/\//g, "-")}`} key={role.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`h-full p-8 rounded-2xl bg-linear-to-br ${role.color} border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group`}
            >
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {role.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {role.title}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
