import { useState } from 'react';
import { Search, Pin, Trash2, Plus } from 'lucide-react';
import type { Note } from '../types';
import { formatRelativeTime, truncate } from '../utils/helpers';

interface NotesSidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (noteId: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (noteId: string) => void;
  onTogglePin: (noteId: string, isPinned: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function NotesSidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  onTogglePin,
  searchQuery,
  onSearchChange,
}: NotesSidebarProps) {
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);

  const pinnedNotes = notes.filter((note) => note.is_pinned);
  const unpinnedNotes = notes.filter((note) => !note.is_pinned);

  const NoteItem = ({ note }: { note: Note }) => (
    <div
      onClick={() => onSelectNote(note.id)}
      onMouseEnter={() => setHoveredNoteId(note.id)}
      onMouseLeave={() => setHoveredNoteId(null)}
      className={`p-3 rounded-lg cursor-pointer transition-colors relative group ${
        selectedNoteId === note.id
          ? 'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-600'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 border-l-4 border-transparent'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
            {note.title || 'Untitled Note'}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {truncate(note.content || 'No content', 80)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {formatRelativeTime(note.updated_at)}
          </p>
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {note.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {hoveredNoteId === note.id && (
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(note.id, !note.is_pinned);
              }}
              className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                note.is_pinned ? 'text-blue-600' : 'text-gray-400'
              }`}
              title={note.is_pinned ? 'Unpin' : 'Pin'}
            >
              <Pin className="w-4 h-4" fill={note.is_pinned ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this note?')) {
                  onDeleteNote(note.id);
                }
              }}
              className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onCreateNote}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {pinnedNotes.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Pinned
            </h2>
            <div className="space-y-2">
              {pinnedNotes.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {unpinnedNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && (
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                All Notes
              </h2>
            )}
            <div className="space-y-2">
              {unpinnedNotes.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
            </div>
          </div>
        )}

        {notes.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
            {searchQuery ? 'No notes found' : 'No notes yet. Create your first note!'}
          </div>
        )}
      </div>
    </div>
  );
}
