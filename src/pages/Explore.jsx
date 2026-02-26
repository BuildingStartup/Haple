import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import CatalogDisplay from "../ui/CatalogDisplay";
import useCategories from "../features/categories/useCategories";
import { HiShoppingBag, HiSparkles, HiGift, HiHeart } from "react-icons/hi2";
import { MdRestaurant, MdDesignServices, MdComputer } from "react-icons/md";
import { GiRunningShoe, GiYarn, GiLipstick } from "react-icons/gi";
import { TbPerfume } from "react-icons/tb";
import { FaHandSparkles, FaCameraRetro, FaEllipsisH } from "react-icons/fa";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

export default function Explore() {
  const {loading, categories, getAllCategories } = useCategories();

  useEffect(() => {
    getAllCategories();
  }, []);

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

      <div className="flex items-center gap-2 pl-4 py-1  rounded-full bg-stone-100">
        <IoIosSearch className="text-xl text-stone-700" />
        <input
          type="text"
          placeholder="Search for businesses"
          className="flex-6 focus:outline-none py-2 text-base"
        />
      </div>

      {loading ? <Spinner /> : (
        <div className="space-y-8">
        <CatalogDisplay catalog={products} name="Products" />
        <CatalogDisplay catalog={services} name="Services" />
      </div>
    )}
    </section>
  );
}

