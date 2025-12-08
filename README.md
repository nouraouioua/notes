# AI Notes - Intelligent Note-Taking Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green)](https://supabase.com)
[![Gemini](https://img.shields.io/badge/Google-Gemini_AI-orange)](https://ai.google.dev/)

A modern, full-stack AI-powered note-taking application built with React, Supabase, and Google Gemini 2.0. Features real-time sync, smart summarization, automatic tag generation, content improvement, and AI-powered Q&A across all your notes.

## ✨ Features

### Core Features
- 🔐 **Secure Authentication** - Email/password signup and login via Supabase Auth
- 📝 **Rich Note Editor** - Create, edit, and delete notes with a clean interface
- 🔄 **Real-time Sync** - Automatic synchronization across all devices
- 🔍 **Instant Search** - Lightning-fast full-text search across all notes
- 📌 **Pin Important Notes** - Keep critical notes at the top of your list
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### AI-Powered Features
- 🤖 **Smart Summarization** - Generate concise summaries of lengthy notes
- 🏷️ **Auto-tagging** - Automatically generate relevant tags for organization
- ✨ **Content Improvement** - Enhance writing clarity, tone, and grammar
- 💬 **Ask AI Anything** - Query across all your notes with natural language

## 🛠️ Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router v6 (routing)
- TanStack Query (state management)
- Lucide React (icons)
- date-fns (date utilities)

**Backend**
- Supabase (PostgreSQL database)
- Supabase Auth (authentication)
- Supabase Edge Functions (serverless)
- Row Level Security (RLS)

**AI**
- Google Gemini 2.0 Flash (via Edge Functions)
- Secure API key management

## 📋 Prerequisites

- Node.js 18+ and npm
- [Supabase account](https://supabase.com) (free tier works)
- [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier available)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/nouraouioua/notes.git
cd notes
npm install
```

### 2. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for provisioning to complete (2-3 minutes)

#### Run Database Migration
1. In Supabase dashboard, navigate to **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and execute the SQL

This creates:
- User profiles table
- Notes table with full-text search
- Note embeddings table (for future semantic search)
- RLS policies for security
- Indexes for performance

#### Get API Credentials
1. Go to **Settings** → **API**
2. Copy **Project URL** and **anon/public key**

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Deploy Edge Functions

#### Install Supabase CLI
```bash
npm install -g supabase
```

#### Login and Link Project
```bash
supabase login
supabase link --project-ref your-project-ref
```

#### Set Gemini API Key
```bash
supabase secrets set GEMINI_API_KEY=your-gemini-api-key
```

Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

#### Deploy Function
```bash
supabase functions deploy gemini-ai
```

### 5. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` and start taking notes! 🎉

## 📁 Project Structure

```
notes/
├── src/
│   ├── components/          # React components
│   │   ├── AIPanel.tsx      # AI features sidebar
│   │   ├── NoteEditor.tsx   # Main note editor
│   │   ├── NotesSidebar.tsx # Notes list
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.tsx      # Authentication
│   │   ├── useNotes.ts      # Notes CRUD
│   │   └── useAI.ts         # AI operations
│   ├── services/            # API layer
│   │   ├── auth.service.ts
│   │   ├── notes.service.ts
│   │   └── ai.service.ts
│   ├── pages/               # Route pages
│   ├── types/               # TypeScript types
│   └── lib/                 # Third-party configs
├── supabase/
│   ├── functions/           # Edge Functions
│   │   └── gemini-ai/       # AI integration
│   └── migrations/          # Database schema
├── docs/                    # Documentation
└── ...
```

## 🎯 Usage

### Creating Notes
1. Sign up or log in
2. Click "New Note" or use the editor
3. Start typing - saves automatically
4. Click the pin icon to keep notes at top

### AI Features
1. Select a note
2. Open AI panel (right sidebar)
3. Choose an action:
   - **Summarize** - Get a concise summary
   - **Generate Tags** - Auto-create relevant tags
   - **Improve Content** - Enhance writing quality
   - **Ask AI** - Query all your notes

### Search
- Use the search bar at the top
- Searches across titles and content
- Results update instantly

## 🔒 Security

- **Row Level Security (RLS)** - Users can only access their own data
- **JWT Authentication** - Secure token-based auth
- **API Key Protection** - Gemini API key stored securely in Edge Functions
- **Environment Variables** - Credentials never committed to Git

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nouraouioua/notes)

1. Click the button above or go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Import repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables
5. Deploy!

## 🐛 Troubleshooting

**App shows setup screen**
- Verify `.env` has correct Supabase credentials
- Ensure URL format is `https://xxx.supabase.co`

**AI features not working**
- Check Gemini API key is set: `supabase secrets list`
- Verify Edge Function is deployed: `supabase functions list`
- Check logs: `supabase functions logs gemini-ai`

**Database errors**
- Confirm migration was run successfully
- Check RLS policies are enabled in Supabase dashboard
- Verify user is authenticated

**Build errors**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Roadmap

- [ ] Rich text editor with Markdown support
- [ ] Note sharing and collaboration
- [ ] Export notes (PDF, Markdown, HTML)
- [ ] Mobile app (React Native)
- [ ] Voice-to-text notes
- [ ] Dark mode
- [ ] Note templates
- [ ] File attachments
- [ ] Semantic search with embeddings
- [ ] Custom AI prompts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend infrastructure and real-time capabilities
- [Google Gemini](https://ai.google.dev/) - Advanced AI capabilities
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide](https://lucide.dev) - Beautiful open-source icons
- [Vite](https://vitejs.dev) - Lightning-fast build tool

## 📧 Support

- 📖 [Documentation](./docs/)
- 🐛 [Report a bug](https://github.com/nouraouioua/notes/issues)
- 💡 [Request a feature](https://github.com/nouraouioua/notes/issues)
- 📧 [Contact](https://github.com/nouraouioua)

---

**Built with ❤️ using React, TypeScript, Supabase, and Gemini AI**

⭐ Star this repo if you find it helpful!
