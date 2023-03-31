import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/context';
import { MenuLateral } from './shared/components';
import './shared/forms/TraducoesYup';
import AppRoutes from './routes';

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