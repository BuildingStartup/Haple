import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { BsChat } from "react-icons/bs";
import Spinner from "../ui/Spinner";
import useCategories from "../features/categories/useCategories";
import useSellersCategorySlug from "../features/profiles/useSellersCategorySlug";



export default function CategorySellers() {
  const { catalog, slug } = useParams();
  const { loading: categoryLoading, getCategoryByCatalogAndSlug } = useCategories();
  const { loading: sellersLoading, sellers, fetchSellersById } = useSellersCategorySlug();

  // Fetch category and then sellers
  useEffect(() => {
    async function fetchData() {
      try {
        const category = await getCategoryByCatalogAndSlug(catalog, slug);
        if (category?.id) {
          fetchSellersById(category.id);
        }
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    }
    
    if (catalog && slug) {
      fetchData();
    }
  }, [catalog, slug]);

  // Show loading spinner while fetching categories or sellers
  if (categoryLoading || sellersLoading) return <Spinner />;
  return (
    <section className="p-5 space-y-6 ">
      <Link to="/explore" className="flex items-center gap-2 cursor-pointer">
        <GoArrowLeft className="text-xl text-gray-600 cursor-pointer" />
        <span className="text-gray-600">Back</span>
      </Link>
      
      <div className="flex items-center gap-2 pl-4 py-1  rounded-full bg-stone-100">
        <IoIosSearch className="text-xl text-stone-700" />
        <input
          type="text"
          placeholder="Search for businesses"
          className="flex-6 focus:outline-none py-2 text-base"     />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {sellers.length === 0 ? <p className="text-center w-full py-10 text-base text-stone-700">No sellers found in this category</p> 
        :sellers?.map((seller, value) => {
          return (
            <div
              key={value}
              className="relative flex items-center rounded-xl shadow">

              <div className="p-6 rounded-xl bg-primary text-white flex items-center justify-center font-medium text-base">
                {seller.business_name.slice(0, 2).toUpperCase()}
              </div>

              <div className="px-2">
                <p className="font-medium text-lg">
                  {seller.business_name}
                </p>
                <span className="text-stone-500 line-clamp-1 first-letter:uppercase">
                  {seller.description}
                </span>
              </div>

              <GoArrowRight className="text-slate-500 text-xl shrink-0 absolute right-4 top-1" />

              {/* <div className="bg-secondary rounded-full p-2 absolute right-4 top-1">
                <BsChat className="text-stone-50 text-lg shrink-0 " />
              </div> */}

            </div>
          );
        })}
      </div>
    </section>
  );
}
