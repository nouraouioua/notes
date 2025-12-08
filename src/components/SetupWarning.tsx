import { AlertCircle, ExternalLink } from 'lucide-react';
import { config } from '../config';

export function SetupWarning() {
  const isConfigured = 
    config.supabase.url && 
    config.supabase.anonKey && 
    config.supabase.url !== 'your-supabase-url' &&
    config.supabase.anonKey !== 'your-supabase-anon-key' &&
    config.supabase.url.includes('supabase.co');

  if (isConfigured) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-8 h-8 text-yellow-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Setup Required
          </h1>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Welcome to AI Notes! Before you can use the app, you need to configure your Supabase credentials.
        </p>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Setup (5 minutes):</h2>
          <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>1. Create a Supabase account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">supabase.com</a></li>
            <li>2. Create a new project (takes ~2 minutes)</li>
            <li>3. Go to Settings → API to get your credentials</li>
            <li>4. Copy <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">.env.example</code> to <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">.env</code></li>
            <li>5. Add your <strong>Project URL</strong> and <strong>anon key</strong> to <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">.env</code></li>
            <li>6. Restart the dev server</li>
          </ol>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Your .env file should look like:</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...`}
          </pre>
        </div>

        <div className="flex gap-4">
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Started with Supabase
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/your-repo/ai-notes-app#setup"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            View Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Note:</strong> This message will disappear once you've configured your Supabase credentials.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            For detailed setup instructions, see <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">README.md</code> or <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">docs/QUICKSTART.md</code>
          </p>
        </div>
      </div>
    </div>
  );
}
