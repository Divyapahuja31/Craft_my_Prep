import { motion } from "framer-motion";

export default function QuoteCard({ quote, itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">💡 Quote of the Day</h3>
            {quote ? (
                <blockquote className="italic text-gray-700 font-medium text-lg border-l-4 border-[#7ec4b6] pl-4">
                    "{quote.quote}"
                    <footer className="text-gray-500 mt-2 text-sm not-italic">— {quote.author}</footer>
                </blockquote>
            ) : (
                <p className="text-gray-400">Loading inspiration...</p>
            )}
        </motion.div>
    );
}
