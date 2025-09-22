# hubmktdigital — Next.js 14 (App Router) + Tailwind + Framer Motion + **APIs de Notícias** + **Monetização (AdSense)**

Projeto completo e pronto para deploy grátis na **Vercel**, com integração de **APIs de notícias** (fontes públicas sem chave) e **monetização via Google AdSense** (opcional, ativada por variável de ambiente). Mantém o visual moderno (glass + neon) do preview.

---

## 🌲 Estrutura do projeto
```
hubmktdigital/
├─ app/
│  ├─ api/
│  │  ├─ news/
│  │  │  ├─ tech/route.ts
│  │  │  ├─ marketing/route.ts
│  │  │  └─ ads/route.ts
│  │  └─ exchange/route.ts
│  ├─ contato/page.tsx
│  ├─ dashboard/page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ perfil/page.tsx
│  └─ globals.css
├─ components/
│  ├─ ads/
│  │  ├─ AdProvider.tsx
│  │  └─ AdSlot.tsx
│  ├─ Background.tsx
│  ├─ Footer.tsx
│  ├─ Header.tsx
│  ├─ Hero.tsx
│  ├─ NewsFeed.tsx
│  ├─ NewsList.tsx
│  └─ Surface.tsx
├─ lib/
│  └─ utils.ts
├─ public/
│  ├─ favicon.svg
│  └─ ads.txt
├─ next.config.js
├─ package.json
├─ postcss.config.js
├─ tailwind.config.ts
└─ tsconfig.json
```

---

## 🔑 Variáveis de ambiente (.env.local)
```bash
# Ativa AdSense (opcional). Ex.: ca-pub-1234567890123456
NEXT_PUBLIC_ADSENSE_CLIENT=
# Slots (opcional; você cria no AdSense/Ad Manager e coloca os IDs aqui)
NEXT_PUBLIC_ADSENSE_SLOT_TOP=
NEXT_PUBLIC_ADSENSE_SLOT_INLINE=

# User-Agent para fetch das fontes públicas (evita bloqueios)
NEWS_USER_AGENT=hubmktdigital/1.0
```
> Se não preencher as variáveis de AdSense, o site funciona e mostra **House Ads** (anúncios próprios) como fallback.

---

## 📦 `package.json`
```json
{
  "name": "hubmktdigital",
  "version": "1.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "swr": "^2.2.5"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.4.5"
  }
}
```

---

## ⚙️ `next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dev.to' },
      { protocol: 'https', hostname: 'external-preview.redd.it' },
      { protocol: 'https', hostname: 'preview.redd.it' }
    ]
  }
};
module.exports = nextConfig;
```

---

## 🎨 Tailwind & CSS
### `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
export default config
```

### `postcss.config.js`
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
body { @apply bg-slate-950 text-slate-100; }
```

---

## 🧰 Utilitários
### `lib/utils.ts`
```ts
export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');
```

---

## 🧱 Componentes base
### `components/Surface.tsx`
```tsx
import { cn } from '@/lib/utils';

export default function Surface({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_8px_30px_rgba(0,0,0,0.35)]',
        'p-5',
        className
      )}
    >
      {children}
    </div>
  );
}
```

### `components/Background.tsx`
```tsx
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute -top-40 -left-40 w-[540px] h-[540px] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-cyan-500 to-sky-700" />
      <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-fuchsia-500 to-violet-700" />
    </div>
  );
}
```

