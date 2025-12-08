import { useState, useEffect } from 'react';
import { Save, Sparkles } from 'lucide-react';
import type { Note } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface NoteEditorProps {
  note: Note | null;
  onSave: (updates: { title: string; content: string }) => void;
  onOpenAI: () => void;
  isSaving: boolean;
}

export function NoteEditor({ note, onSave, onOpenAI, isSaving }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setHasChanges(false);
    }
  }, [note]);

  const handleSave = () => {
    if (note && hasChanges) {
      onSave({ title, content });
      setHasChanges(false);
    }
  };

  // Auto-save after 2 seconds of inactivity
  useEffect(() => {
    if (!hasChanges || !note) return;

    const timer = setTimeout(() => {
      handleSave();
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, content, hasChanges]);

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">Select a note to start editing</p>
          <p className="text-sm">or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isSaving && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <LoadingSpinner size="sm" />
              <span>Saving...</span>
            </div>
          )}
          {!isSaving && hasChanges && (
            <span className="text-sm text-gray-500 dark:text-gray-400">Unsaved changes</span>
          )}
          {!isSaving && !hasChanges && (
            <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <Save className="w-4 h-4" />
              Saved
            </span>
          )}
        </div>

        <button
          onClick={onOpenAI}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          AI Tools
        </button>
      </div>

      {/* Note Title */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setHasChanges(true);
          }}
          placeholder="Note title..."
          className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
        />

        {/* Tags Display */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Summary Display */}
        {note.summary && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
              AI Summary
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-400">{note.summary}</p>
          </div>
        )}
      </div>

      {/* Note Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setHasChanges(true);
          }}
          placeholder="Start writing your note..."
          className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-400 text-base leading-relaxed"
        />
      </div>
    </div>
  );
}
