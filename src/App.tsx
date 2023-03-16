import { AuthProvider } from './contexts/auth';
import AppRoutes from './routes';
import { AppThemeProvider } from './shared/context';

export default function App() {
  return (
    <AuthProvider>
        <AppThemeProvider>
          <AppRoutes />
        </AppThemeProvider>
    </AuthProvider>
  );
}