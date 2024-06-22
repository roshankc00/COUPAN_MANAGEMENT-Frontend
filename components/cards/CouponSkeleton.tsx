const CouponSkeletonCard = () => {
  return (
    <div className="relative animate-pulse bg-gray-100">
      <div className="flex justify-between px-5 items-center gap-10">
        <div className="flex gap-4 w-full items-center">
          <div className="shadow-sm rounded-2xl bg-gray-200   w-[100px] h-[100px]"></div>
          <div className="shadow-sm rounded-2xl w-full">
            <div className="bg-gray-200 mt-10 h-6 w-full" />
            <div className="bg-gray-200 mt-10 h-6 w-full" />
          </div>
        </div>
        <div className="bg-gray-200 mt-10 h-6 w-[150px]" />
      </div>
    </div>
  );
};

export default CouponSkeletonCard;
