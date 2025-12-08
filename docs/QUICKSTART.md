# Quick Start Guide

Get the AI Notes app running in under 10 minutes!

## Prerequisites Check

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] A Supabase account (free tier is fine)
- [ ] A Google Gemini API key (free at aistudio.google.com)

## 5-Minute Setup

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com) → New Project
2. Name it `ai-notes-app`, choose a password and region
3. Wait ~2 minutes for provisioning

### 3. Run Database Migration (1 min)

1. In Supabase dashboard → **SQL Editor** → **New Query**
2. Copy/paste contents of `supabase/migrations/001_initial_schema.sql`
3. Click **Run**

### 4. Get API Keys (1 min)

**Supabase**:
- Dashboard → Settings → API
- Copy **Project URL** and **anon public** key

**Gemini**:
- Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Click "Create API key"
- Copy the key

### 5. Configure Environment (30 sec)

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 6. Deploy Edge Function (1 min)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project (find ref in Supabase Settings → General)
supabase link --project-ref YOUR_PROJECT_REF

# Set Gemini API key
supabase secrets set GEMINI_API_KEY=your-gemini-key

# Deploy
supabase functions deploy gemini-ai
```

### 7. Run the App! (10 sec)

```bash
npm run dev
```

Visit http://localhost:5173 🎉

## First Steps in the App

1. **Sign Up**: Create an account with email/password
2. **Create a Note**: Click "New Note" → Add title and content
3. **Try AI Features**:
   - Click "AI Tools" button
   - Try "Summarize Note" on a note with content
   - Try "Generate Tags"
   - Use "Ask AI" to query your notes

## Troubleshooting

### Can't connect to Supabase?
- Check `.env` file has correct URL and key
- Restart dev server: `Ctrl+C` then `npm run dev`

### AI features not working?
```bash
# Check if Edge Function is deployed
supabase functions list

# View logs
supabase functions logs gemini-ai

# Re-deploy if needed
supabase functions deploy gemini-ai
```

### Database errors?
- Go to Supabase → SQL Editor
- Run the migration SQL again
- Check Table Editor to verify tables exist

## What's Next?

- 📖 Read the full [README.md](../README.md)
- 🏗️ Understand the [Architecture](./ARCHITECTURE.md)
- 🔧 Detailed [Supabase Setup](./SUPABASE_SETUP.md)
- 🤖 Learn about [Gemini Configuration](./GEMINI_SETUP.md)

## Common Use Cases

### Taking Meeting Notes
1. Create a note titled "Team Meeting - [Date]"
2. Write down key points during the meeting
3. After meeting: Use AI to summarize
4. Generate tags for easy finding later

### Learning & Research
1. Create notes on different topics
2. Use "Ask AI" to query across all notes
3. Example: "What are the key differences between React and Vue?"

### Writing & Drafting
1. Write a rough draft in a note
2. Use "Improve Writing" to enhance clarity
3. Review the improved version
4. Accept changes or keep original

## Development Tips

### Watch for changes
```bash
npm run dev  # Auto-reloads on file changes
```

### View database
- Supabase dashboard → Table Editor
- See all your notes, profiles, etc.

### Check API logs
```bash
# Edge Function logs
supabase functions logs gemini-ai --tail

# Follow in real-time
```

### Clear cache
```bash
# If you see stale data
rm -rf node_modules/.vite
npm run dev
```

## Production Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
vercel
```

Follow prompts, add environment variables in Vercel dashboard.

### Backend
Already deployed on Supabase! ✅

## Getting Help

1. **Check docs** in `/docs` folder
2. **Review logs** (browser console + Supabase logs)
3. **Common issues** in README troubleshooting section

## Video Tutorial (Conceptual)

If this were a video tutorial, it would show:

1. **Minute 0-2**: Creating Supabase project + running migration
2. **Minute 2-4**: Getting API keys + configuring .env
3. **Minute 4-6**: Deploying Edge Function
4. **Minute 6-8**: Starting the app + signing up
5. **Minute 8-10**: Creating notes + trying AI features

---

**You're all set! Start building your intelligent note-taking workflow!** 🚀
