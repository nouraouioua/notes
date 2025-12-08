# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Auth Page  │  │   App Page   │  │  Components  │     │
│  │  - Login     │  │  - Notes List│  │  - Editor    │     │
│  │  - Signup    │  │  - Search    │  │  - AI Panel  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                          │                                  │
│                    ┌─────▼─────┐                           │
│                    │  Services │                           │
│                    │  & Hooks  │                           │
│                    └─────┬─────┘                           │
└──────────────────────────┼──────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
    ┌─────────▼────────┐    ┌──────────▼───────────┐
    │ Supabase Client  │    │  Supabase Auth       │
    │ - Real-time DB   │    │  - JWT Tokens        │
    │ - REST API       │    │  - Session Mgmt      │
    └─────────┬────────┘    └──────────┬───────────┘
              │                         │
    ┌─────────▼─────────────────────────▼──────────┐
    │          Supabase Backend                     │
    │  ┌──────────────────────────────────────┐    │
    │  │        PostgreSQL Database           │    │
    │  │  - profiles                          │    │
    │  │  - notes                             │    │
    │  │  - note_embeddings (pgvector)        │    │
    │  │  - RLS Policies                      │    │
    │  └──────────────────────────────────────┘    │
    │                                                │
    │  ┌──────────────────────────────────────┐    │
    │  │     Edge Function: gemini-ai         │    │
    │  │  - Validates Auth (JWT)              │    │
    │  │  - Calls Gemini API                  │    │
    │  │  - Processes AI requests             │    │
    │  └────────────┬─────────────────────────┘    │
    └───────────────┼──────────────────────────────┘
                    │
         ┌──────────▼──────────┐
         │   Gemini API        │
         │   (Google AI)       │
         │  - Summarization    │
         │  - Tag Generation   │
         │  - Content Improve  │
         │  - Q&A              │
         └─────────────────────┘
```

## Data Flow

### 1. User Authentication

```
User Input → React Auth Page → Supabase Auth Service
    ↓
Supabase Auth validates → Issues JWT token
    ↓
Token stored in browser → Used for all API requests
    ↓
Auto-redirects to /app route
```

### 2. Notes CRUD Operations

```
User Action → React Component → useNotes Hook
    ↓
notesService.createNote/updateNote/etc.
    ↓
Supabase Client (with JWT token)
    ↓
PostgreSQL Database (RLS validates user_id)
    ↓
Real-time subscription notifies all connected clients
    ↓
React Query invalidates cache → UI updates
```

### 3. AI Features Flow

```
User clicks "Summarize" → AIPanel Component
    ↓
aiService.summarizeNote(noteId, content)
    ↓
supabase.functions.invoke('gemini-ai', {...})
    ↓
Edge Function validates JWT
    ↓
Edge Function calls Gemini API (with secure API key)
    ↓
Gemini processes request → Returns result
    ↓
Edge Function returns formatted response
    ↓
Frontend receives data → Updates note.summary
    ↓
notesService.updateNote() saves to DB
    ↓
UI shows success toast and displays summary
```

### 4. Search Flow

```
User types in search box → Debounced input
    ↓
useSearchNotes(query) hook triggered
    ↓
notesService.searchNotes(userId, query)
    ↓
Supabase query: .ilike() on title and content
    ↓
Results returned and cached by React Query
    ↓
NotesSidebar updates to show filtered results
```

## Component Hierarchy

```
App.tsx
├── QueryClientProvider
│   └── AuthProvider
│       └── BrowserRouter
│           ├── Route: /auth
│           │   └── AuthPage
│           │       ├── Login Form
│           │       └── Signup Form
│           │
│           └── Route: /app (Protected)
│               └── AppPage
│                   ├── Navbar
│                   │   └── User Menu
│                   │
│                   ├── NotesSidebar
│                   │   ├── Search Input
│                   │   ├── New Note Button
│                   │   ├── Pinned Notes List
│                   │   └── All Notes List
│                   │
│                   ├── NoteEditor
│                   │   ├── Title Input
│                   │   ├── Tags Display
│                   │   ├── Summary Display
│                   │   └── Content Textarea
│                   │
│                   ├── AIPanel (Slide-in)
│                   │   ├── Note Actions Tab
│                   │   │   ├── Summarize Button
│                   │   │   ├── Generate Tags Button
│                   │   │   └── Improve Content Button
│                   │   │
│                   │   └── Ask AI Tab
│                   │       ├── Q&A History
│                   │       └── Question Input
│                   │
│                   └── ToastContainer
```

## State Management

### React Query (TanStack Query)

**Manages**:
- Server state caching
- Background refetching
- Optimistic updates
- Request deduplication

**Query Keys**:
```typescript
['notes', userId]                    // All notes
['notes', 'search', userId, query]  // Search results
```

**Mutations**:
- createNote
- updateNote
- deleteNote
- togglePin
- AI operations (summarize, generateTags, etc.)

### Context API

**AuthContext**: 
- Current user
- Session
- Sign in/up/out methods
- Loading state

### Local Component State

- Form inputs (title, content)
- UI state (modal open/closed, active tab)
- Temporary data (improved content preview)

## Security Architecture

### Row Level Security (RLS)

```sql
-- Example policy for notes table
CREATE POLICY "Users can view own notes"
    ON notes FOR SELECT
    USING (auth.uid() = user_id);
