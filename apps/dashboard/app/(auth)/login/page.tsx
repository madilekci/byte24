import { Metadata } from 'next';
import { LoginForm } from './components/login-form';

export const metadata: Metadata = {
  title: 'Inloggen',
};

export default function LoginPage() {
  return <LoginForm />;
}
