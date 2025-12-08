import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GEMINI_API_KEY = Deno.env.get('AIzaSyAAcJ-HGW_DznxbKKg6AR1HttiyAPpl7pg')
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`

interface AIRequest {
  type: 'summarize' | 'generate_tags' | 'improve_content' | 'ask_question'
  noteId?: string
  content?: string
  question?: string
}

interface AIResponse {
  success: boolean
  data?: {
    summary?: string
    tags?: string[]
    improvedContent?: string
    answer?: string
    referencedNotes?: string[]
  }
  error?: string
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing authorization header')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    // Parse request body
    const aiRequest: AIRequest = await req.json()

    let response: AIResponse

    switch (aiRequest.type) {
      case 'summarize':
        response = await summarizeNote(aiRequest.content || '')
        break
      case 'generate_tags':
        response = await generateTags(aiRequest.content || '')
        break
      case 'improve_content':
        response = await improveContent(aiRequest.content || '')
        break
      case 'ask_question':
        response = await askQuestion(aiRequest.question || '', user.id, supabaseClient)
        break
      default:
        throw new Error('Invalid AI action type')
    }

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})

/**
 * Call Gemini API with a prompt
 */
async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Gemini API error: ${error}`)
  }

  const data = await response.json()
  return data.candidates[0]?.content?.parts[0]?.text || ''
}

/**
 * Summarize a note using Gemini
 */
async function summarizeNote(content: string): Promise<AIResponse> {
  try {
    const prompt = `Please provide a concise summary of the following note in 2-3 sentences. Focus on the main points and key takeaways.

Note content:
${content}`

    const summary = await callGemini(prompt)

    return {
      success: true,
      data: { summary: summary.trim() },
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Generate tags for a note using Gemini
 */
async function generateTags(content: string): Promise<AIResponse> {
  try {
    const prompt = `Analyze the following note and generate 3-5 relevant tags/keywords. Return only the tags as a comma-separated list, nothing else.

Note content:
${content}`

    const tagsText = await callGemini(prompt)
    const tags = tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    return {
      success: true,
      data: { tags },
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Improve note content using Gemini
 */
async function improveContent(content: string): Promise<AIResponse> {
  try {
    const prompt = `Please improve the following note by enhancing clarity, grammar, and tone while preserving the original meaning. Keep the same general structure and length.

Original content:
${content}`

    const improvedContent = await callGemini(prompt)

    return {
      success: true,
      data: { improvedContent: improvedContent.trim() },
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Answer a question based on user's notes using semantic search
 */
async function askQuestion(
  question: string,
  userId: string,
  supabaseClient: any
): Promise<AIResponse> {
  try {
    // Fetch all user's notes
    const { data: notes, error } = await supabaseClient
      .from('notes')
      .select('id, title, content')
      .eq('user_id', userId)
      .limit(20)

    if (error) throw error

    if (!notes || notes.length === 0) {
      return {
        success: true,
        data: {
          answer: "You don't have any notes yet. Create some notes first!",
          referencedNotes: [],
        },
      }
    }

    // For basic implementation, we'll use a simple text-based relevance
    // In production, you'd use embeddings + pgvector for semantic search
    const notesContext = notes
      .map((note: any) => `Title: ${note.title}\nContent: ${note.content}\n---`)
      .join('\n')

    const prompt = `Based on the following notes, please answer this question: "${question}"

Notes:
${notesContext}

Provide a clear, concise answer based only on the information in the notes. If the notes don't contain relevant information, say so. Reference which notes you used to answer.`

    const answer = await callGemini(prompt)

    // Extract referenced note titles (simple approach)
    const referencedNotes = notes
      .filter((note: any) => answer.includes(note.title))
      .map((note: any) => note.title)

    return {
      success: true,
      data: {
        answer: answer.trim(),
        referencedNotes,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}
