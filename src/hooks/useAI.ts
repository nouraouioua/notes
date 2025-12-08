import { useMutation } from '@tanstack/react-query';
import { aiService } from '../services/ai.service';

export function useSummarizeNote() {
  return useMutation({
    mutationFn: ({ noteId, content }: { noteId: string; content: string }) =>
      aiService.summarizeNote(noteId, content),
  });
}

export function useGenerateTags() {
  return useMutation({
    mutationFn: ({ noteId, content }: { noteId: string; content: string }) =>
      aiService.generateTags(noteId, content),
  });
}

export function useImproveContent() {
  return useMutation({
    mutationFn: ({ noteId, content }: { noteId: string; content: string }) =>
      aiService.improveContent(noteId, content),
  });
}

export function useAskQuestion() {
  return useMutation({
    mutationFn: (question: string) => aiService.askQuestion(question),
  });
}
