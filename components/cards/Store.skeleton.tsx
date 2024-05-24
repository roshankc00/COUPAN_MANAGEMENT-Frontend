const StoreSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      <div className="aspect-square aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none ">
        <div className="w-full h-full bg-gray-200" />
      </div>
    </div>
  );
};

export default StoreSkeleton;
