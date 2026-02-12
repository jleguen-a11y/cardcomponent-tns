import { LoadingCardBase } from './LoadingCardBase';
import { MESSAGES } from '../lib/tokens';

export interface DartLoadingCardProps {
  /** Whether to show the outer glow/blur effect. @default true */
  glow?: boolean;
  /** Whether stars should rotate during animation. @default true */
  rotate?: boolean;
  /** Status message displayed below the stars. HIG: user-centric, no trailing ellipsis. */
  message?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Dart / Flutter loading card — 3:4 portrait matching validation_screen.dart.
 *
 * Thin wrapper around `LoadingCardBase` with `variant="dart"`.
 * Default message: "Almost Ready" (HIG-approved).
 *
 * Flutter sizing reference:
 *   - childAspectRatio: 3/4
 *   - BorderRadius.circular(8) outer / BorderRadius.circular(6) inner
 *   - GridView.builder: crossAxisCount 3, crossAxisSpacing 10, mainAxisSpacing 12
 */
export function DartLoadingCard({
  glow = true,
  rotate = true,
  message = MESSAGES.dart.en,
  className,
  style,
}: DartLoadingCardProps) {
  return (
    <LoadingCardBase
      variant="dart"
      glow={glow}
      rotate={rotate}
      message={message}
      className={className}
      style={style}
    />
  );
}
