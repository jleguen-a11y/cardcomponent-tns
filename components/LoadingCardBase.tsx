import { cn } from '../lib/utils';
import { INNER_GRADIENT, COLORS, STAR } from '../lib/tokens';
import { Star4 } from './icons/Star4';

/**
 * Shape variant — controls aspect ratio and border radius.
 *
 * - `web`:  16:9 landscape, 16px / 14px radii  (React / Tools)
 * - `dart`: 3:4 portrait,   8px / 6px radii    (Flutter / Autoya)
 */
export type CardVariant = 'web' | 'dart';

export interface LoadingCardBaseProps {
  /** Card shape variant. */
  variant?: CardVariant;
  /** Show the outer glow/blur effect. @default true */
  glow?: boolean;
  /** Stars rotate during breathing animation. @default true */
  rotate?: boolean;
  /** Status message displayed below the stars. HIG: no trailing ellipsis. */
  message?: string;
  /** Additional CSS classes on the outermost wrapper. */
  className?: string;
  /** Inline styles on the outermost wrapper. */
  style?: React.CSSProperties;
  /** Optional content rendered below the card (e.g. skeleton text lines). */
  children?: React.ReactNode;
}

/* ── Variant configs ─────────────────────────────────────────────────────── */

const VARIANTS: Record<CardVariant, {
  /** Tailwind class for aspect ratio (web uses class, dart uses inline style) */
  aspectClass: string;
  /** Inline aspect-ratio value — only used when aspectClass is empty */
  aspectRatio: string;
  outerRadius: number;
  innerRadius: number;
  /** Tailwind class for outer border-radius (web uses class, dart uses inline) */
  outerRadiusClass: string;
  /** Tailwind class for inner border-radius (web uses class, dart uses inline) */
  innerRadiusClass: string;
  gap: string;
  padding: string;
}> = {
  /* ── Web: exact original Tailwind classes, no inline overrides ────────── */
  web: {
    aspectClass: 'aspect-video',       // original: aspect-video (16:9)
    aspectRatio: '',
    outerRadius: 16,
    innerRadius: 14,
    outerRadiusClass: 'rounded-2xl',   // original: rounded-2xl
    innerRadiusClass: 'rounded-[14px]',// original: rounded-[14px]
    gap: 'gap-5',
    padding: 'p-4',
  },
  /* ── Dart: inline styles matching Flutter BorderRadius.circular() ────── */
  dart: {
    aspectClass: '',
    aspectRatio: '3 / 4',
    outerRadius: 8,
    innerRadius: 6,
    outerRadiusClass: '',
    innerRadiusClass: '',
    gap: 'gap-4',
    padding: 'p-3',
  },
};

/**
 * Shared base component for the loading card animation.
 *
 * Both `LoadingCard` (web) and `DartLoadingCard` (dart) are thin wrappers
 * around this component — the only difference is the `variant` prop which
 * controls shape, aspect ratio, and border radii.
 *
 * Animation classes come from `animations/loading-card.css`.
 */
export function LoadingCardBase({
  variant = 'web',
  glow = true,
  rotate = true,
  message = 'Loading',
  className,
  style,
  children,
}: LoadingCardBaseProps) {
  const v = VARIANTS[variant];

  return (
    <div
      className={cn('flex w-full flex-col', variant === 'web' && 'max-w-sm gap-4', className)}
      style={style}
    >
      {/* ── Animated border wrapper ──────────────────────────────────────── */}
      <div
        className={cn(
          'relative w-full p-[2px]',
          'transition-all duration-300',
          'loading-card-border loading-card-border--animated',
          glow && 'loading-card-glow',
          v.aspectClass,        // web: 'aspect-video' — dart: '' (uses inline)
          v.outerRadiusClass,   // web: 'rounded-2xl'  — dart: '' (uses inline)
        )}
        style={{
          // Dart uses inline styles; web relies entirely on Tailwind classes
          ...(variant === 'dart' ? {
            aspectRatio: v.aspectRatio,
            borderRadius: v.outerRadius,
          } : {}),
        }}
      >
        {/* ── Inner content container ──────────────────────────────────── */}
        <div
          className={cn('relative z-10 h-full w-full overflow-hidden', v.innerRadiusClass)}
          style={{
            background: INNER_GRADIENT,
            ...(variant === 'dart' ? { borderRadius: v.innerRadius } : {}),
          }}
        >
          <div className={cn('flex h-full flex-col items-center justify-center text-center', v.gap, v.padding)}>
            {/* ── Stars ──────────────────────────────────────────────── */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: STAR.containerSize.width, height: STAR.containerSize.height }}
            >
              <Star4
                className={cn(
                  'absolute text-neutral-400',
                  rotate ? 'loading-star-main' : 'loading-star-main--no-rotate',
                )}
                style={{
                  width: STAR.mainSize.width,
                  height: STAR.mainSize.height,
                  left: 0,
                  top: 0,
                }}
              />
              <Star4
                className={cn(
                  'absolute text-neutral-500',
                  rotate ? 'loading-star-secondary' : 'loading-star-secondary--no-rotate',
                )}
                style={{
                  width: STAR.secondarySize.width,
                  height: STAR.secondarySize.height,
                  right: 0,
                  bottom: 0,
                }}
              />
            </div>

            {/* ── Message ────────────────────────────────────────────── */}
            <p
              className="text-xs font-semibold loading-text-breathe"
              style={{ color: COLORS.labelMuted }}
            >
              {message}
            </p>
          </div>
        </div>
      </div>

      {/* ── Optional children (skeleton lines, etc.) ───────────────────── */}
      {children && <div className="px-1">{children}</div>}
    </div>
  );
}
