import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesService } from '../services/notes.service';
import type { CreateNoteInput, UpdateNoteInput } from '../types';
import { useAuth } from './useAuth';
import { useEffect } from 'react';

export function useNotes() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch notes
  const { data: notes, isLoading, error } = useQuery({
    queryKey: ['notes', user?.id],
    queryFn: () => notesService.getNotes(user!.id),
    enabled: !!user,
  });

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const subscription = notesService.subscribeToNotes(user.id, () => {
      // Invalidate and refetch notes when changes occur
      queryClient.invalidateQueries({ queryKey: ['notes', user.id] });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, queryClient]);

  return {
    notes: notes || [],
    isLoading,
    error,
  };
}

export function useCreateNote() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateNoteInput) => notesService.createNote(user!.id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', user!.id] });
    },
  });
}

export function useUpdateNote() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, updates }: { noteId: string; updates: UpdateNoteInput }) =>
      notesService.updateNote(noteId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', user!.id] });
    },
  });
}

export function useDeleteNote() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: string) => notesService.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', user!.id] });
    },
  });
}

export function useTogglePin() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, isPinned }: { noteId: string; isPinned: boolean }) =>
      notesService.togglePin(noteId, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', user!.id] });
    },
  });
}

export function useSearchNotes(query: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['notes', 'search', user?.id, query],
    queryFn: () => notesService.searchNotes(user!.id, query),
    enabled: !!user,
  });
}
