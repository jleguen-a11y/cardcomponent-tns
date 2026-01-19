import React, { useState } from "react";
import { Trash2, MoreVertical, Copy, Loader2, FolderOpen } from "lucide-react";
import { cn } from "./lib/utils";

// ============================================================================
// Types
// ============================================================================

export type CardSize = "LG" | "SM";
export type CardType =
  | "default"
  | "hover"
  | "active"
  | "loading"
  | "empty"
  | "delete"
  | "delete+copy";
export type CardStatus = "completed" | "generating" | "empty";

export interface CardProjetProps {
  /** Card size variant */
  size?: CardSize;
  /** Visual state of the card */
  type?: CardType;
  /** Project title (e.g., license plate) */
  title?: string;
  /** Category name */
  category?: string;
  /** Time/date info */
  date?: string;
  /** Status for the badge */
  status?: CardStatus;
  /** Image URL for the card thumbnails */
  imageUrl?: string;
  /** Whether the card is currently selected/active */
  isActive?: boolean;
  /** Callback when card is clicked */
  onClick?: () => void;
  /** Callback when delete button is clicked */
  onDelete?: () => void;
  /** Callback when copy/duplicate button is clicked */
  onCopy?: () => void;
  /** Callback when more options button is clicked */
  onMoreOptions?: () => void;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Sub-components
// ============================================================================

/** License plate icon */
const LicensePlateIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-5 h-5", className)}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="5"
      width="18"
      height="10"
      rx="2"
      stroke="#F4F6F7"
      strokeWidth="1.5"
    />
    <circle cx="4" cy="10" r="1" fill="#F4F6F7" />
    <circle cx="16" cy="10" r="1" fill="#F4F6F7" />
    <rect x="6" y="8" width="2" height="4" rx="0.5" fill="#F4F6F7" />
    <rect x="9" y="8" width="2" height="4" rx="0.5" fill="#F4F6F7" />
    <rect x="12" y="8" width="2" height="4" rx="0.5" fill="#F4F6F7" />
  </svg>
);

/** Status badge component */
const StatusBadge = ({
  status,
  className,
}: {
  status: CardStatus;
  className?: string;
}) => {
  const config = {
    completed: {
      label: "Completed",
      bgColor: "bg-[#20D167]",
      textColor: "text-[#101112]",
      icon: null,
    },
    generating: {
      label: "Generating video",
      bgColor: "bg-[#BE87FF]",
      textColor: "text-[#101112]",
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
    },
    empty: {
      label: "Empty",
      bgColor: "bg-[#DBE2FF]",
      textColor: "text-[#101112]",
      icon: null,
    },
  };

  const { label, bgColor, textColor, icon } = config[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 px-2 py-0.5 rounded",
        bgColor,
        className
      )}
    >
      <span className={cn("text-xs font-semibold leading-none", textColor)}>
        {label}
      </span>
      {icon}
    </div>
  );
};

