import { LoadingCard } from './components/LoadingCard';

export default function App() {
  return (
    <div className="min-h-screen bg-black px-4 py-12 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            TNS — Refacto MicroApps
          </h1>
          <p className="mt-4 text-lg text-neutral-400">
            Loading card with gradient border & glass container
          </p>
        </header>

        {/* Glass Container Background */}
        <div className="relative mx-auto rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl md:p-12">
          {/* Inner Glow Effect for container */}
          <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-b from-white/5 to-transparent opacity-50" />
          
          <div className="flex flex-wrap items-start justify-center gap-10">
            {/* 1. With Glow + With Rotation */}
            <LoadingCard />
            
            {/* 2. No Glow + No Rotation (smooth zoom only) */}
            <LoadingCard glow={false} rotate={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