### `components/Header.tsx`
```tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/', label: 'Início' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/perfil', label: 'Perfil' },
  { href: '/contato', label: 'Contato' }
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.push('/')} className="flex items-center gap-2 group">
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
              key={n.href}
              onClick={() => router.push(n.href)}
              className={cn(
                'px-3.5 py-2 rounded-full text-sm border border-white/10',
                pathname === n.href
                  ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30 text-white'
                  : 'hover:bg-white/5 text-slate-300'
              )}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

### `components/Footer.tsx`
```tsx
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} hubmktdigital — Tecnologia, IA, Marketing & Publicidade.</p>
        <p className="opacity-80">Deploy grátis via Vercel.</p>
      </div>
    </footer>
  );
}
```

### `components/Hero.tsx`
```tsx
'use client';
import Surface from '@/components/Surface';
import AdSlot from '@/components/ads/AdSlot';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(56,189,248,0.25),transparent),radial-gradient(800px_500px_at_110%_10%,rgba(167,139,250,0.25),transparent)]" />
        <div className="absolute right-[-60px] top-[-60px] size-[220px] rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 blur-2xl opacity-40" />
      </div>
      <div className="relative p-10 md:p-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-slate-300">
          <span className="size-2 rounded-full bg-cyan-400 animate-pulse" /> Em tempo real: tech, IA e mídia programática
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">Conteúdo e insights</span>
          <br />
          para quem decide em marketing digital
        </h1>
        <p className="mt-5 text-slate-300 max-w-2xl">
          Curadoria de fontes confiáveis, dashboards com dados e anúncios integrados para monetização transparente.
        </p>
        {/* Slot de anúncio no topo do herói */}
        <div className="mt-8">
          <AdSlot slotKey="top" format="horizontal" />
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            { k: 'Fontes', v: '+30' },
            { k: 'Atualização', v: '10 min' },
            { k: 'Temas', v: 'Tech/IA/Ads' },
            { k: 'Monetização', v: 'AdSense' },
          ].map((s) => (
            <Surface key={s.k} className="py-3 text-center">
              <div className="text-slate-400">{s.k}</div>
              <div className="text-lg font-semibold">{s.v}</div>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `components/NewsList.tsx`
```tsx
'use client';
import Surface from '@/components/Surface';
import AdSlot from '@/components/ads/AdSlot';

type Item = { title: string; url: string; source: string; publishedAt: string; image?: string | null };

export default function NewsList({ title, items, showInlineAd }: { title: string; items: Item[]; showInlineAd?: boolean }) {
  const list = items || [];
  const mid = Math.ceil(list.length / 2);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-200 to-violet-200 bg-clip-text text-transparent">{title}</h3>
        <span className="text-xs text-slate-300">Atualiza a cada 10 min</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.slice(0, mid).map((n, i) => (
          <a key={i} href={n.url} className="group" target="_blank" rel="noreferrer">
            <Surface className="p-0 overflow-hidden transition hover:-translate-y-0.5">
              {n.image ? (
                <img src={n.image} alt="" className="h-36 w-full object-cover" />
              ) : (
                <div className="h-36 w-full bg-white/5 flex items-center justify-center text-slate-600">IMG</div>
              )}
              <div className="p-4">
                <p className="group-hover:underline leading-snug">{n.title}</p>
                <p className="text-xs text-slate-400 mt-1">{n.source} • {new Date(n.publishedAt).toLocaleString()}</p>
              </div>
            </Surface>
          </a>
        ))}

        {/* Anúncio inline no meio da grade */}
        {showInlineAd && (
          <Surface className="flex items-center justify-center min-h-36">
            <AdSlot slotKey="inline" format="rectangle" />
          </Surface>
        )}

        {list.slice(mid).map((n, i) => (
          <a key={`b-${i}`} href={n.url} className="group" target="_blank" rel="noreferrer">
            <Surface className="p-0 overflow-hidden transition hover:-translate-y-0.5">
              {n.image ? (
                <img src={n.image} alt="" className="h-36 w-full object-cover" />
              ) : (
                <div className="h-36 w-full bg-white/5 flex items-center justify-center text-slate-600">IMG</div>
              )}
              <div className="p-4">
                <p className="group-hover:underline leading-snug">{n.title}</p>
                <p className="text-xs text-slate-400 mt-1">{n.source} • {new Date(n.publishedAt).toLocaleString()}</p>
              </div>
            </Surface>
          </a>
        ))}
      </div>
    </section>
  );
}
```

### `components/NewsFeed.tsx`
```tsx
'use client';
import useSWR from 'swr';
import NewsList from './NewsList';

const fetcher = (url: string) => fetch(url, { headers: { 'User-Agent': process.env.NEWS_USER_AGENT ?? 'hubmktdigital' } }).then(r => r.json());

type Item = { title: string; url: string; source: string; publishedAt: string; image?: string | null };

export default function NewsFeed() {
  const { data: tech } = useSWR<{ items: Item[] }>(`/api/news/tech`, fetcher, { refreshInterval: 1000 * 60 * 10 });
  const { data: mkt }  = useSWR<{ items: Item[] }>(`/api/news/marketing`, fetcher, { refreshInterval: 1000 * 60 * 10 });
  const { data: ads }  = useSWR<{ items: Item[] }>(`/api/news/ads`, fetcher, { refreshInterval: 1000 * 60 * 10 });

  return (
    <div className="grid gap-8">
      <NewsList title="Tecnologia & IA" items={tech?.items ?? []} showInlineAd />
      <NewsList title="Marketing & Growth" items={mkt?.items ?? []} showInlineAd />
      <NewsList title="Publicidade & Mídia Programática" items={ads?.items ?? []} showInlineAd />
    </div>
  );
}
```

---

## 💸 Monetização (AdSense)
### `components/ads/AdProvider.tsx`
```tsx
'use client';
import { useEffect } from 'react';

export default function AdProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    if (!client) return; // sem AdSense → não injeta script

    // Evita injetar duas vezes
    if (document.querySelector('script[data-adsbygoogle]')) return;

    const s = document.createElement('script');
    s.setAttribute('data-adsbygoogle', 'true');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + client;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }, []);

  return <>{children}</>;
}
```

### `components/ads/AdSlot.tsx`
```tsx
'use client';
import { useEffect, useRef } from 'react';
import Surface from '@/components/Surface';

export default function AdSlot({ slotKey, format = 'horizontal' }: { slotKey: 'top' | 'inline'; format?: 'horizontal' | 'rectangle' }) {
  const ref = useRef<HTMLDivElement>(null);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slotId = slotKey === 'top' ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP : process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE;

  useEffect(() => {
    if (!client || !slotId) return; // sem config → mostra fallback
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [client, slotId]);

  if (!client || !slotId) {
    // Fallback: House Ad
    return (
      <Surface className="w-full text-center">
        <div className="text-xs text-slate-400 mb-1">Anúncio</div>
        <a href="#" className="block p-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-900 font-semibold">
          Promova sua marca no hubmktdigital — Fale com a gente
        </a>
      </Surface>
    );
  }

  const style =
    format === 'rectangle'
      ? { display: 'inline-block', width: '300px', height: '250px' }
      : { display: 'block' };

  return (
    <div ref={ref} className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={style as any}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

> **Importante**: Para monetizar, você precisa de aprovação do AdSense e usar seu `ca-pub-XXXX`. O arquivo `public/ads.txt` ajuda na verificação.

### `public/ads.txt`
```
google.com, pub-REPLACE_WITH_YOUR_PUBLISHER_ID, DIRECT, f08c47fec0942fa0
```

---

## 🛰️ APIs de Notícias (server)
> Fontes públicas sem chave: **Hacker News Algolia**, **DEV.to** e **Reddit JSON**. Normalizamos os dados.

### `app/api/news/tech/route.ts`
```ts
import { NextResponse } from 'next/server';

type Item = { title: string; url: string; source: string; publishedAt: string; image?: string | null };

export async function GET() {
  try {
    const ua = process.env.NEWS_USER_AGENT || 'hubmktdigital';
    const [hnRes, devRes] = await Promise.all([
      fetch('https://hn.algolia.com/api/v1/search?tags=story&query=AI%20technology&hitsPerPage=20', { headers: { 'User-Agent': ua } }),
      fetch('https://dev.to/api/articles?per_page=20&tag=ai,programming,webdev', { headers: { 'User-Agent': ua } })
    ]);

    const hn = await hnRes.json();
    const dev = await devRes.json();

    const hnItems: Item[] = (hn.hits ?? []).map((h: any) => ({
      title: h.title,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      source: 'Hacker News',
      publishedAt: h.created_at,
      image: null
    }));

    const devItems: Item[] = (dev ?? []).map((d: any) => ({
      title: d.title,
      url: d.url,
      source: 'DEV Community',
      publishedAt: d.published_at,
      image: d.cover_image
    }));

    const items = [...hnItems, ...devItems].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, items: [] }, { status: 500 });
  }
}
```

### `app/api/news/marketing/route.ts`
```ts
import { NextResponse } from 'next/server';

