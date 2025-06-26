import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-48 mb-8" /> {/* Profile heading */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <Skeleton className="h-24 w-24 rounded-full" /> {/* Avatar */}
          <div>
            <Skeleton className="h-8 w-48 mb-2" /> {/* Name */}
            <Skeleton className="h-4 w-64" /> {/* Email */}
          </div>
        </div>
        <Separator className="my-8" />
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-24" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Input or Select */}
              </div>
            ))}
          </div>
          <Skeleton className="h-10 w-32" /> {/* Submit button */}
        </div>
      </div>
    </div>
  )
}

