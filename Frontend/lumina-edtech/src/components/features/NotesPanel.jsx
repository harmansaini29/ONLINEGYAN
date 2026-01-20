import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Plus, Trash2, Download } from 'lucide-react';

export default function NotesPanel({ onSeek }) {
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, timestamp: "02:15", text: "React UseEffect runs after every render unless dependencies are specified." },
    { id: 2, timestamp: "05:40", text: "Virtual DOM diffing algorithm explanation." }
  ]);

  const addNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    
    // In a real app, you'd get the current video time here
    const newNote = {
      id: Date.now(),
      timestamp: "08:30", // Mock timestamp
      text: noteInput
    };
    
    setNotes([newNote, ...notes]);
    setNoteInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0C15]">
      <div className="p-4 border-b border-white/5 flex justify-between items-center">
        <h4 className="font-semibold text-white">My Notes</h4>
        <button className="text-gray-400 hover:text-white transition-colors" title="Export Notes">
            <Download size={16} />
        </button>
      </div>

      {/* Input Area */}
      <div className="p-4 border-b border-white/5 bg-[#13141f]">
        <form onSubmit={addNote}>
            <textarea 
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Type a note (timestamp will be auto-saved)..."
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none h-20 mb-2"
            />
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> Current: 08:30
                </span>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors">
                    <Plus size={12} /> Add Note
                </button>
            </div>
        </form>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence initial={false}>
            {notes.map((note) => (
                <motion.div 
                    key={note.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="group bg-white/5 border border-white/5 rounded-xl p-3 hover:border-indigo-500/30 transition-colors"
                >
                    <div className="flex justify-between items-start mb-2">
                        <button 
                            onClick={() => onSeek && onSeek(note.timestamp)}
                            className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono font-medium hover:bg-indigo-500/30 transition-colors"
                        >
                            {note.timestamp}
                        </button>
                        <button 
                            onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                            className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{note.text}</p>
                </motion.div>
            ))}
        </AnimatePresence>
        {notes.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">
                No notes yet. Start typing above!
            </div>
        )}
      </div>
    </div>
  );
}