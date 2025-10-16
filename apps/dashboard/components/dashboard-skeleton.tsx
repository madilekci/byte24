"use client";

export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded bg-muted/50" />
          <div className="h-4 w-32 animate-pulse rounded bg-muted/30" />
        </div>
        <div className="h-10 w-40 animate-pulse rounded-md bg-muted/50" />
      </div>

      {/* Stats cards grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-muted/50" />
                <div className="h-8 w-16 animate-pulse rounded bg-muted/30" />
              </div>
              <div className="h-12 w-12 animate-pulse rounded-full bg-muted/30" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted/30" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-muted/30" />
            </div>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="space-y-4">
        {/* Filters and actions */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 animate-pulse rounded bg-muted/50" />
          <div className="flex gap-2">
            <div className="h-10 w-32 animate-pulse rounded-md bg-muted/50" />
            <div className="h-10 w-24 animate-pulse rounded-md bg-muted/50" />
            <div className="h-10 w-28 animate-pulse rounded-md bg-muted/50" />
          </div>
        </div>

        {/* Data table skeleton */}
        <div className="rounded-lg border bg-card">
          {/* Table header */}
          <div className="border-b bg-muted/30 p-4">
            <div className="flex space-x-4">
              <div className="h-4 w-8 animate-pulse rounded bg-muted/50" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted/50" />
            </div>
          </div>

          {/* Table rows */}
          <div className="divide-y">
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <div key={rowIndex} className="p-4">
                <div className="flex space-x-4">
                  <div className="h-4 w-8 animate-pulse rounded bg-muted/30" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-muted/30" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-muted/30" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-muted/30" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-muted/30" />
                  <div className="h-4 w-16 animate-pulse rounded bg-muted/30" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 animate-pulse rounded bg-muted/30" />
          <div className="flex gap-2">
            <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
            <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
            <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
            <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
            <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Companies page specific skeleton
export function CompaniesLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header with add button */}
      <div className="flex items-center justify-end">
        <div className="h-10 w-40 animate-pulse rounded-md bg-muted/50" />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="h-10 w-32 animate-pulse rounded-md bg-muted/50" />
        <div className="h-10 w-24 animate-pulse rounded-md bg-muted/50" />
        <div className="h-10 w-28 animate-pulse rounded-md bg-muted/50" />
      </div>

      {/* Data table */}
      <div className="rounded-lg border bg-card">
        {/* Table header */}
        <div className="border-b bg-muted/30 p-4">
          <div className="flex space-x-4">
            <div className="h-4 w-8 animate-pulse rounded bg-muted/50" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted/50" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted/50" />
          </div>
        </div>

        {/* Table rows */}
        <div className="divide-y">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className="p-4">
              <div className="flex space-x-4">
                <div className="h-4 w-8 animate-pulse rounded bg-muted/30" />
                <div className="h-4 flex-1 animate-pulse rounded bg-muted/30" />
                <div className="h-4 flex-1 animate-pulse rounded bg-muted/30" />
                <div className="h-4 flex-1 animate-pulse rounded bg-muted/30" />
                <div className="h-4 flex-1 animate-pulse rounded bg-muted/30" />
                <div className="h-4 w-16 animate-pulse rounded bg-muted/30" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 animate-pulse rounded bg-muted/30" />
        <div className="flex gap-2">
          <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
          <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
          <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
          <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
          <div className="h-8 w-8 animate-pulse rounded bg-muted/30" />
        </div>
      </div>
    </div>
  );
}
