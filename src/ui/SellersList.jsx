import { GoArrowRight } from "react-icons/go";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function SellersList({sellers}){
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {sellers.length === 0 ? <p className="text-center w-full py-10 text-base text-stone-700">No sellers found in this category</p> 
        :sellers?.map((seller, value) => {
          return (
            <Link to={`/seller/${seller.username}`}
              key={value}
              className="relative flex items-center rounded-xl shadow">

              <div className="p-6 rounded-xl bg-primary text-white flex items-center justify-center font-medium text-base overflow-hidden w-25 h-25">
                {seller.avatar_url ? (
                  <img src={seller.avatar_url} alt={seller.business_name} className="w-full h-full object-cover" />
                ) : (
                  seller.business_name.slice(0, 2).toUpperCase()
                )}
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

            </Link>
          );
        })}
      </div>
    )
}