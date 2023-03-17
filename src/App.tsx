import { AuthProvider } from './contexts/auth';
import AppRoutes from './routes';
import { MenuLateral } from './shared/components';
import { AppThemeProvider, DrawerProvider } from './shared/context';

export default function App() {
  return (
    <AuthProvider>
        <AppThemeProvider>        
          <DrawerProvider>
            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
          </DrawerProvider>        
        </AppThemeProvider>
    </AuthProvider>
  );
}