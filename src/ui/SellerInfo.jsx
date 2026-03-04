export default function SellerInfo({sellerInfo, category}){
    const initials = (sellerInfo?.business_name || "?").slice(0, 2).toUpperCase();
    
    return (
        <div className=" flex flex-col gap-3 items-center absolute -bottom-25 left-0 right-0 mx-auto">
          {/* Avatar */}
          <div className="bg-white w-25 h-25 flex justify-center items-center rounded-full shadow-lg inset-ring-3 inset-ring-primary-light overflow-hidden">
            {sellerInfo?.avatar_url ? (
              <img src={sellerInfo.avatar_url} alt={sellerInfo?.business_name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary font-bold text-3xl">{initials}</span>
            )}
          </div>

          <h2 className="text-2xl font-medium">{sellerInfo?.business_name}</h2>

          <div className="">
            <span className="bg-stone-100 rounded-full py-1 px-4 capitalize">
              {category?.name ?? "Uncategorized"}
            </span>
          </div>
        </div>      
    )
}