type Item = { title: string; url: string; source: string; publishedAt: string; image?: string | null };

export async function GET() {
  try {
    const ua = process.env.NEWS_USER_AGENT || 'hubmktdigital';

    const devGrowth = await fetch('https://dev.to/api/articles?per_page=20&tag=marketing,growth,seo', { headers: { 'User-Agent': ua } });
    const dev = await devGrowth.json();

    const redditRes = await fetch('https://www.reddit.com/r/marketing/top.json?limit=20&t=week', { headers: { 'User-Agent': ua } });
    const reddit = await redditRes.json();

    const devItems: Item[] = (dev ?? []).map((d: any) => ({
      title: d.title,
      url: d.url,
      source: 'DEV Community',
      publishedAt: d.published_at,
      image: d.cover_image
    }));

    const redditItems: Item[] = (reddit?.data?.children ?? [])
      .map((c: any) => c.data)
      .filter((p: any) => !!p.url && !p.is_self)
      .map((p: any) => ({
        title: p.title,
        url: p.url,
        source: 'Reddit /r/marketing',
        publishedAt: new Date(p.created_utc * 1000).toISOString(),
        image: p.thumbnail && p.thumbnail.startsWith('http') ? p.thumbnail : null
      }));

    const items = [...devItems, ...redditItems].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, items: [] }, { status: 500 });
  }
}
```

### `app/api/news/ads/route.ts`
```ts
import { NextResponse } from 'next/server';

