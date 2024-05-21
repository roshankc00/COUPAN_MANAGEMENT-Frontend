import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCouponCard() {
  return (
    <div className="shadow-sm rounded-lg p-4 flex justify-between items-center border border-slate-200">
      <div className="flex items-center gap-5">
        <Skeleton className="h-28 w-28 bg-gray-200" />
        <div>
          <Skeleton className="h-4 w-28 bg-gray-200" />
          <Skeleton className="h-4 w-[20vw] mt-4 bg-gray-200 " />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-20 bg-gray-200" />
      </div>
    </div>
  );
}
