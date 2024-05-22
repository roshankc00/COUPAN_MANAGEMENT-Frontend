const BlogSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      <div className="aspect-square aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lh:h-80">
        <div className="w-full h-full bg-gray-200" />
      </div>
      <div className="mt-4 flex flex-cols gap-2">
        <div className="bg-gray-200 h-4 w-full" />
        <div className="bg-gray-200 h-4 w-full" />
      </div>
    </div>
  );
};

export default BlogSkeleton;
