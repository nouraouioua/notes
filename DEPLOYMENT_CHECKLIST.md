# Deployment Checklist

Use this checklist to ensure everything is properly configured before deploying to production.

## Pre-Deployment Checklist

### 1. Environment Setup

- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file created with correct values
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Preview build works (`npm run preview`)

### 2. Supabase Configuration

#### Database
- [ ] Supabase project created
- [ ] Database migration run successfully
- [ ] Tables exist: `profiles`, `notes`, `note_embeddings`
- [ ] Row Level Security enabled on all tables
- [ ] RLS policies verified in Supabase dashboard
- [ ] Indexes created for performance

#### Authentication
- [ ] Email authentication enabled
- [ ] Email templates configured (optional)
- [ ] Test user can sign up
- [ ] Test user can log in
- [ ] Test user can log out

#### API Keys
- [ ] Supabase URL copied to `.env`
- [ ] Supabase anon key copied to `.env`
- [ ] API keys NOT committed to version control

#### Edge Functions
- [ ] Supabase CLI installed globally
- [ ] Logged into Supabase CLI (`supabase login`)
- [ ] Project linked (`supabase link`)
- [ ] Gemini API key set as secret
- [ ] Edge Function deployed successfully
- [ ] Edge Function listed in `supabase functions list`
- [ ] Edge Function logs accessible

### 3. Gemini API

- [ ] Gemini API key obtained from aistudio.google.com
- [ ] API key tested (curl or Postman)
- [ ] API key added to Supabase secrets
- [ ] Understanding of rate limits (15 RPM free tier)
- [ ] Quotas checked in Google AI Studio

### 4. Frontend Testing

#### Authentication Flow
- [ ] Can create new account
- [ ] Can log in with existing account
- [ ] Redirects to /app when logged in
- [ ] Redirects to /auth when logged out
- [ ] Session persists on page reload
- [ ] Can log out successfully

#### Notes Features
- [ ] Can create a new note
- [ ] Can edit note title
- [ ] Can edit note content
- [ ] Notes auto-save (wait 2 seconds after typing)
- [ ] Can delete a note (with confirmation)
- [ ] Can pin/unpin notes
- [ ] Pinned notes appear at top
- [ ] Real-time updates work (test in two tabs)

#### Search
- [ ] Search box filters notes as you type
- [ ] Search works on title
- [ ] Search works on content
- [ ] Clear search shows all notes

#### AI Features
- [ ] "Summarize Note" works
- [ ] Summary appears above content
- [ ] "Generate Tags" works
- [ ] Tags displayed as chips
- [ ] "Improve Writing" works
- [ ] Improved content shown in modal
- [ ] "Ask AI" works
- [ ] Q&A responses displayed
- [ ] Loading states shown during AI operations
- [ ] Error messages shown on failure

#### UI/UX
- [ ] Responsive on desktop
- [ ] Responsive on mobile
- [ ] Dark mode works
- [ ] Loading spinners show during operations
- [ ] Toast notifications appear
- [ ] No console errors in browser
- [ ] All icons load correctly

### 5. Code Quality

