import { AuthProvider } from './contexts/auth';
import AppRoutes from './routes';
import { MenuLateral } from './shared/components';
import { AppThemeProvider } from './shared/context';

export default function App() {
  return (
    <AuthProvider>
        <AppThemeProvider>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </AppThemeProvider>
    </AuthProvider>
  );
}