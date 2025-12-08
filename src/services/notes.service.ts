import { supabase } from '../lib/supabase';
import type { Note, CreateNoteInput, UpdateNoteInput } from '../types';

export const notesService = {
  /**
   * Fetch all notes for the current user
   */
  async getNotes(userId: string): Promise<Note[]> {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get a single note by ID
   */
  async getNote(noteId: string): Promise<Note | null> {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new note
   */
  async createNote(userId: string, input: CreateNoteInput): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: userId,
          title: input.title,
          content: input.content,
          tags: [],
          is_pinned: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing note
   */
  async updateNote(noteId: string, updates: UpdateNoteInput): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', noteId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a note
   */
  async deleteNote(noteId: string): Promise<void> {
    const { error } = await supabase.from('notes').delete().eq('id', noteId);

    if (error) throw error;
  },

  /**
   * Toggle pin status of a note
   */
  async togglePin(noteId: string, isPinned: boolean): Promise<Note> {
    return this.updateNote(noteId, { is_pinned: isPinned });
  },

  /**
   * Search notes by text (title and content)
   */
  async searchNotes(userId: string, query: string): Promise<Note[]> {
    if (!query.trim()) {
      return this.getNotes(userId);
    }

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Subscribe to real-time changes for user's notes
   */
  subscribeToNotes(
    userId: string,
    callback: (payload: any) => void
  ) {
    return supabase
      .channel('notes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notes',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },
};