- [ ] No ESLint errors (`npm run lint`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No unused imports
- [ ] No console.log statements in production code
- [ ] Error boundaries implemented (optional)
- [ ] Input validation on all forms

### 6. Security Review

- [ ] No API keys in frontend code
- [ ] No API keys in `.env` file in git
- [ ] RLS policies prevent unauthorized access
- [ ] JWT tokens validated on backend
- [ ] User can only see their own data
- [ ] SQL injection prevented (using Supabase SDK)
- [ ] XSS prevented (React escapes by default)

### 7. Performance

- [ ] Images optimized (if any)
- [ ] Bundle size reasonable (`npm run build` - check dist/)
- [ ] Lazy loading implemented where needed
- [ ] React Query caching configured
- [ ] Database indexes created
- [ ] No unnecessary re-renders (React DevTools)

### 8. Documentation

- [ ] README.md complete
- [ ] Environment variables documented
- [ ] Setup instructions clear
- [ ] Architecture documented
- [ ] API endpoints documented (Edge Function)

## Production Deployment

### Frontend Deployment (Vercel)

#### Prerequisites
- [ ] Vercel account created
- [ ] Vercel CLI installed (`npm i -g vercel`)

#### Steps
1. [ ] Run `vercel` in project root
2. [ ] Follow prompts to create new project
3. [ ] Add environment variables in Vercel dashboard:
   - [ ] `VITE_SUPABASE_URL`
   - [ ] `VITE_SUPABASE_ANON_KEY`
4. [ ] Redeploy: `vercel --prod`
5. [ ] Visit production URL
6. [ ] Test all features in production

### Frontend Deployment (Netlify)

#### Prerequisites
- [ ] Netlify account created

#### Steps
1. [ ] Run `npm run build`
2. [ ] Drag `dist` folder to Netlify drop zone
3. [ ] Configure environment variables in Netlify settings
4. [ ] Configure custom domain (optional)
5. [ ] Enable HTTPS (should be automatic)
6. [ ] Test all features in production

### Backend (Supabase)

#### Already Deployed ✅
- [x] Database is live on Supabase
- [x] Edge Functions are deployed
- [x] Auth is configured

#### Final Checks
- [ ] Database accessible from production frontend
- [ ] Edge Functions callable from production frontend
- [ ] Authentication works in production
- [ ] No CORS errors in production

## Post-Deployment Verification

### Smoke Tests

- [ ] Visit production URL
- [ ] Sign up with new account
- [ ] Create a test note
- [ ] Edit the note
- [ ] Try AI summarize
- [ ] Try AI tags
- [ ] Search for the note
- [ ] Pin the note
- [ ] Delete the note
- [ ] Log out
- [ ] Log in again
- [ ] Verify data persisted

### Performance Tests

- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] No 404 errors on resources
- [ ] Images load properly
- [ ] Fonts load properly
- [ ] Mobile responsive works

### Security Tests

- [ ] Cannot access other users' notes
- [ ] Cannot access /app when logged out
- [ ] JWT tokens in requests
- [ ] HTTPS enabled
- [ ] No sensitive data in network requests
- [ ] API keys not visible in source

## Monitoring & Maintenance

### Set Up Monitoring

- [ ] Vercel/Netlify analytics enabled
- [ ] Supabase usage dashboard checked
- [ ] Google AI Studio quota dashboard monitored
- [ ] Error tracking configured (optional: Sentry)

### Regular Checks

- [ ] Check database size (Supabase dashboard)
- [ ] Check API usage (Google AI Studio)
- [ ] Check Edge Function logs for errors
- [ ] Check frontend error logs
- [ ] Review user feedback

### Backup & Recovery

- [ ] Database backup strategy in place (Supabase auto-backups)
- [ ] Export important data regularly
- [ ] Document recovery procedures

## Optimization (Post-Launch)

### Performance
- [ ] Add caching for AI responses
- [ ] Implement request queuing for AI
- [ ] Optimize database queries
- [ ] Add CDN for static assets
- [ ] Enable compression

### Features
- [ ] Implement pgvector for semantic search
- [ ] Add rich text editor
- [ ] Add export functionality
- [ ] Add note templates
- [ ] Add sharing features

### Security
- [ ] Implement rate limiting per user
- [ ] Add API request logging
- [ ] Review and update dependencies
- [ ] Security audit (optional)

## Rollback Plan

In case of issues:

1. [ ] Keep previous Vercel deployment accessible
2. [ ] Document how to rollback database migration
3. [ ] Keep old Edge Function version
4. [ ] Have staging environment for testing

## Support Resources

- [ ] README.md accessible to users
- [ ] Contact email configured (optional)
- [ ] Issue tracker set up (optional)
- [ ] FAQ page created (optional)

## Final Sign-Off

- [ ] All critical features tested
- [ ] All security checks passed
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Team trained (if applicable)
- [ ] Launch announcement ready

---

## Quick Production Setup Commands

```bash
# Build and verify
npm run build
npm run preview

# Deploy to Vercel
vercel --prod

# OR Deploy to Netlify
npm run build
# Then upload dist/ folder

# Verify Edge Function
supabase functions list
supabase functions logs gemini-ai
```

## Emergency Contacts

- **Supabase Support**: Dashboard → Support
- **Vercel Support**: Dashboard → Support
- **Gemini API**: Google Cloud Support

---

**Date Deployed**: ___________  
**Deployed By**: ___________  
**Production URL**: ___________  
**Version**: 1.0.0  

🚀 **Ready for Production!**
