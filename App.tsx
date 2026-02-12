import { LoadingCard } from './components/LoadingCard';
import { DartLoadingCard } from './components/DartLoadingCard';
import { MESSAGES } from './lib/tokens';

function BreakpointPreview({
  label,
  width,
  message,
}: {
  label: string;
  width: number;
  message?: string;
}) {
  const padding = width >= 768 ? 48 : 32;
  const pagePadding = 16;

  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      {/* Label */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-mono text-neutral-400">
          {width}px
        </span>
      </div>

      {/* Container simulating the glass card at that breakpoint */}
      <div
        className="relative w-full rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl"
        style={{ padding }}
      >
        <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-b from-white/5 to-transparent opacity-50" />

        {/* Card constrained to what it would be at this viewport */}
        <div className="flex justify-center">
          <LoadingCard
            message={message}
            style={{ maxWidth: Math.min(384, width - pagePadding * 2 - padding * 2) }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Dart/Flutter version preview — 3-column grid matching validation_screen.dart
 * GridView.builder with crossAxisCount: 3, crossAxisSpacing: 10, mainAxisSpacing: 12,
 * childAspectRatio: 3/4, container padding horizontal: 16
 */
function DartBreakpointPreview({
  label,
  width,
  message,
}: {
  label: string;
  width: number;
  message?: string;
}) {
  // Matches Flutter: EdgeInsets.symmetric(horizontal: 16)
  const containerPadding = 16;
  // Matches Flutter: crossAxisSpacing: 10
  const crossAxisSpacing = 10;
  // Matches Flutter: mainAxisSpacing: 12
  const mainAxisSpacing = 12;
  // Matches Flutter: crossAxisCount: 3
  const crossAxisCount = 3;

  // Available width for the grid = viewport - 2 * containerPadding
  const availableWidth = width - containerPadding * 2;
  // Card width = (available - gaps) / columns
  const cardWidth = (availableWidth - crossAxisSpacing * (crossAxisCount - 1)) / crossAxisCount;

  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      {/* Label */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-mono text-neutral-400">
          {width}px
        </span>
        <span className="rounded-full bg-[#3130FD]/20 px-2.5 py-0.5 text-xs font-mono text-[#3130FD]">
          {Math.round(cardWidth)}x{Math.round(cardWidth * 4 / 3)}
        </span>
      </div>

      {/* Container simulating Flutter screen at that breakpoint */}
      <div
        className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl"
        style={{ width: width > 500 ? '100%' : width, padding: containerPadding }}
      >
        <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-b from-white/5 to-transparent opacity-50" />

        {/* 3-column grid matching Flutter GridView.builder */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${crossAxisCount}, 1fr)`,
            gap: `${mainAxisSpacing}px ${crossAxisSpacing}px`,
            maxWidth: width > 500 ? width : undefined,
            margin: '0 auto',
          }}
        >
          {/* 6 cards — unified HIG message */}
          {Array.from({ length: 6 }).map((_, i) => (
            <DartLoadingCard key={i} message={message} style={{ width: '100%' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section header badges ─────────────────────────────────────────────── */

const ReactBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-sm text-sky-400 ring-1 ring-sky-500/20">
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.058-.83.178C4.9 2.13 4.295 3.91 4.793 6.416c-1.96.576-3.583 1.47-3.583 2.957 0 1.49 1.607 2.371 3.542 2.942-.478 2.48.09 4.248 1.44 5.01.237.136.52.2.83.2 1.347 0 3.11-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .592-.057.83-.178 1.353-.752 1.957-2.532 1.46-5.036 1.96-.576 3.583-1.47 3.583-2.957 0-1.49-1.607-2.371-3.542-2.942.478-2.48-.09-4.248-1.44-5.01a1.648 1.648 0 0 0-.83-.2z"/></svg>
    React / Web
  </span>
);

const FlutterBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3130FD]/10 px-3 py-1 text-sm text-[#3130FD] ring-1 ring-[#3130FD]/20">
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zm0 11.066L7.982 17.4l3.7 3.7 10.014-10.034h-7.382z"/></svg>
    Dart / Flutter
  </span>
);

/* ── App ───────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-black px-6 py-12 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            TNS — Refacto MicroApps
          </h1>
          <p className="mt-3 text-lg text-neutral-400">
            LoadingCard — Breakpoint Preview
          </p>
        </header>

        {/* ===== ENGLISH ===== */}
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">EN</span>
          <span className="text-sm text-neutral-500">English</span>
        </div>

        {/* Row 1: React/Web EN */}
        <div className="mb-6">
          <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
            <ReactBadge />
          </h2>
          <div className="flex items-start justify-center gap-8">
            <BreakpointPreview label="Mobile" width={375} message={MESSAGES.web.en} />
            <BreakpointPreview label="Tablet" width={768} message={MESSAGES.web.en} />
            <BreakpointPreview label="Desktop" width={1440} message={MESSAGES.web.en} />
          </div>
        </div>

        {/* Row 2: Dart/Flutter EN */}
        <div className="mt-12">
          <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
            <FlutterBadge />
            <span className="text-sm font-normal text-neutral-500">
              validation_screen.dart — GridView 3xcol, ratio 3:4
            </span>
          </h2>
          <div className="flex items-start justify-center gap-8">
            <DartBreakpointPreview label="Mobile" width={375} message={MESSAGES.dart.en} />
            <DartBreakpointPreview label="Tablet" width={768} message={MESSAGES.dart.en} />
          </div>
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="my-16 border-t border-white/10" />

        {/* ===== FRANCAIS ===== */}
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">FR</span>
          <span className="text-sm text-neutral-500">Francais</span>
        </div>

        {/* Row 3: React/Web FR */}
        <div className="mb-6">
          <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
            <ReactBadge />
          </h2>
          <div className="flex items-start justify-center gap-8">
            <BreakpointPreview label="Mobile" width={375} message={MESSAGES.web.fr} />
            <BreakpointPreview label="Tablet" width={768} message={MESSAGES.web.fr} />
            <BreakpointPreview label="Desktop" width={1440} message={MESSAGES.web.fr} />
          </div>
        </div>

        {/* Row 4: Dart/Flutter FR */}
        <div className="mt-12">
          <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
            <FlutterBadge />
            <span className="text-sm font-normal text-neutral-500">
              validation_screen.dart — GridView 3xcol, ratio 3:4
            </span>
          </h2>
          <div className="flex items-start justify-center gap-8">
            <DartBreakpointPreview label="Mobile" width={375} message={MESSAGES.dart.fr} />
            <DartBreakpointPreview label="Tablet" width={768} message={MESSAGES.dart.fr} />
          </div>
        </div>
      </div>
    </div>
  );
}
