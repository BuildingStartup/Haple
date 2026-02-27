import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import Spinner from "../ui/Spinner";
import useSeller from "../features/profiles/useSeller";
import useSellerCategory from "../features/categories/useSellerCategory";


export default function SellerProfile() {
  const {username} = useParams();
  const {loading: sellerLoading, error: sellerError, seller: sellerInfo,  fetchSellerByUsername} = useSeller();
  const {fetchSellerCategory, loading: categoryLoading, error: categoryError, category, } = useSellerCategory();
  const navigate = useNavigate();

  useEffect(()=> {
    if(username) fetchSellerByUsername(username);
  }, [username, fetchSellerByUsername]);

  useEffect(() => {
      if (sellerInfo?.category_id) fetchSellerCategory(sellerInfo.category_id);
    }, [sellerInfo?.category_id, fetchSellerCategory]);

 

  const products = [
    {
      name: "Oversized Tee",
      description: "100% cotton, very comfy",
      image: "https://placehold.co/200x150",
    },
    {
      name: "Oversized Tee",
      description: "100% cotton, very comfy",
      image: "https://placehold.co/200x150",
    },
  ];

  
  if(sellerLoading || categoryLoading ) return <Spinner />;
  if(sellerError || categoryError) return <p>Error</p>
  if(!sellerInfo || !category) return <p>Seller not found</p>;
  
  const whatsappNumber = sellerInfo.whatsapp_number.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hi ${sellerInfo?.business_name}, I found you on Haple and I'm interested in your products!`
  );
  return (
    <section className="min-h-screen space-y-5">
      
        <div className="bg-primary p-5 relative h-45 mb-30">

          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 cursor-pointer">
              <GoArrowLeft className="text-2xl text-stone-100" />
              <span className="text-stone-100">Back</span>
            </button>
          </div>

          {/* Seller Info */}
          <div className=" flex flex-col gap-3 items-center absolute -bottom-25 left-0 right-0 mx-auto">
            {/* Avatar */}
            <div className="bg-white w-25 h-25 flex justify-center items-center rounded-full shadow-lg inset-ring-3 inset-ring-primary-light">
              <span className="text-primary font-bold text-3xl">
                {sellerInfo.business_name.slice(0, 2).toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl font-medium">
              {sellerInfo.business_name}
            </h2>

            <div className="">
              <span className="bg-stone-100 rounded-full py-1 px-4 capitalize">
                {category.name}
              </span>
            </div>
          </div>

        </div>

        {/* Description */}
        <div className="px-5 pt-2 text-stone-700 leading-loose">
          {sellerInfo.description}
        </div>


      {/* Catalog Text */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-stone-200" />
          <h3 className="text-stone-400 tracking-widest">Catalog</h3>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* How it looks like when added */}
      <div className="flex flex-wrap gap-3 p-5">
        {products.map((prod, i) => (
          <div key={i} className="w-50 rounded-lg overflow-hidden bg-stone-50">
            <img
              src={prod.image}
              alt={prod.name}
              className="w-full h-35 object-cover"
            />
            <div className="p-2">
              <p className="text-stone-900 capitalize">{prod.name}</p>
              <p className="text-stone-600">{prod.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Row */}
      <div className="p-5">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noreferrer"
        >
          <button className="bg-secondary-light w-full text-white py-3 text-base rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-secondary transition-all duration-300">
            <FaWhatsapp className="text-xl" />
            Message on Whatsapp
          </button>
        </a>
      </div>

    </section>
  );
}
