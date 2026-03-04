import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import Spinner from "../ui/Spinner";
import NetworkError from "../ui/NetworkError";
import useSeller from "../features/profiles/useSeller";
import useSellerCategory from "../features/categories/useSellerCategory";
import useSellerImages from "../features/profiles/useSellerImages";
import useStats from "../features/stats/useStats";

export default function SellerProfile() {
  const { username } = useParams();
  const {
    loading: sellerLoading,
    error: sellerError,
    seller: sellerInfo,
    fetchSellerByUsername,
  } = useSeller();
  const {
    fetchSellerCategory,
    loading: categoryLoading,
    error: categoryError,
    category,
  } = useSellerCategory();
  const { handleIncrementWhatsappClicks, handleIncrementProfileViews } =
    useStats();
  const {
    loading: imagesLoading,
    error: imagesError,
    images: sellerImages,
    handleGetImages,
  } = useSellerImages();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) fetchSellerByUsername(username);
  }, [username]);

  useEffect(() => {
    if (sellerInfo?.category_id) fetchSellerCategory(sellerInfo.category_id);
  }, [sellerInfo?.category_id]);

  useEffect(() => {
    if (sellerInfo?.id) handleGetImages(sellerInfo.id);
  }, [sellerInfo?.id]);

  useEffect(() => {
    if (sellerInfo?.id) handleIncrementProfileViews(sellerInfo.id);
  }, [sellerInfo?.id]);

  const handleChatClick = () => {
    if (sellerInfo?.id) handleIncrementWhatsappClicks(sellerInfo.id);
  };

  if (sellerLoading || categoryLoading || imagesLoading) return <Spinner />;
  if (sellerError || categoryError || imagesError) return <NetworkError />;
  if (!sellerInfo || !category) return <p>Seller not found</p>;

  const whatsappNumber = sellerInfo.whatsapp_number.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hi ${sellerInfo?.business_name}, I found you on Haple and I'm interested in your products!`
  );
  return (
    <section className="min-h-screen space-y-5">
      
        <div 
          className={`p-5 relative h-45 mb-30 ${!sellerInfo.avatar_url ? 'bg-primary' : 'bg-cover bg-center'}`}
          style={sellerInfo.avatar_url ? { backgroundImage: `url(${sellerInfo.avatar_url})` } : {}}
        >
          {/* Dark overlay */}
          {sellerInfo.avatar_url && (
            <div className="absolute inset-0 bg-black opacity-40"></div>
          )}

          <div className="flex justify-between items-center relative z-10">
            <button
              onClick={() => navigate(`/explore/${category.catalog}/${category.slug}`)}
              className="flex items-center gap-2 cursor-pointer">
              <GoArrowLeft className="text-2xl text-stone-100" />
              <span className="text-stone-100">Back</span>
            </button>
          </div>

          {/* Seller Info */}
          <div className=" flex flex-col gap-3 items-center absolute -bottom-25 left-0 right-0 mx-auto">
            {/* Avatar */}
            <div className="bg-white w-25 h-25 flex justify-center items-center rounded-full shadow-lg inset-ring-3 inset-ring-primary-light overflow-hidden">
              {sellerInfo.avatar_url ? (
                <img src={sellerInfo.avatar_url} alt={sellerInfo.business_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-primary font-bold text-3xl">
                  {sellerInfo.business_name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

        <div className="flex justify-between items-center relative z-10">
          <button
            onClick={() => navigate("/explore")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <GoArrowLeft className="text-2xl text-stone-100" />
            <span className="text-stone-100">Back</span>
          </button>
        </div>

        {/* Seller Info */}
        <div className=" flex flex-col gap-3 items-center absolute -bottom-25 left-0 right-0 mx-auto">
          {/* Avatar */}
          <div className="bg-white w-25 h-25 flex justify-center items-center rounded-full shadow-lg inset-ring-3 inset-ring-primary-light overflow-hidden">
            {sellerInfo.avatar_url ? (
              <img
                src={sellerInfo.avatar_url}
                alt={sellerInfo.business_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-primary font-bold text-3xl">
                {sellerInfo.business_name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-medium">{sellerInfo.business_name}</h2>

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 place-items-center">
        {sellerImages.length === 0 ? (
          <p className="text-center w-full text-stone-500">
            No images available
          </p>
        ) : (
          sellerImages.map((prod) => (
            <div
              key={prod.id}
              className="relative w-40 rounded-lg overflow-hidden bg-stone-50"
            >
              <img
                src={prod.image_url}
                alt={prod.name}
                className="w-full h-35 object-cover"
              />
              <div className="p-2">
                <p className="text-stone-900 capitalize">
                  {prod.name}
                </p>
                <p className="text-stone-600">
                  {prod.caption}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contact Row */}
      <div className="p-5">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          onClick={handleChatClick}
        >
          <button className="bg-secondary-light w-full text-white py-3 text-base rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-secondary transition-all duration-300">
            <FaWhatsapp className="text-xl" />
            Chat on Whatsapp
          </button>
        </a>
      </div>
    </section>
  );
}
