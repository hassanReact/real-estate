import { Skeleton } from "@/components/ui/skeleton"

interface PropertyCardSkeletonProps {
  count?: number
}

export function SkeletonPropertyCard({ count = 4 }: PropertyCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full rounded-xl shadow-sm shadow-gray-800 border border-gray-900 bg-zinc-900 overflow-hidden"
        >
          <Skeleton className="w-full h-56" />
          <div className="p-5 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="pt-4 border-t border-gray-900 flex justify-between items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

