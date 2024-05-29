const StoreCardSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      <div className="aspect-square aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lh:h-30">
        <div className=" bg-gray-200 h-[100px] w-[200px]" />
      </div>
    </div>
  );
};

export default StoreCardSkeleton;
