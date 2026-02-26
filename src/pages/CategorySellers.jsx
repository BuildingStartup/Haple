import { IoIosSearch } from "react-icons/io";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
export default function CategorySellers({ selectedCategory = "Clothes" }) {
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
    <section className="p-5 space-y-6 ">
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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-4 gap-y-2">
        {filtedData.map((seller, value) => {
          return (
            <Link key={value} to="/profile">
              <div
                key={value}
                className="mt-5 flex gap-2 p-1 rounded-xl shadow-sm"
              >
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
