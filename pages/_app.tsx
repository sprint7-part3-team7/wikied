import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '@/components/header';
import 'contenido/dist/styles.css';
import { AuthProvider } from '@/contexts/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
