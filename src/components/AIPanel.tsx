import { useState } from 'react';
import { X, Sparkles, Tag, FileText, Send } from 'lucide-react';
import type { Note } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { Modal } from './Modal';

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onSummarize: (noteId: string, content: string) => Promise<void>;
  onGenerateTags: (noteId: string, content: string) => Promise<void>;
  onImproveContent: (noteId: string, content: string) => Promise<string>;
  onAskQuestion: (question: string) => Promise<{ answer: string; referencedNotes: string[] }>;
  isLoading: boolean;
}

export function AIPanel({
  isOpen,
  onClose,
  note,
  onSummarize,
  onGenerateTags,
  onImproveContent,
  onAskQuestion,
  isLoading,
}: AIPanelProps) {
  const [improvedContent, setImprovedContent] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [qaHistory, setQaHistory] = useState<Array<{ question: string; answer: string; notes: string[] }>>([]);
  const [activeTab, setActiveTab] = useState<'actions' | 'qa'>('actions');

  const handleSummarize = async () => {
    if (!note) return;
    await onSummarize(note.id, note.content);
  };

  const handleGenerateTags = async () => {
    if (!note) return;
    await onGenerateTags(note.id, note.content);
  };

  const handleImproveContent = async () => {
    if (!note) return;
    const improved = await onImproveContent(note.id, note.content);
    setImprovedContent(improved);
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const result = await onAskQuestion(question);
    setQaHistory([...qaHistory, { question, answer: result.answer, notes: result.referencedNotes }]);
    setQuestion('');
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Tools</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('actions')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'actions'
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Note Actions
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'qa'
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Ask AI
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'actions' && (
          <div className="space-y-3">
            {!note ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                Select a note to use AI tools
              </p>
            ) : (
              <>
                <AIActionButton
                  icon={<FileText className="w-4 h-4" />}
                  label="Summarize Note"
                  description="Generate a concise summary"
                  onClick={handleSummarize}
                  disabled={isLoading || !note.content}
                />

                <AIActionButton
                  icon={<Tag className="w-4 h-4" />}
                  label="Generate Tags"
                  description="Auto-generate relevant tags"
                  onClick={handleGenerateTags}
                  disabled={isLoading || !note.content}
                />

                <AIActionButton
                  icon={<Sparkles className="w-4 h-4" />}
                  label="Improve Writing"
                  description="Enhance clarity and tone"
                  onClick={handleImproveContent}
                  disabled={isLoading || !note.content}
                />

                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <LoadingSpinner size="md" />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'qa' && (
          <div className="flex flex-col h-full">
            {/* Q&A History */}
            <div className="flex-1 space-y-4 mb-4">
              {qaHistory.length === 0 ? (
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  Ask any question about your notes
                </div>
              ) : (
                qaHistory.map((qa, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                        {qa.question}
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-900 dark:text-white">{qa.answer}</p>
                      {qa.notes.length > 0 && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Referenced: {qa.notes.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Question Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                placeholder="Ask anything about your notes..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleAskQuestion}
                disabled={isLoading || !question.trim()}
                className="btn-primary px-3"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Improved Content Modal */}
      {improvedContent && (
        <Modal
          isOpen={true}
          onClose={() => setImprovedContent(null)}
          title="Improved Content"
          footer={
            <div className="flex gap-2 justify-end">
              <button onClick={() => setImprovedContent(null)} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (note) {
                    // This would trigger a content update in the parent component
                    // For now, we'll just close the modal
                    setImprovedContent(null);
                  }
                }}
                className="btn-primary"
              >
                Use This Version
              </button>
            </div>
          }
        >
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {improvedContent}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

interface AIActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

function AIActionButton({ icon, label, description, onClick, disabled }: AIActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-start gap-3">
        <div className="text-blue-600 dark:text-blue-400 mt-0.5">{icon}</div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{label}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
}