```

**Ensures**:
- Users can only access their own data
- Enforced at database level
- No way to bypass via API

### Authentication Flow

```
1. User signs up/in
2. Supabase Auth creates user in auth.users
3. JWT token issued with user.id
4. All requests include: Authorization: Bearer <token>
5. Supabase validates JWT on every request
6. RLS policies check auth.uid() = user_id
```

### API Key Security

**Frontend (.env)**:
- ✅ Supabase URL (public)
- ✅ Supabase Anon Key (public, RLS-protected)
- ❌ Never include Gemini API key

**Backend (Edge Function Secrets)**:
- ✅ Gemini API Key (secure)
- ✅ Only accessible to Edge Functions
- ✅ Never exposed to client

## Database Schema

### ER Diagram

```
┌─────────────────┐
│   auth.users    │ (Managed by Supabase)
│  - id (PK)      │
│  - email        │
└────────┬────────┘
         │
         │ 1:1
         │
    ┌────▼─────────┐
    │   profiles   │
    │  - id (PK,FK)│
    │  - email     │
    │  - created_at│
    └──────────────┘
         │
         │ 1:N
         │
    ┌────▼─────────────────┐
    │      notes           │
    │  - id (PK)           │
    │  - user_id (FK)      │
    │  - title             │
    │  - content           │
    │  - summary           │
    │  - tags[]            │
    │  - is_pinned         │
    │  - created_at        │
    │  - updated_at        │
    └────────┬─────────────┘
             │
             │ 1:1
             │
    ┌────────▼──────────────┐
    │  note_embeddings      │
    │  - id (PK)            │
    │  - note_id (FK,UNIQUE)│
    │  - embedding (vector) │
    │  - created_at         │
    └───────────────────────┘
```

## API Endpoints

### Supabase REST API (Auto-generated)

```
GET    /rest/v1/notes?user_id=eq.{userId}
POST   /rest/v1/notes
PATCH  /rest/v1/notes?id=eq.{noteId}
DELETE /rest/v1/notes?id=eq.{noteId}
```

### Supabase Edge Functions

```
POST /functions/v1/gemini-ai
Body: {
  type: 'summarize' | 'generate_tags' | 'improve_content' | 'ask_question',
  noteId?: string,
  content?: string,
  question?: string
}
```

## Performance Optimizations

1. **React Query Caching**: Reduces unnecessary API calls
2. **Real-time Subscriptions**: Instant updates without polling
3. **Debounced Search**: Limits search queries while typing
4. **Auto-save with Debounce**: Saves 2s after user stops typing
5. **Lazy Loading**: Components loaded on demand
6. **Index Optimization**: Database indexes on frequently queried columns
7. **Connection Pooling**: Supabase handles PostgreSQL connections

## Deployment Architecture

```
┌─────────────────────┐
│   Vercel/Netlify    │
│   - React App       │
│   - CDN Distribution│
│   - SSL/HTTPS       │
└──────────┬──────────┘
           │
           │ API Calls
           │
┌──────────▼──────────────┐
│   Supabase Cloud        │
│  ┌──────────────────┐   │
│  │   PostgreSQL     │   │
│  │   (Multi-region) │   │
│  └──────────────────┘   │
│  ┌──────────────────┐   │
│  │  Edge Functions  │   │
│  │  (Deno Runtime)  │   │
│  └──────────────────┘   │
│  ┌──────────────────┐   │
│  │   Auth Service   │   │
│  └──────────────────┘   │
└──────────┬──────────────┘
           │
           │ AI Requests
           │
┌──────────▼──────────┐
│   Google Gemini     │
│   API               │
└─────────────────────┘
```

## Technology Choices Rationale

| Technology | Why Chosen |
|------------|-----------|
| **React** | Component reusability, large ecosystem, TypeScript support |
| **TypeScript** | Type safety, better DX, fewer runtime errors |
| **Vite** | Fast dev server, optimized builds, modern tooling |
| **Tailwind** | Rapid styling, consistent design, small bundle size |
| **Supabase** | Complete backend, real-time, built-in auth, PostgreSQL |
| **React Query** | Server state management, caching, optimistic updates |
| **Gemini API** | Free tier, fast responses, good for text generation |
| **Edge Functions** | Secure API key storage, low latency, serverless |

## Scalability Considerations

**Current Implementation (MVP)**:
- Suitable for 100-1000 users
- Basic text search (no vector embeddings yet)
- Single region deployment

**Future Scaling**:
- Implement pgvector for semantic search at scale
- Add Redis caching layer
- CDN for static assets
- Database read replicas
- Rate limiting per user
- Background job processing for embeddings
