# Loading Card Animation — Extraction Spec

> Single source of truth for developers porting this animation to **React (Tools)** and **Flutter/Dart (Autoya)**.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Map](#file-map)
3. [Design Tokens](#design-tokens)
4. [Animation Breakdown](#animation-breakdown)
5. [React / Web Integration](#react--web-integration)
6. [Flutter / Dart Integration](#flutter--dart-integration)
7. [i18n — Loading Messages](#i18n--loading-messages)
8. [Star SVG Path Data](#star-svg-path-data)

---

## Architecture Overview

```
LoadingCardBase (shared core)
├── variant="web"  → LoadingCard   (16:9, rounded-2xl)
└── variant="dart" → DartLoadingCard (3:4, border-radius 8px)
```

Both variants share **identical animation logic** — only shape/sizing differs.

---

## File Map

| File | Purpose |
|------|---------|
| `lib/tokens.ts` | Design tokens (colors, timings, sizes) — **port this first** |
| `animations/loading-card.css` | Self-contained animation CSS — **reference for Flutter impl** |
| `components/icons/Star4.tsx` | 4-pointed star SVG (shared) |
| `components/LoadingCardBase.tsx` | Shared base component (both variants) |
| `components/LoadingCard.tsx` | Web variant wrapper |
| `components/DartLoadingCard.tsx` | Dart variant wrapper |

---

## Design Tokens

All values are centralized in `lib/tokens.ts`. Key groups:

### Colors (Premium Desaturated Palette)

| Token | Value | Usage |
|-------|-------|-------|
| `COLORS.blue` | `#6B8AE6` | Conic gradient end, box-shadow |
| `COLORS.violet` | `#8B7CF6` | Conic gradient mid |
| `COLORS.mauve` | `#C084CF` | Conic gradient start |
| `COLORS.cardBg` | `#262626` | Card background under gradient |
| `COLORS.labelMuted` | `#5f707b` | Status message text |

### Inner Card Gradient

```
Top → Bottom:
  rgba(24, 27, 31, 0) at 7.76%  →  rgb(21, 21, 21) at 89.7%
Base layer:
  rgb(41, 45, 49)
```

### Timings (seconds)

| Token | Value | What |
|-------|-------|------|
| `TIMING.borderRotation` | `4.5s` | Full 360° conic gradient cycle |
| `TIMING.glowPulse` | `3.5s` | Glow breathing (alternate) |
| `TIMING.breathe` | `4.5s` | Star & text breathing |
| `TIMING.secondaryOffset` | `2.25s` | Secondary star phase offset (half cycle) |

### Glow Parameters

| Token | Value |
|-------|-------|
| `GLOW.blurResting` | `14px` |
| `GLOW.blurRange` | `[12px, 18px]` |
| `GLOW.opacityRange` | `[0.2, 0.35]` |
| `GLOW.scaleRange` | `[0.995, 1.005]` |
| `GLOW.boxShadowOpacity` | `0.15` |

### Star Parameters

| Token | Main | Secondary |
|-------|------|-----------|
| Opacity | `[0.45, 1.0]` | `[0.35, 0.85]` |
| Scale | `[0.8, 1.0]` | `[0.75, 1.0]` |
| Rotation | `[-3°, 3°]` | `[3°, -3°]` |
| Size | `33×40px` | `17×20px` |
| Container | `50×40px` | — |

### Text Breathing

| Token | Value |
|-------|-------|
| `TEXT.opacityRange` | `[0.55, 1.0]` |

---

## Animation Breakdown

The animation has **5 concurrent layers**, all running independently:

### 1. Gradient Border Rotation
- **CSS**: `conic-gradient` with `@property --angle` animated 0° → 360°
- **Flutter**: `SweepGradient` + `AnimationController` (linear, repeat)
- **Duration**: 4.5s
- **Easing**: linear

### 2. Glow Pulse
- **CSS**: `::before` pseudo-element with `filter: blur()`, `opacity`, `transform: scale()`
- **Flutter**: `AnimatedContainer` with `BoxShadow` + `BackdropFilter`
- **Duration**: 3.5s
- **Easing**: ease-in-out, alternate

### 3. Main Star Breathing
- **CSS**: `transform: scale() rotate()` + `opacity`
- **Flutter**: `Tween<double>` for scale, rotation, opacity
- **Duration**: 4.5s
- **Easing**: ease-in-out
- **Phase**: 0s (no offset)

### 4. Secondary Star Breathing
- Same as main star but with:
  - Different opacity/scale/rotation ranges (see tokens)
  - **Phase offset**: 2.25s (half cycle)
  - Opposite rotation direction

### 5. Text Breathing
- **CSS**: `opacity` animation
- **Flutter**: `AnimatedOpacity` or `FadeTransition`
- **Duration**: 4.5s
- **Easing**: ease-in-out
- **Range**: 0.55 → 1.0

---

## React / Web Integration

### Quick Start

```tsx
import { LoadingCard } from '@/components/LoadingCard';
import '@/animations/loading-card.css'; // already in index.css

<LoadingCard message="Creating Your Content" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `glow` | `boolean` | `true` | Show outer glow effect |
| `rotate` | `boolean` | `true` | Stars rotate during breathing |
| `message` | `string` | `"Creating Your Content"` | Status label (HIG) |
| `className` | `string` | — | Additional CSS classes |
| `style` | `CSSProperties` | — | Inline styles |
| `children` | `ReactNode` | — | Content below the card |

### Dependencies

- `clsx` + `tailwind-merge` (via `lib/utils.ts`)
- Tailwind CSS v3
- CSS `@property` support (Chrome 85+, Safari 15.4+, Firefox 128+)

---

## Flutter / Dart Integration

### Step-by-step Port

1. **Create `loading_animation_tokens.dart`** — copy all values from `lib/tokens.ts`
2. **Create `animated_border_painter.dart`** — `CustomPainter` with `SweepGradient`
3. **Create `loading_card.dart`** widget:
   - `AnimationController` for border (4.5s, linear, repeat)
   - `AnimationController` for breathing (4.5s, ease-in-out, repeat-reverse)
   - `Transform.scale` + `Transform.rotate` for stars
   - `AnimatedOpacity` for text
4. **Star SVG**: use `flutter_svg` with the path data below, or `CustomPainter`

### Key Flutter Equivalents

| CSS | Flutter |
|-----|---------|
| `conic-gradient` + `@property --angle` | `SweepGradient` + `AnimationController` |
| `filter: blur()` | `BackdropFilter` / `ImageFilter.blur` |
| `box-shadow` | `BoxShadow` in `BoxDecoration` |
| `transform: scale() rotate()` | `Transform.scale` + `Transform.rotate` |
| `opacity` animation | `AnimatedOpacity` / `FadeTransition` |
| `ease-in-out` | `Curves.easeInOut` |
| `linear` | `Curves.linear` |
| `animation-delay` | `Future.delayed` or offset in `AnimationController` |

### Sizing (validation_screen.dart)

```dart
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,
    crossAxisSpacing: 10,
    mainAxisSpacing: 12,
    childAspectRatio: 3 / 4,
  ),
  padding: EdgeInsets.symmetric(horizontal: 16),
)
```

- Border radius outer: `BorderRadius.circular(8)`
- Border radius inner: `BorderRadius.circular(6)`
- Border width: `2.0`

---

## i18n — Loading Messages

| Platform | EN | FR |
|----------|----|----|
| **Web** (Tools) | Creating Your Content | Generation en cours |
| **Dart** (Autoya) | Almost Ready | Un instant |

**HIG Rules Applied:**
- No trailing ellipsis ("..." is replaced by the animation itself)
- User-centric, result-oriented wording
- Concise — max 3 words for mobile

---

## Star SVG Path Data

ViewBox: `0 0 24 24`

```
M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z
```

For Flutter `flutter_svg`:
```dart
const star4Svg = '''
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="currentColor"/>
</svg>
''';
```
