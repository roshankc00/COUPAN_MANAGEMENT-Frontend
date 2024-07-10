const PaymentCardSkeleton = () => {
  return (
    <div className="relative animate-pulse flex gap-10 items-center">
      <div className="shadow-sm rounded-2xl bg-gray-200 h-[150px] w-[200px] xl:h-[250px] xl:w-[350px] ">
        <div className="bg-gray-200 mt-10 h-6 w-full" />
        <div className="bg-gray-200 mt-10 h-6 w-full" />
      </div>
      <div className="shadow-sm rounded-2xl bg-gray-200 h-[150px] w-[100px] xl:h-[250px] xl:w-[250px] "></div>
    </div>
  );
};

export default PaymentCardSkeleton;
