import './globals.css';
import type { Metadata } from 'next';
import Background from '@/components/Background';

export const metadata: Metadata = {
  title: 'hubmktdigital — Tecnologia, IA, Marketing & Publicidade',
  description: 'Conteúdos e tendências com UI moderna.',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Background />
        {children}
      </body>
    </html>
  );
}
