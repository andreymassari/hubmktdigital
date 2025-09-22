export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} hubmktdigital — Tecnologia, IA, Marketing & Publicidade.</p>
        <p className="opacity-80">UI preview — Next.js + Tailwind.</p>
      </div>
    </footer>
  );
}
