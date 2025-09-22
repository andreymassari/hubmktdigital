'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/components/sections/Home';
import Dashboard from '@/components/sections/Dashboard';
import Perfil from '@/components/sections/Perfil';
import Contato from '@/components/sections/Contato';

export default function Page() {
  const [tab, setTab] = useState<'home'|'dashboard'|'perfil'|'contato'>('home');

  return (
    <div className="min-h-screen">
      <Header tab={tab} setTab={setTab} />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-10"
          >
            {tab === 'home' && <Home onCta={() => setTab('dashboard')} />}
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'perfil' && <Perfil />}
            {tab === 'contato' && <Contato />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
