/**
 * 4-pointed star SVG — matching the Figma design token.
 *
 * Used in both Web and Dart loading card variants.
 * Flutter equivalent: a CustomPainter drawing the same path,
 * or an SVG asset loaded via `flutter_svg`.
 *
 * Path data (for Flutter SvgPicture.string or CustomPainter):
 *   M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24
 *   C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z
 */
export function Star4({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}
