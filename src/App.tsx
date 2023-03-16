import { AuthProvider } from './contexts/auth';
import AppRoutes from './routes';
import { ThemeProvider } from '@mui/material';
import { LightTheme } from './shared/themes';

export default function App() {
  return (
    <AuthProvider>
        <ThemeProvider theme={LightTheme}>
          <AppRoutes />
        </ThemeProvider>
    </AuthProvider>
  );
}