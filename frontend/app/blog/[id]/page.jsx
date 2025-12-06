"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { posts } from "../data";
import { useEffect, useState } from "react";

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (params.id) {
      const foundPost = posts.find((p) => p.id === params.id);
      setPost(foundPost);
    }
  }, [params.id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
       <div className={`w-full py-20 bg-gradient-to-br ${post.color}`}>
         <div className="max-w-4xl mx-auto px-6 text-center">
            <Link href="/blog">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-gray-800 font-medium mb-8 cursor-pointer hover:bg-white/40 transition-colors"
              >
                <span>←</span> Back to Blog
              </motion.div>
            </Link>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 text-gray-700"
            >
              <span className="px-3 py-1 bg-white/40 rounded-full font-semibold">{post.category}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.date}</span>
            </motion.div>
         </div>
       </div>

       <div className="max-w-3xl mx-auto px-6 py-12 -mt-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
             <div className="prose prose-lg prose-gray max-w-none">
                <p className="lead text-xl text-gray-600 mb-8 font-medium">
                  {post.excerpt}
                </p>
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {post.content || "Content for this post is coming soon."}
                </div>
             </div>

             <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-500 italic">By Craft My Prep Team</span>
                
                <div className="flex gap-2">
                   {['Twitter', 'LinkedIn', 'Copy'].map((social) => (
                     <button key={social} className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-600 font-medium transition-colors">
                        {social}
                     </button>
                   ))}
                </div>
             </div>
          </motion.div>
       </div>
    </div>
  );
}
