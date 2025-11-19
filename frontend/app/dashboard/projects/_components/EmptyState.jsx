"use client";

import { Search } from "lucide-react";

export default function EmptyState({ searchQuery, onCreateClick }) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No projects found</h3>
            <p className="text-gray-500 mt-2 max-w-md">
                {searchQuery
                    ? `No projects match "${searchQuery}"`
                    : "You haven't created any mini projects yet. Start building today!"}
            </p>
            {!searchQuery && (
                <button
                    onClick={onCreateClick}
                    className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                    Create First Project
                </button>
            )}
        </div>
    );
}
