"use client";
import { UseGetAllCategory } from "@/hooks/react-query/categories/get_all_category.hook";
import { useRouter } from "next/navigation";
import { ICategory } from "@/interfaces/category.interface";
import CategoryCard from "@/components/cards/Category.card";

export default function BrowseCategoryPage() {
  const { data, isFetching, isLoading } = UseGetAllCategory();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg-px-8">
      <h1 className="text-3xl font-medium my-3 mb-8">
        Coupons, Promo Codes & Deals by Category
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 place-content-center mt-10">
        {!isFetching &&
          !isLoading &&
          data?.map((item: ICategory) => (
            <CategoryCard category={item} key={item.id} />
          ))}
      </div>
    </main>
  );
}
