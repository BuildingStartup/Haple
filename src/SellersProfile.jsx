import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SellersProfile() {
  // Original seller info (static, read-only)
  const sellerInfo = {
    companyName: "Chunkz",
    description:
      "GitHub users are now required to enable two-factor authentication as an additional security measure. Your activity on GitHub includes you in this requirement. You will need to enable two-factor authentication on your account before April 07, 2026, or be restricted from account actions.",
    whatsapp: "+2348135503380",
    email: "jayzeeohiozoje@gmail.com",
    categories: ["Food", "Clothes"],
    mode: "product",
  };

  // Products added by user
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: null,
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewProduct((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitProduct = () => {
    if (!newProduct.name || !newProduct.image || !newProduct.description) {
      alert("All fields are required");
      return;
    }
    if (products.length >= 3) {
      alert("You can only add up to 3 products");
      return;
    }

    setProducts((prev) => [
      ...prev,
      { ...newProduct, image: URL.createObjectURL(newProduct.image) },
    ]);
    setNewProduct({ name: "", image: null, description: "" });
    setShowForm(false);
  };
  const initials = sellerInfo.companyName.slice(0, 2).toUpperCase();

  return (
    <section className="min-h-screen px-2 pb-5 bg-white">
      {/* Seller Info */}
      <div className="pt-3 px-1 space-y-3">
        {/* Avatar */}
        <div
          className="w-18 h-18 bg-white flex justify-center items-center rounded-2xl"
          style={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          <span className="text-[#1A55E3] font-black text-2xl">{initials}</span>
        </div>

        <h2 className="text-black text-2xl font-black">
          {sellerInfo.companyName}
        </h2>
        <div className="flex gap-2 flex-wrap">
          {sellerInfo.categories.map((category, id) => (
            <span
              key={id}
              className="bg-gray-300 text-sm font-bold text-black rounded-3xl py-1 px-3"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="text-sm text-slate-600 text-justify pt-4 leading-relaxed">
        {sellerInfo.description}
      </div>
      {/* Contact Row */}
      <div className="flex gap-4 flex-wrap my-6">
        <div className="flex items-center gap-1 p-3 max-w-75">
          <div className="text-[#25D366] text-lg">
            <FaWhatsapp />
          </div>
          <div>
            <p className="text-xs text-slate-400">{sellerInfo.whatsapp}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 p-3 max-w-75">
          <div className="text-[#1A55E3] text-lg">
            <MdEmail />
          </div>
          <div>
            <p className="text-xs text-slate-400">{sellerInfo.email}</p>
          </div>
        </div>
      </div>
      {/* Catalog Text */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-slate-400" />
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Your Catalog
        </h3>
        <div className="flex-1 h-px bg-slate-400" />
      </div>

      {/* How it looks like when added */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {products.map((prod, i) => (
          <div
            key={i}
            className="w-60 rounded-2xl overflow-hidden bg-slate-50 border-[1.5px] border-slate-200 shadow-sm pb-2"
          >
            <img
              src={prod.image}
              alt={prod.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <p className="m-0 text-base font-black text-slate-900 uppercase">
                {prod.name}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed text-justify">
                {prod.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Button */}
      {products.length === 0 && !showForm && (
        <p className="text-sm text-slate-600 text-justify pb-3 leading-normal">
          Buyers need to see what you sell, click the button below to add your 3
          main things you provide to them
        </p>
      )}
      {products.length < 3 && !showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setPreview(null);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Item ({products.length}/3)
        </button>
      )}

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-slate-50 rounded-2xl border-[1.5px] border-slate-200 p-4 flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-black text-slate-900">
              NEW LISTING
            </span>
            <button
              onClick={() => {
                setShowForm(false);
                setPreview(null);
              }}
              className="bg-slate-200 border-none rounded-lg w-7 h-7 flex items-center justify-center cursor-pointer text-slate-500 active:scale-90"
            >
              {/* <XIcon /> */}
            </button>
          </div>

          {/* Image upload preview */}
          <label className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer overflow-hidden bg-white hover:border-blue-400 transition-colors">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-slate-400">
                {/* <ImageIcon /> */}
                <span className="text-[12px] font-bold">
                  Upload Product Photo
                </span>
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {/* Inputs */}
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="What are you selling?"
              className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#1A55E3] bg-white transition-colors"
            />

            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Tell us more about it..."
              rows={2}
              className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-xl text-[14px] outline-none resize-none focus:border-[#1A55E3] bg-white transition-colors"
            />
          </div>

          <div className="flex gap-2 mt-1">
            <button
              onClick={submitProduct}
              className="flex-[2] p-3.5 bg-[#1A55E3] border-none rounded-xl text-white font-black text-[13px] cursor-pointer shadow-md active:scale-95 transition-all"
            >
              SAVE LISTING
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setPreview(null);
              }}
              className="flex-1 p-3.5 bg-slate-200 border-none rounded-xl text-slate-600 font-bold text-[13px] cursor-pointer active:scale-95 transition-all"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