type Item = { title: string; url: string; source: string; publishedAt: string; image?: string | null };

export async function GET() {
  try {
    const ua = process.env.NEWS_USER_AGENT || 'hubmktdigital';

    const [devRes, redditRes] = await Promise.all([
      fetch('https://dev.to/api/articles?per_page=20&tag=ads,programmatic', { headers: { 'User-Agent': ua } }),
      fetch('https://www.reddit.com/r/adops/top.json?limit=20&t=week', { headers: { 'User-Agent': ua } })
    ]);

    const dev = await devRes.json();
    const reddit = await redditRes.json();

    const devItems: Item[] = (dev ?? []).map((d: any) => ({
      title: d.title,
      url: d.url,
      source: 'DEV Community',
      publishedAt: d.published_at,
      image: d.cover_image
    }));

    const redditItems: Item[] = (reddit?.data?.children ?? [])
      .map((c: any) => c.data)
      .filter((p: any) => !!p.url)
      .map((p: any) => ({
        title: p.title,
        url: `https://www.reddit.com${p.permalink}`,
        source: 'Reddit /r/adops',
        publishedAt: new Date(p.created_utc * 1000).toISOString(),
        image: p.thumbnail && p.thumbnail.startsWith('http') ? p.thumbnail : null
      }));

    const items = [...devItems, ...redditItems].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, items: [] }, { status: 500 });
  }
}
```

### `app/api/exchange/route.ts`
```ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', { next: { revalidate: 60 * 30 } });
    if (!res.ok) throw new Error('Falha ao buscar câmbio.');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
```

---

## 🧩 Páginas (App Router)
### `app/layout.tsx`
```tsx
import './globals.css';
import type { Metadata } from 'next';
import Background from '@/components/Background';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdProvider from '@/components/ads/AdProvider';

