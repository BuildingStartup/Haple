import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { FcCalendar } from "react-icons/fc";
import { formatDateFns } from "../utils/helpers";

export default function SellerContact({sellerInfo, category}){
  

    const date_created = formatDateFns(sellerInfo?.created_at);

    return (
        <div className="flex flex-col gap-6 p-5">

            <div className="flex items-center gap-3">          
            <MdOutlineCategory className="text-stone-500 text-lg"/>
            <p className="text-sm text-stone-700 capitalize">
                {category?.catalog ?? "General"} ({category?.name ?? "Uncategorized"})
            </p>
            </div>

            <div className="flex items-center gap-3">          
            <FaWhatsapp className="text-stone-500 text-lg"/>
            <p className="text-sm text-stone-700">
                {sellerInfo.whatsapp_number}
            </p>
            </div>

            <div className="flex items-center gap-3">
            <FcCalendar className="text-stone-500 text-lg" />
            <p className="text-sm text-stone-700">
                {date_created}
            </p>
            </div>

            <div className="flex items-center gap-3">
            <GoLocation className="text-stone-500 text-lg" />
            <p className="text-sm text-stone-700">
                {sellerInfo.campus}
            </p>
            </div>

            

        </div>
    )
}