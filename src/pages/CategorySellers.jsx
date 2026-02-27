import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import Spinner from "../ui/Spinner";
import SellersList from "../ui/SellersList";
import useSellersCategorySlug from "../features/profiles/useSellersCategorySlug";
import useCategories from "../features/categories/useCategories";



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
          className="flex-6 focus:outline-none py-2 text-base"
        />
      </div>

      <SellersList sellers={sellers}/>
      
    </section>
  );
}
