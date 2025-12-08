import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { NotesSidebar } from '../components/NotesSidebar';
import { NoteEditor } from '../components/NoteEditor';
import { AIPanel } from '../components/AIPanel';
import { ToastContainer, useToast } from '../components/Toast';
import { LoadingScreen } from '../components/LoadingSpinner';
import {
  useNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
  useTogglePin,
  useSearchNotes,
} from '../hooks/useNotes';
import {
  useSummarizeNote,
  useGenerateTags,
  useImproveContent,
  useAskQuestion,
} from '../hooks/useAI';

export function AppPage() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  const { toasts, addToast, removeToast } = useToast();

  // Notes hooks
  const { notes: allNotes, isLoading: notesLoading } = useNotes();
  const { data: searchResults } = useSearchNotes(searchQuery);
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();
  const togglePinMutation = useTogglePin();

  // AI hooks
  const summarizeMutation = useSummarizeNote();
  const generateTagsMutation = useGenerateTags();
  const improveContentMutation = useImproveContent();
  const askQuestionMutation = useAskQuestion();

  const displayedNotes = searchQuery ? searchResults || [] : allNotes;
  const selectedNote = displayedNotes.find((n) => n.id === selectedNoteId) || null;

  // Auto-select first note when notes load
  useEffect(() => {
    if (!selectedNoteId && displayedNotes.length > 0) {
      setSelectedNoteId(displayedNotes[0].id);
    }
  }, [displayedNotes, selectedNoteId]);

  const handleCreateNote = async () => {
    try {
      const newNote = await createNoteMutation.mutateAsync({
        title: 'Untitled Note',
        content: '',
      });
      setSelectedNoteId(newNote.id);
      addToast('Note created successfully', 'success');
    } catch (error: any) {
      addToast(error.message || 'Failed to create note', 'error');
    }
  };

  const handleUpdateNote = async (updates: { title: string; content: string }) => {
    if (!selectedNoteId) return;

    try {
      await updateNoteMutation.mutateAsync({
        noteId: selectedNoteId,
        updates,
      });
    } catch (error: any) {
      addToast(error.message || 'Failed to update note', 'error');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNoteMutation.mutateAsync(noteId);
      if (selectedNoteId === noteId) {
        setSelectedNoteId(null);
      }
      addToast('Note deleted successfully', 'success');
    } catch (error: any) {
      addToast(error.message || 'Failed to delete note', 'error');
    }
  };

  const handleTogglePin = async (noteId: string, isPinned: boolean) => {
    try {
      await togglePinMutation.mutateAsync({ noteId, isPinned });
    } catch (error: any) {
      addToast(error.message || 'Failed to toggle pin', 'error');
    }
  };

  // AI Actions
  const handleSummarize = async (noteId: string, content: string) => {
    try {
      const summary = await summarizeMutation.mutateAsync({ noteId, content });
      if (summary) {
        await updateNoteMutation.mutateAsync({
          noteId,
          updates: { summary },
        });
        addToast('Summary generated successfully', 'success');
      }
    } catch (error: any) {
      addToast(error.message || 'Failed to generate summary', 'error');
    }
  };

  const handleGenerateTags = async (noteId: string, content: string) => {
    try {
      const tags = await generateTagsMutation.mutateAsync({ noteId, content });
      if (tags) {
        await updateNoteMutation.mutateAsync({
          noteId,
          updates: { tags },
        });
        addToast('Tags generated successfully', 'success');
      }
    } catch (error: any) {
      addToast(error.message || 'Failed to generate tags', 'error');
    }
  };

  const handleImproveContent = async (noteId: string, content: string): Promise<string> => {
    try {
      const improvedContent = await improveContentMutation.mutateAsync({ noteId, content });
      return improvedContent;
    } catch (error: any) {
      addToast(error.message || 'Failed to improve content', 'error');
      throw error;
    }
  };

  const handleAskQuestion = async (question: string) => {
    try {
      const result = await askQuestionMutation.mutateAsync(question);
      return result;
    } catch (error: any) {
      addToast(error.message || 'Failed to answer question', 'error');
      throw error;
    }
  };

  if (notesLoading) {
    return <LoadingScreen />;
  }

  const isAILoading =
    summarizeMutation.isPending ||
    generateTagsMutation.isPending ||
    improveContentMutation.isPending ||
    askQuestionMutation.isPending;

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <NotesSidebar
          notes={displayedNotes}
          selectedNoteId={selectedNoteId}
          onSelectNote={setSelectedNoteId}
          onCreateNote={handleCreateNote}
          onDeleteNote={handleDeleteNote}
          onTogglePin={handleTogglePin}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <NoteEditor
          note={selectedNote}
          onSave={handleUpdateNote}
          onOpenAI={() => setIsAIPanelOpen(true)}
          isSaving={updateNoteMutation.isPending}
        />

        <AIPanel
          isOpen={isAIPanelOpen}
          onClose={() => setIsAIPanelOpen(false)}
          note={selectedNote}
          onSummarize={handleSummarize}
          onGenerateTags={handleGenerateTags}
          onImproveContent={handleImproveContent}
          onAskQuestion={handleAskQuestion}
          isLoading={isAILoading}
        />
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
