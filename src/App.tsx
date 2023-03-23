import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { MenuLateral } from './shared/components';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/context';

export default function App() {
  
  return (
    <AuthProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>

            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
            
          </BrowserRouter>
        </DrawerProvider>        
      </AppThemeProvider>
    </AuthProvider>
  );
}