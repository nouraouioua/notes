import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SetupWarning } from './components/SetupWarning';
import LandingPage from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { AppPage } from './pages/AppPage';
import { config } from './config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Check if Supabase is configured
const isConfigured = 
  config.supabase.url && 
  config.supabase.anonKey && 
  config.supabase.url !== 'your-supabase-url' &&
  config.supabase.anonKey !== 'your-supabase-anon-key' &&
  config.supabase.url.includes('supabase.co');

function App() {
  // Show setup warning if not configured
  if (!isConfigured) {
    return <SetupWarning />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
