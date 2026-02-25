import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineCategory } from "react-icons/md";
import { GoLocation } from "react-icons/go";

export default function SellerContact({sellerInfo, category}){
    return (
        <div className="flex flex-col gap-6 p-5">

            <div className="flex items-center gap-3">          
            <MdOutlineCategory className="text-stone-500 text-xl"/>
            <p className="capitalize">
                {category.catalog} ({category.name})
            </p>
            </div>

            <div className="flex items-center gap-3">          
            <FaWhatsapp className="text-stone-500 text-xl"/>
            <p className="">
                {sellerInfo.whatsapp_number}
            </p>
            </div>

            {/* <div className="flex items-center gap-3">
            <MdOutlineEmail className="text-stone-500 text-xl" />
            <p className="">
                {sellerInfo.email}
            </p>
            </div> */}

            <div className="flex items-center gap-3">
            <GoLocation className="text-stone-500 text-xl" />
            <p className="">
                {sellerInfo.campus}
            </p>
            </div>

        </div>
    )
}