/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Design Tokens — Loading Card Animation
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Single source of truth for every visual value used in the loading animation.
 * When porting to Flutter/Dart, map these 1-to-1 to your Dart constants file.
 *
 * @see ANIMATION-SPEC.md for the full extraction guide
 */

/* ── Palette ─────────────────────────────────────────────────────────────── */

/** Desaturated premium palette (~30 % less saturated than Tailwind defaults) */
export const COLORS = {
  /** Soft blue — conic-gradient end, box-shadow, static fallback */
  blue: '#6B8AE6',
  /** Muted violet — conic-gradient mid */
  violet: '#8B7CF6',
  /** Soft mauve — conic-gradient start */
  mauve: '#C084CF',
  /** Neutral dark — card background base */
  cardBg: '#262626',
  /** Muted label — star main + text */
  labelMuted: '#5f707b',
} as const;

/** Inner card gradient (top → bottom) — identical on Web & Dart */
export const INNER_GRADIENT =
  'linear-gradient(180deg, rgba(24, 27, 31, 0) 7.76%, rgb(21, 21, 21) 89.7%), ' +
  'linear-gradient(90deg, rgb(41, 45, 49) 0%, rgb(41, 45, 49) 100%)';

/* ── Timing ──────────────────────────────────────────────────────────────── */

/** All durations in seconds — multiply by 1000 for ms (Flutter Duration) */
export const TIMING = {
  /** Gradient border rotation — full 360° cycle */
  borderRotation: 4.5,
  /** Glow pulse breathing cycle (alternate) */
  glowPulse: 3.5,
  /** Star & text breathing cycle */
  breathe: 4.5,
  /** Secondary star phase offset (half cycle) */
  secondaryOffset: 2.25,
} as const;

/* ── Glow ─────────────────────────────────────────────────────────────────── */

export const GLOW = {
  /** Outer halo blur (resting) */
  blurResting: 14,
  /** Glow pulse blur range [min, max] */
  blurRange: [12, 18] as const,
  /** Glow pulse opacity range [min, max] */
  opacityRange: [0.2, 0.35] as const,
  /** Glow pulse scale range [min, max] — near-imperceptible 1 % amplitude */
  scaleRange: [0.995, 1.005] as const,
  /** Box-shadow rgba opacity (resting) */
  boxShadowOpacity: 0.15,
} as const;

/* ── Star Animation ──────────────────────────────────────────────────────── */

export const STAR = {
  /** Main star: opacity range [min, max] */
  mainOpacity: [0.45, 1.0] as const,
  /** Main star: scale range [min, max] */
  mainScale: [0.8, 1.0] as const,
  /** Main star: rotation range (degrees) [min, max] */
  mainRotation: [-3, 3] as const,
  /** Secondary star: opacity range [min, max] */
  secondaryOpacity: [0.35, 0.85] as const,
  /** Secondary star: scale range [min, max] */
  secondaryScale: [0.75, 1.0] as const,
  /** Secondary star: rotation range (degrees) [min, max] */
  secondaryRotation: [3, -3] as const,
  /** Star container dimensions (px) */
  containerSize: { width: 50, height: 40 } as const,
  /** Main star size (px) */
  mainSize: { width: 33, height: 40 } as const,
  /** Secondary star size (px) */
  secondarySize: { width: 17, height: 20 } as const,
} as const;

/* ── Text Breathing ──────────────────────────────────────────────────────── */

export const TEXT = {
  /** Opacity range [min, max] */
  opacityRange: [0.55, 1.0] as const,
} as const;

/* ── Layout Variants ─────────────────────────────────────────────────────── */

/** Web (React) card shape */
export const WEB_CARD = {
  aspectRatio: '16 / 9',
  borderRadiusOuter: 16,   // rounded-2xl = 1rem = 16px
  borderRadiusInner: 14,   // rounded-[14px]
  borderWidth: 2,          // p-[2px]
} as const;

/** Dart (Flutter) card shape — from validation_screen.dart */
export const DART_CARD = {
  aspectRatio: '3 / 4',
  borderRadiusOuter: 8,    // BorderRadius.circular(8)
  borderRadiusInner: 6,    // BorderRadius.circular(6)
  borderWidth: 2,          // p-[2px]
} as const;

/* ── i18n ─────────────────────────────────────────────────────────────────── */

/** HIG-approved loading messages — no trailing ellipsis */
export const MESSAGES = {
  web: { en: 'Creating Your Content', fr: 'Génération en cours' },
  dart: { en: 'Almost Ready', fr: 'Un instant' },
} as const;
