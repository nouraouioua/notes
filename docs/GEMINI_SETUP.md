# Gemini API Setup Guide

This guide explains how to get and configure your Google Gemini API key for the AI Notes application.

## Step 1: Get a Gemini API Key

### Option 1: Google AI Studio (Free)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API key"** or **"Create API key"**
4. Select an existing Google Cloud project or create a new one
5. Click **"Create API key in existing project"** or **"Create API key in new project"**
6. Copy the API key (it will look like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
7. **Important**: Save this key securely - you won't be able to see it again!

### Option 2: Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Generative Language API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Generative Language API"
   - Click **Enable**
4. Create credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **API Key**
   - Copy the generated API key

## Step 2: Test Your API Key

You can test your API key using curl:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Write a short test message"
      }]
    }]
  }'
```

If successful, you'll get a JSON response with generated text.

## Step 3: Configure the API Key in Supabase

**IMPORTANT**: Never put the API key in your frontend code or `.env` file!

The Gemini API key should only be stored in Supabase Edge Function secrets.

### Set as Supabase Secret

```bash
# Make sure you're in the project directory
cd ai-notes-app

# Set the secret
supabase secrets set GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### Verify the Secret

```bash
supabase secrets list
```

You should see `GEMINI_API_KEY` in the list (the value will be hidden).

## Step 4: Understanding API Usage & Limits

### Free Tier Limits (Google AI Studio)

- **Rate Limit**: 15 requests per minute (RPM)
- **Daily Limit**: 1,500 requests per day
- **Token Limit**: Varies by model
- **Cost**: Free

### Gemini 1.5 Flash Model

The app uses `gemini-1.5-flash` which is:
- Fast and efficient
- Good for short text generation
- Lower latency than Pro models
- Suitable for note summarization, tagging, etc.

### Monitoring Usage

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Check your API usage dashboard
3. Monitor request counts and quotas

## Step 5: Model Configuration

The Edge Function is configured to use:

```typescript
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
```

### Generation Parameters

```javascript
{
  temperature: 0.7,      // Creativity level (0-1)
  topK: 40,              // Top K sampling
  topP: 0.95,            // Nucleus sampling
  maxOutputTokens: 1024  // Max response length
}
```

You can adjust these in `supabase/functions/gemini-ai/index.ts`:

- **temperature**: Higher = more creative, lower = more focused
- **maxOutputTokens**: Increase for longer responses

## Security Best Practices

### ✅ DO:
- Store API key in Supabase secrets only
- Use Edge Functions to call the API
- Validate user authentication before AI calls
- Monitor API usage regularly
- Rotate API keys periodically

### ❌ DON'T:
- Put API key in `.env` or frontend code
- Commit API keys to version control
- Share API keys publicly
- Exceed rate limits (implement retry logic)

## Troubleshooting

### "API key not valid" error

**Causes**:
- Incorrect API key
- API not enabled in Google Cloud project
- Key restrictions blocking requests

**Solutions**:
1. Verify the API key in Google AI Studio
2. Check that Generative Language API is enabled
3. Try creating a new API key
4. Verify the key is set correctly in Supabase secrets

### "Resource exhausted" error

**Cause**: Rate limit exceeded (15 RPM free tier)

**Solutions**:
1. Implement request queuing in the frontend
2. Upgrade to paid tier for higher limits
3. Add retry logic with exponential backoff
4. Cache AI responses when possible

### "Invalid argument" error

**Cause**: Invalid request format or parameters

**Solutions**:
1. Check the request payload structure
2. Verify content isn't too long
3. Review Edge Function logs: `supabase functions logs gemini-ai`

### Function not receiving API key

```bash
# Re-set the secret
supabase secrets set GEMINI_API_KEY=YOUR_API_KEY

# Redeploy the function
supabase functions deploy gemini-ai

# Check function logs
supabase functions logs gemini-ai --tail
```

## Advanced Configuration

### Using Different Models

To use a different Gemini model, edit `supabase/functions/gemini-ai/index.ts`:

```typescript
// Change from gemini-1.5-flash to gemini-1.5-pro
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent'
```

Available models:
- `gemini-1.5-flash` - Fast, efficient (recommended)
- `gemini-1.5-pro` - More capable, slower
- `gemini-1.0-pro` - Legacy, stable

### Implementing Retry Logic

Add to Edge Function:

```typescript
async function callGeminiWithRetry(prompt: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      return await callGemini(prompt);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries exceeded');
}
```

## Cost Optimization Tips

1. **Cache summaries**: Don't regenerate if note hasn't changed
2. **Batch requests**: Combine multiple operations when possible
3. **Limit content length**: Trim very long notes before sending
4. **User quotas**: Limit AI requests per user per day
5. **Monitor usage**: Set up alerts for high usage

## Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google AI Studio](https://aistudio.google.com/)
- [Pricing Information](https://ai.google.dev/pricing)
- [API Reference](https://ai.google.dev/api/rest/v1beta/models/generateContent)

## Next Steps

After setting up your Gemini API key:

1. Test AI features in the app
2. Monitor API usage
3. Adjust generation parameters as needed
4. Consider implementing caching for better performance
