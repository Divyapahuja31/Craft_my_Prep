import { motion } from "framer-motion";

export default function RecommendedResourceCard({ article, itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#7ec4b6] to-[#6eb4a6] rounded-3xl p-6 shadow-md text-white flex-1 flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-lg mb-1">📚 Recommended Read</h3>
                        <p className="text-green-50 font-medium text-sm">
                            {article ? article.title : "System Design: Scalability Basics"}
                        </p>
                    </div>
                    <span className="bg-white/20 p-2 rounded-lg text-xl">📖</span>
                </div>
                <p className="text-sm text-green-50 mb-4 leading-relaxed line-clamp-2">
                    {article ? article.description : "Learn the core concepts of horizontal vs vertical scaling and when to use them."}
                </p>
            </div>
            <a
                href={article ? article.url : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-auto"
            >
                <button className="w-full bg-white text-[#7ec4b6] py-2 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors shadow-sm">
                    Read Article
                </button>
            </a>
        </motion.div>
    );
}
