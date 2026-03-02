import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { TbPerfume } from "react-icons/tb";
import { GiRunningShoe, GiYarn, GiLipstick } from "react-icons/gi";
import { HiShoppingBag, HiSparkles, HiGift, HiHeart } from "react-icons/hi2";
import { MdRestaurant, MdDesignServices, MdComputer } from "react-icons/md";
import { FaHandSparkles, FaCameraRetro, FaEllipsisH } from "react-icons/fa";
import useCategories from "../features/categories/useCategories";
import useSearchSeller from "../features/profiles/useSearchSeller";
import CatalogDisplay from "../ui/CatalogDisplay";
import SellersList from "../ui/SellersList";
import Spinner from "../ui/Spinner";
import SearchBar from "../ui/SearchBar";

export default function Explore() {
  const [query, setQuery] = useState("");
  const {loading, categories, getAllCategories } = useCategories();
  const {loading: searchLoading, error: searchError, sellers, searchSellers} = useSearchSeller();

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    searchSellers(searchQuery);
  };

  const iconMap = {
    MdRestaurant: <MdRestaurant />,
    HiShoppingBag: <HiShoppingBag />,
    GiRunningShoe: <GiRunningShoe />,
    HiSparkles: <HiSparkles />,
    GiYarn: <GiYarn />,
    TbPerfume: <TbPerfume />,
    HiHeart: <HiHeart />,
    HiGift: <HiGift />,
    GiLipstick: <GiLipstick />,
    FaCameraRetro: <FaCameraRetro />,
    FaHandSparkles: <FaHandSparkles />,
    MdDesignServices: <MdDesignServices />,
    MdComputer: <MdComputer />,
    FaEllipsisH: <FaEllipsisH />,
  };

  const paletteByName = {
    food: { color: "text-orange-600", bg: "bg-orange-50" },
    clothes: { color: "text-blue-600", bg: "bg-blue-50" },
    shoes: { color: "text-black", bg: "bg-gray-200" },
    accessories: { color: "text-purple-600", bg: "bg-purple-50" },
    crochet: { color: "text-green-600", bg: "bg-green-50" },
    perfumes: { color: "text-cyan-600", bg: "bg-cyan-50" },
    skincare: { color: "text-yellow-600", bg: "bg-yellow-50" },
    "gift packages": { color: "text-red-600", bg: "bg-red-50" },
    others: { color: "text-gray-600", bg: "bg-gray-100" },
    "make up": { color: "text-pink-600", bg: "bg-pink-50" },
    photography: { color: "text-black", bg: "bg-gray-200" },
    "nail tech": { color: "text-red-600", bg: "bg-red-50" },
    "graphic design": { color: "text-violet-600", bg: "bg-violet-50" },
    "web design": { color: "text-teal-600", bg: "bg-teal-50" },
  };

  const fallbackPalettes = [
    { color: "text-orange-600", bg: "bg-orange-50" },
    { color: "text-blue-600", bg: "bg-blue-50" },
    { color: "text-gray-900", bg: "bg-gray-200" },
    { color: "text-purple-600", bg: "bg-purple-50" },
    { color: "text-green-600", bg: "bg-green-50" },
    { color: "text-cyan-600", bg: "bg-cyan-50" },
    { color: "text-yellow-600", bg: "bg-yellow-50" },
    { color: "text-red-600", bg: "bg-red-50" },
    { color: "text-teal-600", bg: "bg-teal-50" },
    { color: "text-violet-600", bg: "bg-violet-50" },
    { color: "text-pink-600", bg: "bg-pink-50" },
  ];

  const categoriesToCatalog = (catalogName) =>
    categories
      .filter((category) => category.catalog === catalogName)
      .map((category, index) => {
        const key = category.name?.toLowerCase().trim();
        const palette =
          paletteByName[key] ??
          fallbackPalettes[index % fallbackPalettes.length];
        return {
          name: category.name,
          icon: iconMap[category.icon] ?? <FaEllipsisH />,
          color: palette.color,
          bg: palette.bg,
          slug: category.slug,
        };
      });

  const products = categoriesToCatalog("products");
  const services = categoriesToCatalog("services");

  
  return (
    <section className="p-5 space-y-6">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <GoArrowLeft className="text-xl text-gray-600 cursor-pointer" />
        <span className="text-gray-600">Back</span>
      </Link>

      <SearchBar query={query} onSearch={handleSearch} />

      {query.length > 0 ? (
        // Show search results
        <div>
          {searchLoading && <Spinner />}
          {searchError && <p className="text-red-600">Error: {searchError}</p>}
          {sellers.length > 0 ? (
            <SellersList sellers={sellers} />
          ) : (
            !searchLoading && <p className="text-center text-stone-500">No sellers found</p>
          )}
        </div>
      ) : (
        // Show categories
        loading ? <Spinner /> : (
          <div className="space-y-8">
            <CatalogDisplay catalog={products} name="Products" />
            <CatalogDisplay catalog={services} name="Services" />
          </div>
        )
      )}
    </section>
  );
}
