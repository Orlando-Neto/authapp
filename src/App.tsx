import { AuthProvider } from './contexts/auth';
import AppRoutes from './routes';

export default function App() {
  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  );
}