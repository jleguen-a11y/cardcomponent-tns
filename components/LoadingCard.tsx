import { cn } from '../lib/utils';

export interface LoadingCardProps {
  /** Whether to show the outer glow/blur effect. Defaults to true. */
  glow?: boolean;
  /** Whether stars should rotate during animation. Defaults to true. */
  rotate?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/** 4-pointed star SVG matching the Figma design */
const Star4 = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

/**
 * Loading card with animated gradient border and stars.
 */
export function LoadingCard({
  glow = true,
  rotate = true,
  className,
  children,
}: LoadingCardProps) {
  return (
    <div className={cn("flex w-full max-w-sm flex-col gap-4", className)}>
      <div
        className={cn(
          'relative aspect-video w-full rounded-2xl p-[2px]',
          'transition-all duration-300',
          'preview-card-border preview-card-border--loading',
          glow && 'with-glow'
        )}
      >
        {/* Inner Content Container - Gradient matching Figma */}
        <div
          className="relative z-10 h-full w-full overflow-hidden rounded-[14px]"
          style={{
            background: 'linear-gradient(180deg, rgba(24, 27, 31, 0) 7.76%, rgb(21, 21, 21) 89.7%), linear-gradient(90deg, rgb(41, 45, 49) 0%, rgb(41, 45, 49) 100%)',
          }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-5 p-4 text-center">
            {/* Stars - 2 stars positioned like Figma: large left, small bottom-right */}
            <div className="relative flex items-center justify-center" style={{ width: 50, height: 40 }}>
              {/* Main Star - Larger */}
              <Star4
                className={cn(
                  "absolute text-neutral-400",
                  rotate ? "star-main" : "star-main-no-rotate"
                )}
                style={{ width: 33, height: 40, left: 0, top: 0 }}
              />
              
              {/* Secondary Star - Smaller, bottom-right */}
              <Star4
                className={cn(
                  "absolute text-neutral-500",
                  rotate ? "star-secondary" : "star-secondary-no-rotate"
                )}
                style={{ width: 17, height: 20, right: 0, bottom: 0 }}
              />
            </div>
            
            {/* Text matching Figma: Inter Semi Bold 12px, grey color */}
            <p className="text-xs font-semibold text-[#5f707b] text-breathe">
              Generating the image...
            </p>
          </div>
        </div>
      </div>
      
      {children && (
        <div className="px-1">
          {children}
        </div>
      )}
    </div>
  );
}
