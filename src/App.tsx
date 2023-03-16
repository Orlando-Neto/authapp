import { AuthProvider } from './contexts/auth';
import Routes from './routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}