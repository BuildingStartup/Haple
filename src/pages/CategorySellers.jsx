import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import Spinner from "../ui/Spinner";
import SellersList from "../ui/SellersList";
import useSellersCategorySlug from "../features/profiles/useSellersCategorySlug";
import useCategories from "../features/categories/useCategories";
import useSearchSeller from "../features/profiles/useSearchSeller";
import SearchBar from "../ui/SearchBar";
import NetworkError from "../ui/NetworkError";



export default function CategorySellers() {
  const { catalog, slug } = useParams();
  const { loading: categoryLoading, getCategoryByCatalogAndSlug } = useCategories();
  const { loading: sellersLoading, sellers, fetchSellersById } = useSellersCategorySlug();
  const { loading: searchLoading, error: searchError, sellers: searchSellers, searchSellers: performSearch } = useSearchSeller();
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    performSearch(searchQuery);
  };

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

      <SearchBar query={query} onSearch={handleSearch} />

      {query.length > 0 ? (
        // Show search results
        <div>
          {searchLoading && <Spinner />}
          {searchError && <NetworkError />}
          {searchSellers.length > 0 ? (
            <SellersList sellers={searchSellers} />
          ) : (
            !searchLoading && <p className="text-center text-stone-500">No sellers found</p>
          )}
        </div>
      ) : (
        // Show category sellers
        <SellersList sellers={sellers}/>
      )}
      
    </section>
  );
}
