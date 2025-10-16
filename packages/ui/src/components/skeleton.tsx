import { cn } from "@byte24/ui/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/50", className)}
      {...props}
    />
  );
}

// Shimmer effect skeleton with gradient animation
function ShimmerSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted/30",
        "before:-translate-x-full before:absolute before:inset-0",
        "before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r",
        "before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

// Card skeleton for dashboard cards
function CardSkeleton({
  className,
  showAvatar = false,
  showActions = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showAvatar?: boolean;
  showActions?: boolean;
}) {
  return (
    <div
      className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {showAvatar && <ShimmerSkeleton className="h-12 w-12 rounded-full" />}
          <div className="space-y-2">
            <ShimmerSkeleton className="h-4 w-32" />
            <ShimmerSkeleton className="h-3 w-24" />
          </div>
        </div>
        {showActions && (
          <div className="flex space-x-2">
            <ShimmerSkeleton className="h-8 w-8 rounded" />
            <ShimmerSkeleton className="h-8 w-8 rounded" />
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <ShimmerSkeleton className="h-3 w-full" />
        <ShimmerSkeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

// Table skeleton for data tables
function TableSkeleton({
  className,
  rows = 5,
  columns = 4,
  showHeader = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}) {
  return (
    <div className={cn("rounded-lg border bg-card", className)} {...props}>
      {showHeader && (
        <div className="border-b bg-muted/30 p-4">
          <div className="flex space-x-4">
            {Array.from({ length: columns }).map((_, i) => (
              <ShimmerSkeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
        </div>
      )}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <ShimmerSkeleton
                  key={colIndex}
                  className={cn(
                    "h-4 flex-1",
                    colIndex === 0 && "w-8", // First column might be smaller (e.g., checkbox)
                    colIndex === columns - 1 && "w-16" // Last column might be actions
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Filter skeleton for search/filter components
function FilterSkeleton({
  className,
  count = 3,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  count?: number;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <ShimmerSkeleton key={i} className="h-10 w-32 rounded-md" />
      ))}
    </div>
  );
}

// Dashboard overview skeleton
function DashboardSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Header with breadcrumb and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ShimmerSkeleton className="h-4 w-24" />
          <ShimmerSkeleton className="h-4 w-16" />
        </div>
        <ShimmerSkeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} showAvatar={i % 2 === 0} />
        ))}
      </div>

      {/* Main content area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <ShimmerSkeleton className="h-6 w-48" />
          <FilterSkeleton count={2} />
        </div>
        <TableSkeleton rows={8} columns={5} />
      </div>
    </div>
  );
}

// List skeleton for simple lists
function ListSkeleton({
  className,
  items = 5,
  showAvatar = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  items?: number;
  showAvatar?: boolean;
}) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          {showAvatar && <ShimmerSkeleton className="h-10 w-10 rounded-full" />}
          <div className="flex-1 space-y-2">
            <ShimmerSkeleton className="h-4 w-3/4" />
            <ShimmerSkeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export {
  Skeleton,
  ShimmerSkeleton,
  CardSkeleton,
  TableSkeleton,
  FilterSkeleton,
  DashboardSkeleton,
  ListSkeleton,
};
