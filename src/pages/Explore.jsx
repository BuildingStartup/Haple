import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import CatalogDisplay from "../ui/CatalogDisplay";
import { HiShoppingBag, HiSparkles, HiGift, HiHeart } from "react-icons/hi2";
import { MdRestaurant, MdDesignServices, MdComputer } from "react-icons/md";
import { GiRunningShoe, GiYarn, GiLipstick } from "react-icons/gi";
import { TbPerfume } from "react-icons/tb";
import { FaHandSparkles, FaCameraRetro, FaEllipsisH } from "react-icons/fa";

export default function Explore() {
  const products = [
    {
      name: "Food",
      icon: <MdRestaurant />,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      name: "Clothes",
      icon: <HiShoppingBag />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      name: "Shoes",
      icon: <GiRunningShoe />,
      color: "text-black",
      bg: "bg-gray-200",
    },
    {
      name: "Accessories",
      icon: <HiSparkles />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      name: "Crochet",
      icon: <GiYarn />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      name: "Perfumes",
      icon: <TbPerfume />,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      name: "Skincare",
      icon: <HiHeart />,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      name: "Gifts",
      icon: <HiGift />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      name: "Others",
      icon: <FaEllipsisH />,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  const services = [
    {
      name: "Make-up",
      icon: <GiLipstick />,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      name: "Photographing",
      icon: <FaCameraRetro />,
      color: "text-black",
      bg: "bg-gray-200",
    },
    {
      name: "Nail Tech",
      icon: <FaHandSparkles />,
      color: "text-red-600",
      bg: "bg-red-50",
    },

    {
      name: "Graphic design",
      icon: <MdDesignServices />,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      name: "Web design",
      icon: <MdComputer />,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      name: "Others",
      icon: <FaEllipsisH />,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];
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

      <div className="space-y-8">
        <CatalogDisplay
          catalog={products}
          name="Products"/>
        <CatalogDisplay
          catalog={services}
          name="Services" />
      </div>
    </section>
  );
}

