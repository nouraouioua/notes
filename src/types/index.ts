export interface Profile {
  id: string;
  email: string;
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  summary: string | null;
  tags: string[];
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface NoteEmbedding {
  id: string;
  note_id: string;
  embedding: number[];
  created_at: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
  summary?: string | null;
  tags?: string[];
  is_pinned?: boolean;
}

export interface AIAction {
  type: 'summarize' | 'generate_tags' | 'improve_content' | 'ask_question';
  noteId?: string;
  content?: string;
  question?: string;
}

export interface AIResponse {
  success: boolean;
  data?: {
    summary?: string;
    tags?: string[];
    improvedContent?: string;
    answer?: string;
    referencedNotes?: string[];
  };
  error?: string;
}

export interface QAMessage {
  id: string;
  question: string;
  answer: string;
  referencedNotes: string[];
  timestamp: string;
}