/** Project label with title and icon */
const ProjectLabel = ({
  title,
  showFolderIcon = false,
  className,
}: {
  title: string;
  showFolderIcon?: boolean;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-1.5", className)}>
    {showFolderIcon ? (
      <FolderOpen className="w-4 h-4 text-[#F4F6F7]" />
    ) : (
      <LicensePlateIcon />
    )}
    <span className="text-base font-semibold text-[#F4F6F7] leading-none">
      {title}
    </span>
  </div>
);

/** Meta info line */
const MetaInfo = ({
  category,
  date,
  className,
}: {
  category: string;
  date: string;
  className?: string;
}) => (
  <p
    className={cn(
      "text-xs font-medium text-[#CAD1D7] leading-5 tracking-tight",
      className
    )}
  >
    {category} • {date}
  </p>
);

/** Empty state placeholder card */
const EmptyCardPlaceholder = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative rounded-2xl overflow-hidden",
      "bg-gradient-to-b from-[#2e2e2e] to-[#111]",
      className
    )}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-24 h-20">
        {/* Placeholder bars */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[#292D32] rounded-full" />
        <div className="absolute top-6 left-0 right-0 h-4 bg-[#292D32] rounded-full" />
        <div className="absolute bottom-0 left-3 right-3 h-3 bg-[#292D32] rounded-full" />
        {/* Plus icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#3E444C] flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-white"
          >
            <path
              d="M8 3v10M3 8h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

/** Single card image with overlay */
const CardImage = ({
  imageUrl,
  isEmpty,
  className,
  style,
}: {
  imageUrl?: string;
  isEmpty?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => {
  if (isEmpty) {
    return <EmptyCardPlaceholder className={className} />;
  }

  return (
    <div
      className={cn("relative rounded-2xl overflow-hidden", className)}
      style={style}
    >
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[rgba(24,27,31,0.76)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#2e2e2e] to-[#111]" />
      )}
    </div>
  );
};

/** Stacked rotated card images */
const CardImageStack = ({
  imageUrl,
  isEmpty,
  size,
}: {
  imageUrl?: string;
  isEmpty?: boolean;
  size: CardSize;
}) => {
  if (size === "LG") {
    return (
      <div className="absolute bottom-4 right-4 flex items-end pointer-events-none">
        {/* Back card - rotated left */}
        <div className="relative -mr-10">
          <div className="rotate-[-10deg] origin-center">
            <CardImage
              imageUrl={imageUrl}
              isEmpty={isEmpty}
              className="w-[160px] h-[160px]"
            />
          </div>
        </div>
        {/* Front card - rotated right */}
        <div className="relative mb-5">
          <div className="rotate-[13deg] origin-center">
            <CardImage
              imageUrl={imageUrl}
              isEmpty={isEmpty}
              className="w-[166px] h-[166px]"
            />
          </div>
        </div>
      </div>
    );
  }

  // SM size
  return (
    <div className="absolute bottom-3 right-3 flex items-end pointer-events-none">
      {/* Back card - rotated left */}
      <div className="relative -mr-8">
        <div className="rotate-[-10deg] origin-center">
          <CardImage
            imageUrl={imageUrl}
            isEmpty={isEmpty}
            className="w-[116px] h-[116px]"
          />
        </div>
      </div>
      {/* Front card - rotated right */}
      <div className="relative mb-4">
        <div className="rotate-[13deg] origin-center">
          <CardImage
            imageUrl={imageUrl}
            isEmpty={isEmpty}
            className="w-[116px] h-[116px]"
          />
        </div>
      </div>
    </div>
  );
};

/** Action buttons for hover state */
const ActionButtons = ({
  onDelete,
  onMoreOptions,
  className,
}: {
  onDelete?: () => void;
  onMoreOptions?: () => void;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-1", className)}>
    {onDelete && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EA1851] hover:bg-[#d01548] transition-colors"
        aria-label="Delete"
      >
        <Trash2 className="w-4 h-4 text-white" />
      </button>
    )}
    {onMoreOptions && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMoreOptions();
        }}
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3E444C] hover:bg-[#4a5058] transition-colors"
        aria-label="More options"
      >
        <MoreVertical className="w-4 h-4 text-white" />
      </button>
    )}
  </div>
);

/** Swipe action panel (for SM delete variants) */
const SwipeActions = ({
  variant,
  onDelete,
  onCopy,
}: {
  variant: "delete" | "delete+copy";
  onDelete?: () => void;
  onCopy?: () => void;
}) => (
  <div className="flex items-stretch self-stretch">
    {variant === "delete+copy" && onCopy && (
      <button
        onClick={onCopy}
        className="flex items-center justify-center w-[60px] bg-[#292D32] hover:bg-[#3a3f45] transition-colors"
        aria-label="Copy"
      >
        <Copy className="w-6 h-6 text-white" />
      </button>
    )}
    {onDelete && (
      <button
        onClick={onDelete}
        className={cn(
          "flex items-center justify-center bg-[#EA1851] hover:bg-[#d01548] transition-colors",
          variant === "delete" ? "w-20 rounded-r-2xl" : "w-[60px] rounded-r-2xl"
        )}
        aria-label="Delete"
      >
        <Trash2 className="w-6 h-6 text-white" />
      </button>
    )}
  </div>
);

// ============================================================================
// Main Component
// ============================================================================

export const CardProjet: React.FC<CardProjetProps> = ({
  size = "LG",
  type = "default",
  title = "AA-001-AA",
  category = "Car Ads",
  date = "3 days ago",
  status = "completed",
  imageUrl = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=400&fit=crop",
  isActive = false,
  onClick,
  onDelete,
  onCopy,
  onMoreOptions,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Derive effective type from props
  const effectiveType = isActive ? "active" : isHovered ? "hover" : type;
  const effectiveStatus =
    type === "empty" ? "empty" : type === "loading" ? "generating" : status;
  const showActions =
    (effectiveType === "hover" || effectiveType === "active") &&
    type !== "empty" &&
    type !== "loading";
  const isSwipeVariant = type === "delete" || type === "delete+copy";

  // Size-based dimensions
  const sizeClasses = {
    LG: "w-[380px] h-[240px] min-w-[380px] max-w-[500px]",
    SM: "w-[304px] h-[174px] min-w-[250px] max-w-[320px]",
  };

  // Border styles based on state
  const getBorderClasses = () => {
    if (effectiveType === "hover") return "border border-[#2E30FE]";
    if (effectiveType === "active" || type === "loading")
      return "border border-[#771ED2]";
    return "";
  };

  // Background gradient
  const backgroundGradient =
    type === "empty"
      ? "bg-gradient-to-b from-[rgba(42,42,42,0.5)] to-[rgba(9,9,9,0.5)]"
      : "bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(rgba(255,251,239,0.5)_0%,rgba(180,163,137,0.5)_100%)]";

  // For swipe variants, we need a different layout
  if (isSwipeVariant && size === "SM") {
    return (
      <div className={cn("flex items-stretch", className)}>
        {/* Main card content */}
        <div
          className={cn(
            "flex flex-col p-4 rounded-l-2xl overflow-hidden relative",
            sizeClasses.SM,
            backgroundGradient
          )}
          onClick={onClick}
        >
          <div className="flex flex-col gap-3.5 w-[119px] z-10">
            <StatusBadge status={effectiveStatus} />
            <div className="flex flex-col gap-1">
              <ProjectLabel title={title} />
              <MetaInfo category={category} date={date} />
            </div>
          </div>
          <CardImageStack
            imageUrl={imageUrl}
            isEmpty={type === "empty"}
            size={size}
          />
        </div>
        {/* Swipe actions */}
        <SwipeActions
          variant={type}
          onDelete={onDelete}
          onCopy={onCopy}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 rounded-2xl overflow-hidden relative cursor-pointer transition-all duration-200",
        sizeClasses[size],
        backgroundGradient,
        getBorderClasses(),
        effectiveType === "hover" && "backdrop-blur-[6.3px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Top row: Content and actions */}
      <div className="flex items-start justify-between w-full z-10">
        {/* Left: Status and info */}
        <div className="flex flex-col gap-3.5 w-[119px]">
          <StatusBadge status={effectiveStatus} />
          <div className="flex flex-col gap-1">
            <ProjectLabel
              title={title}
              showFolderIcon={type === "empty" && title !== "AA-001-AA"}
            />
            <MetaInfo category={category} date={date} />
          </div>
        </div>

        {/* Right: Action buttons (shown on hover/active) */}
        {showActions && (
          <ActionButtons onDelete={onDelete} onMoreOptions={onMoreOptions} />
        )}
      </div>

      {/* Card image stack - positioned absolutely */}
      <CardImageStack
        imageUrl={imageUrl}
        isEmpty={type === "empty"}
        size={size}
      />
    </div>
  );
};

export default CardProjet;
