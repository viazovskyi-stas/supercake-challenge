import { Spinner } from "./Spinner";

export const ServerSuspenseLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
        </div>

        {/* Search and Filter Skeleton */}
        <div className="mb-8">
          <div className="flex gap-3 items-center">
            {/* Search Input Skeleton */}
            <div className="flex-1">
              <div className="h-11 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Filter Button Skeleton */}
            <div className="h-11 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Loading State */}
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <div className="text-center">
              <div className="text-gray-700 font-medium mb-1">
                Loading customers...
              </div>
              <div className="text-sm text-gray-500">
                Please wait while we fetch the latest data
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