export const metadata: Metadata = {
  title: 'hubmktdigital — Tecnologia, IA, Marketing & Publicidade',
  description: 'Conteúdos e tendências com UI moderna e monetização integrada.',
  icons: [{ rel: 'icon', url: '/favicon.svg' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Background />
        <AdProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-10">{children}</main>
          <Footer />
        </AdProvider>
      </body>
    </html>
  );
}
```

### `app/page.tsx` (Home)
```tsx
import Hero from '@/components/Hero';
import NewsFeed from '@/components/NewsFeed';
import Surface from '@/components/Surface';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <Surface className="bg-gradient-to-r from-white/5 to-transparent">
        <h2 className="text-2xl font-semibold mb-2">Sobre</h2>
        <p className="text-slate-300">Hub de Tecnologia, IA, Marketing e Mídia Programática, com APIs de notícias e monetização via AdSense.</p>
      </Surface>
      <NewsFeed />
    </div>
  );
}
```

### `app/dashboard/page.tsx`
```tsx
'use client';
import useSWR from 'swr';
import Surface from '@/components/Surface';
import NewsFeed from '@/components/NewsFeed';

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function DashboardPage() {
  const { data } = useSWR<{ base: string; rates: Record<string, number> }>(`/api/exchange`, fetcher, { refreshInterval: 1000 * 60 * 30 });

  return (
    <div className="grid gap-8">
      <Surface>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-slate-300">Cotações de referência (USD):</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {['BRL','EUR','GBP','JPY'].map((c) => (
            <Surface key={c} className="py-3 text-center">
              <div className="text-xs text-slate-400">1 USD → {c}</div>
              <div className="text-xl font-semibold">{data?.rates?.[c]?.toFixed(2) ?? '...'}</div>
            </Surface>
          ))}
        </div>
      </Surface>

      <NewsFeed />
    </div>
  );
}
```

### `app/perfil/page.tsx`
```tsx
import Surface from '@/components/Surface';

export default function PerfilPage() {
  return (
    <div className="max-w-xl">
      <Surface>
        <h1 className="text-xl font-semibold mb-4">Seu Perfil</h1>
        <p className="text-slate-300">(Em breve) Área de usuário com login, avatar e preferências de conteúdo.</p>
      </Surface>
    </div>
  );
}
```

### `app/contato/page.tsx`
```tsx
import Surface from '@/components/Surface';

export default function ContatoPage() {
  return (
    <div className="max-w-xl">
      <Surface>
        <h1 className="text-xl font-semibold mb-4">Contato</h1>
        <p className="text-slate-300">Envie sua proposta de mídia ou dúvidas para monetização.</p>
      </Surface>
    </div>
  );
}
```

---

## 🖼️ `public/favicon.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" fill="#22d3ee">
  <path d="M12 2l9 4.5v10L12 21 3 16.5v-10L12 2z"/>
</svg>
```

---

## ▶️ Como rodar e publicar (grátis)
```bash
npm install
npm run dev        # http://localhost:3000
```
Deploy:
1) Suba para GitHub.
2) Na Vercel → **Add New Project** → importe o repo.
3) (Opcional) adicione no projeto as envs:
   - `NEXT_PUBLIC_ADSENSE_CLIENT` → ex.: `ca-pub-123...`
   - `NEXT_PUBLIC_ADSENSE_SLOT_TOP`, `NEXT_PUBLIC_ADSENSE_SLOT_INLINE`
4) Deploy.

**Ads.txt:** mantenha o `public/ads.txt` com seu `pub-XXXX` para maximizar a aprovação.

---

## ✅ O que foi entregue agora
- UI moderna com **NewsFeed dinâmico** (3 categorias) usando **SWR** e rotas API.
- **Monetização AdSense** com `AdProvider` (injeta script) e `AdSlot` (top/inline + fallback house ad).
- Arquivo **ads.txt** e variáveis necessárias para ativar anúncios.

Se quiser, eu integro **Supabase (auth, perfil com avatar, contato no banco)** mantendo o mesmo visual e posicionamentos de anúncios.
