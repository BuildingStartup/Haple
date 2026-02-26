import { IoIosSearch } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiShoppingBag, HiSparkles, HiGift, HiHeart } from "react-icons/hi2";
import { MdRestaurant, MdDesignServices, MdComputer } from "react-icons/md";
import { GiRunningShoe, GiYarn, GiLipstick } from "react-icons/gi";
import { TbPerfume } from "react-icons/tb";
import { FaHandSparkles, FaCameraRetro, FaEllipsisH } from "react-icons/fa";

export default function Explore({ setSelectedCategory }) {
  const [isExpanded, setIsExpanded] = useState(null);
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
    <section className="py-5 px-4">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <GoArrowLeft className="text-2xl text-gray-600 cursor-pointer" />
        <span className="text-gray-600">Back</span>
      </Link>
      <div className="mt-5 relative">
        <div className="absolute top-1/2 -translate-y-1/2 text-base pl-2">
          <IoIosSearch />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full py-3 px-7 rounded-xl border border-slate-200 
                 focus:outline-none focus:border-[#1A55E3] 
                 bg-white shadow-sm"
        />
      </div>
      <CatalogDisplay
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        setSelectedCategory={setSelectedCategory}
        catalog={products}
        name="Products"
      />
      <CatalogDisplay
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        setSelectedCategory={setSelectedCategory}
        catalog={services}
        name="Services"
      />
    </section>
  );
}

function CatalogDisplay({
  catalog,
  name,
  isExpanded,
  setIsExpanded,
  setSelectedCategory,
}) {
  const isOpen = isExpanded === name;
  const catalogLength = isOpen ? catalog : catalog.slice(0, 3);
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-5 font-extrabold">
        <h2 className="text-xl text-black tracking-tight">{name}</h2>
        <button
          className="text-primary tracking-widest cursor-pointer"
          onClick={() => setIsExpanded(isOpen ? null : name)}
        >
          {isOpen ? "View Less" : "View More"}
        </button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 mt-5">
        {catalogLength.map((product, value) => (
          <Link to="/sellers" key={value}>
            <div
              className="bg-white min-w-40 h-28 flex flex-col items-center rounded-2xl justify-center text-base cursor-pointer shadow-sm hover:-translate-y-1"
              onClick={() => setSelectedCategory(product.name)}
            >
              <div
                className={`h-12 w-12 flex items-center justify-center text-2xl ${product.color} ${product.bg} p-2 rounded-full mb-1`}
              >
                {product.icon}
              </div>
              <span className="text-sm font-extrabold text-gray-700 uppercase tracking-tight">
                {product.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
