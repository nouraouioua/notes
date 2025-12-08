import { supabase } from '../lib/supabase';
import type { AIAction, AIResponse } from '../types';

export const aiService = {
  /**
   * Call the Supabase Edge Function for AI operations
   * This keeps the Gemini API key secure on the backend
   */
  async callAIFunction(action: AIAction): Promise<AIResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('gemini-ai', {
        body: action,
      });

      if (error) throw error;
      return data as AIResponse;
    } catch (error: any) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to process AI request',
      };
    }
  },

  /**
   * Summarize a note using AI
   */
  async summarizeNote(noteId: string, content: string): Promise<string | null> {
    const response = await this.callAIFunction({
      type: 'summarize',
      noteId,
      content,
    });

    if (response.success && response.data?.summary) {
      return response.data.summary;
    }

    throw new Error(response.error || 'Failed to generate summary');
  },

  /**
   * Generate tags for a note using AI
   */
  async generateTags(noteId: string, content: string): Promise<string[]> {
    const response = await this.callAIFunction({
      type: 'generate_tags',
      noteId,
      content,
    });

    if (response.success && response.data?.tags) {
      return response.data.tags;
    }

    throw new Error(response.error || 'Failed to generate tags');
  },

  /**
   * Improve/rewrite content using AI
   */
  async improveContent(noteId: string, content: string): Promise<string> {
    const response = await this.callAIFunction({
      type: 'improve_content',
      noteId,
      content,
    });

    if (response.success && response.data?.improvedContent) {
      return response.data.improvedContent;
    }

    throw new Error(response.error || 'Failed to improve content');
  },

  /**
   * Ask a question about all notes (semantic search + Q&A)
   */
  async askQuestion(
    question: string
  ): Promise<{ answer: string; referencedNotes: string[] }> {
    const response = await this.callAIFunction({
      type: 'ask_question',
      question,
    });

    if (response.success && response.data?.answer) {
      return {
        answer: response.data.answer,
        referencedNotes: response.data.referencedNotes || [],
      };
    }

    throw new Error(response.error || 'Failed to answer question');
  },
};
