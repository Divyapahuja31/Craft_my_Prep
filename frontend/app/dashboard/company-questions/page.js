"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png", color: "from-blue-50 to-blue-100" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png", color: "from-sky-50 to-sky-100" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png", color: "from-orange-50 to-orange-100" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png", color: "from-blue-50 to-indigo-100" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png", color: "from-red-50 to-red-100" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png", color: "from-gray-50 to-gray-200" },
  { name: "Adobe", logo: "https://cdn-icons-png.flaticon.com/512/732/732171.png", color: "from-red-50 to-pink-100" },
  { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", color: "from-gray-50 to-gray-100" },
  { name: "Swiggy", logo: "https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png", color: "from-orange-50 to-orange-100" },
  { name: "Flipkart", logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png", color: "from-blue-50 to-yellow-100" },
  { name: "Zomato", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg", color: "from-red-50 to-red-100" },
  { name: "Startups", logo: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png", subtext: "(FamPay, Razorpay, Zepto etc.)", color: "from-purple-50 to-purple-100" },
];

// Removed the fixing logic as we are using direct reliable URLs now
const companiesFixed = companies;


export default function CompanyQuestions() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Company Questions
        </h1>
        <p className="text-gray-600 text-lg">
          Practice top interview questions from leading tech companies.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {companiesFixed.map((company, index) => (
          <Link href={`/dashboard/company-questions/${company.name.toLowerCase()}`} key={company.name}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`h-full p-6 rounded-2xl bg-linear-to-br ${company.color} border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group`}
            >
              <div className="w-24 h-24 bg-white rounded-full p-4 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
                {company.subtext && (
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    {company.subtext}
                  </p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
