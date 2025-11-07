import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function StickyNotesSection({ notes, onAdd, onDelete, itemVariants }) {
    const [showAllNotes, setShowAllNotes] = useState(false);
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNoteContent, setNewNoteContent] = useState("");

    const handleAdd = () => {
        onAdd(newNoteContent);
        setNewNoteContent("");
        setShowAddNote(false);
    };

    return (
        <>
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col relative min-h-[250px]">
                <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                    <span className="text-green-500">📌</span> Sticky Notes
                </h3>
                <div className="bg-[#fef9c3] p-4 rounded-xl flex-1 shadow-inner rotate-1 mb-4 flex flex-col justify-between group">
                    <p className="text-gray-700 font-handwriting text-sm leading-relaxed whitespace-pre-wrap">
                        {notes.length > 0 ? notes[0].content : "No notes yet. Add one!"}
                    </p>
                    {notes.length > 0 && (
                        <button
                            onClick={() => onDelete(notes[0].id)}
                            className="self-end text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >
                            Delete
                        </button>
                    )}
                </div>
                <div className="flex gap-2 mt-auto">
                    <button
                        onClick={() => setShowAllNotes(true)}
                        className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600 transition-colors"
                    >
                        View All Notes
                    </button>
                    <button
                        onClick={() => setShowAddNote(true)}
                        className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600 transition-colors"
                    >
                        Add New Note
                    </button>
                </div>
            </motion.div>


            <AnimatePresence>
                {showAddNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddNote(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Note</h3>
                            <textarea
                                value={newNoteContent}
                                onChange={(e) => setNewNoteContent(e.target.value)}
                                className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7ec4b6] focus:border-transparent outline-none resize-none bg-gray-50"
                                placeholder="Write your note here..."
                            />
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setShowAddNote(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="px-4 py-2 bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white rounded-lg transition-colors"
                                >
                                    Save Note
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showAllNotes && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAllNotes(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Your Sticky Notes</h3>
                                <button onClick={() => setShowAllNotes(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {notes.map((note) => (
                                    <div key={note.id} className="bg-[#fef9c3] p-4 rounded-xl shadow-sm relative group">
                                        <p className="text-gray-800 font-handwriting text-sm whitespace-pre-wrap">{note.content}</p>
                                        <p className="text-[10px] text-gray-500 mt-2 text-right">{new Date(note.createdAt).toLocaleDateString()}</p>
                                        <button
                                            onClick={() => onDelete(note.id)}
                                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                                {notes.length === 0 && (
                                    <p className="text-gray-500 col-span-2 text-center py-8">No notes yet.</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
