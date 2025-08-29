export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex space-x-2 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded-full w-20 animate-pulse"></div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
          </div>

          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}