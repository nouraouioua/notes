# Supabase Setup Guide

This guide will walk you through setting up Supabase for the AI Notes application.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the details:
   - **Name**: ai-notes-app (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is sufficient for development
5. Click "Create new project"
6. Wait 2-3 minutes for the project to be provisioned

## Step 2: Get Your API Credentials

1. In your project dashboard, click on **Settings** (gear icon)
2. Go to **API** section
3. You'll need two values:
   - **Project URL**: e.g., `https://xxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`
4. Save these for your `.env` file

## Step 3: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled (it should be by default)
3. You can customize email templates under **Authentication** → **Email Templates**

## Step 4: Run Database Migrations

### Option A: Using SQL Editor (Recommended for First Time)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open the file `supabase/migrations/001_initial_schema.sql` from the project
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned" message

### Option B: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

## Step 5: Verify Database Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see three tables:
   - `profiles`
   - `notes`
   - `note_embeddings`
3. Click on each table to verify columns are created correctly

## Step 6: Enable pgvector (Optional but Recommended)

For semantic search capabilities:

1. Go to **Database** → **Extensions**
2. Search for "vector"
3. Enable the **vector** extension
4. This enables the `note_embeddings` table to store vector embeddings

## Step 7: Set Up Edge Functions

### Install Supabase CLI

```bash
npm install -g supabase
```

### Login

```bash
supabase login
```

This will open a browser window for authentication.

### Link Your Project

```bash
cd ai-notes-app
supabase link --project-ref YOUR_PROJECT_REF
```

To find your project ref:
- Go to your Supabase dashboard
- Settings → General
- Look for "Reference ID"

### Set Environment Variables for Edge Function

```bash
supabase secrets set GEMINI_API_KEY=your-gemini-api-key-here
```

### Deploy the Edge Function

```bash
supabase functions deploy gemini-ai
```

### Verify Deployment

```bash
supabase functions list
```

You should see `gemini-ai` in the list.

## Step 8: Configure Row Level Security (RLS)

The migration script already sets up RLS policies, but verify:

1. Go to **Authentication** → **Policies**
2. Check that each table (`profiles`, `notes`, `note_embeddings`) has policies
3. Policies should ensure users can only access their own data

## Step 9: Test Your Setup

### Test Database Connection

In the Supabase SQL Editor, run:

```sql
SELECT * FROM profiles LIMIT 10;
```

Should return empty results (no error).

### Test Edge Function

You can test locally before deploying:

```bash
supabase functions serve gemini-ai
```

Then test with curl:

```bash
curl -X POST http://localhost:54321/functions/v1/gemini-ai \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"summarize","content":"This is a test note"}'
```

## Troubleshooting

### "relation does not exist" error
- The migration didn't run successfully
- Re-run the SQL migration script

### "JWT expired" or auth errors
- Check that your anon key is correct
- Ensure you're logged in on the frontend

### Edge Function errors
- Check logs: `supabase functions logs gemini-ai`
- Verify GEMINI_API_KEY is set: `supabase secrets list`
- Check function deployment: `supabase functions list`

### RLS policy errors
- Verify RLS is enabled on tables
- Check that policies match the migration script
- Test policies in SQL Editor

## Next Steps

After completing this setup:

1. Copy your Supabase URL and anon key to `.env`
2. Deploy the Edge Function
3. Run the frontend: `npm run dev`
4. Create a test account and start using the app!

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
