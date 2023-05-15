import { HashRouter } from 'react-router-dom';

import './shared/forms/TraducoesYup';

import { AppProvider, AppThemeProvider, AuthProvider, DrawerProvider } from './shared/context';
import { MenuLateral, Login } from './shared/components';

import AppRoutes from './routes';

export default function App() {
  
  return (
    <AuthProvider>
      <AppThemeProvider>
        <AppProvider>
        <Login>

          <DrawerProvider>
            <HashRouter>
              
              {/* BrowserRouter não está funcionando no 
              modo produção com o basename dá certo, mas quando der um F5 ele perde
              o caminho
              <BrowserRouter basename={Environment.URL_BASE}> */}

                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
                
              {/* </BrowserRouter> */}
            </HashRouter>
          </DrawerProvider>

        </Login>
        </AppProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
}