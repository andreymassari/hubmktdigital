export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute -top-40 -left-40 w-[540px] h-[540px] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-cyan-500 to-sky-700" />
      <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-fuchsia-500 to-violet-700" />
    </div>
  );
}
