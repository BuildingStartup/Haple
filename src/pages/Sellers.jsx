import { IoIosSearch } from "react-icons/io";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
export default function Sellers({ selectedCategory }) {
  const sellerInfo = [
    {
      business_name: "Chunkz",
      description:
        "GitHub users are now required to enable two-factor authentication as an additional security measure. Your activity on GitHub includes you in this requirement. You will need to enable two-factor authentication on your account before April 07, 2026, or be restricted from account actions.",
      whatsapp_number: "+2348135503380",
      email: "jayzeeohiozoje@gmail.com",
      categories: "Food",
      mode: "product",
    },
    {
      business_name: "Chunkz",
      description:
        "GitHub users are now required to enable two-factor authentication as an additional security measure. Your activity on GitHub includes you in this requirement. You will need to enable two-factor authentication on your account before April 07, 2026, or be restricted from account actions.",
      whatsapp_number: "+2348135503380",
      email: "jayzeeohiozoje@gmail.com",
      categories: "Food",
      mode: "product",
    },
    {
      business_name: "Chunk",
      description:
        "GitHub users are now required to enable two-factor authentication as an additional security measure. Your activity on GitHub includes you in this requirement. You will need to enable two-factor authentication on your account before April 07, 2026, or be restricted from account actions.",
      whatsapp_number: "+2348135503380",
      email: "jayzeeohiozoje@gmail.com",
      categories: "Clothes",
      mode: "product",
    },
    {
      business_name: "Joel",
      description:
        "GitHub users are now required to enable two-factor authentication as an additional security measure. Your activity on GitHub includes you in this requirement. You will need to enable two-factor authentication on your account before April 07, 2026, or be restricted from account actions.",
      whatsapp_number: "+2348135503380",
      email: "jayzeeohiozoje@gmail.com",
      categories: "Make-up",
      mode: "product",
    },
  ];
  const filtedData = sellerInfo.filter((seller) =>
    seller.categories.includes(selectedCategory)
  );
  return (
    <section className="py-5 px-2 ">
      <Link to="/explore" className="flex items-center gap-2 cursor-pointer">
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-4 gap-y-2">
        {filtedData.map((seller, value) => {
          return (
            <Link key={value} to="/sellerProfile">
              <div className="mt-5 flex gap-2 p-1 rounded-xl shadow-sm">
                <div className="p-6 rounded-xl bg-primary text-white flex items-center justify-center font-semibold text-base shrink-0">
                  {seller.business_name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col justify-center py-1">
                  <p className="font-semibold text-black text-base">
                    {seller.business_name}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {seller.description}
                  </p>
                </div>
                <GoArrowRight className="text-slate-500 text-xl shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
