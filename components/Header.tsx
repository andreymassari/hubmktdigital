'use client';
import React from 'react';

const nav = [
  { key: 'home', label: 'Início' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'perfil', label: 'Perfil' },
  { key: 'contato', label: 'Contato' },
];

export default function Header({ tab, setTab }: { tab: string; setTab: (k: string) => void }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <button onClick={() => setTab('home')} className="flex items-center gap-2 group">
          <span className="relative inline-flex">
            <span className="absolute inset-0 blur-md bg-gradient-to-tr from-cyan-400 to-violet-500 opacity-70 rounded-xl" />
            <svg className="relative w-9 h-9 text-cyan-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l9 4.5v10L12 21 3 16.5v-10L12 2z" />
            </svg>
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">hubmktdigital</span>
        </button>
        <nav className="ml-auto hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => setTab(n.key)}
              className={
                'px-3.5 py-2 rounded-full text-sm transition border border-white/10 ' +
                (tab === n.key ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white shadow-inner' : 'hover:bg-white/5 text-slate-300')
              }
            >
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
