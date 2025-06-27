export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
            <div className="space-y-2">
              <div className="h-8 bg-slate-200 rounded w-64"></div>
              <div className="h-4 bg-slate-200 rounded w-96"></div>
            </div>
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-2xl"></div>
            ))}
          </div>

          {/* Content skeleton */}
          <div className="h-96 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}
