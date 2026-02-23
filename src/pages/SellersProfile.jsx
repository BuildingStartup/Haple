import { useState, useEffect } from "react";
import { FaWhatsapp, FaImage } from "react-icons/fa";
import { MdEmail, MdDelete } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";

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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (!files[0]) return; // ← user opened picker and cancelled, do nothing
      const file = files[0];
      setNewProduct((prev) => ({ ...prev, [name]: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const validate = () => {
    let temp = {};
    if (!newProduct.name) temp.name = "Product name is required";
    if (!newProduct.image) temp.image = "Product image is required";
    if (!newProduct.description)
      temp.description = "Product description is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const submitProduct = () => {
    if (!validate()) return;

    const imageUrl = URL.createObjectURL(newProduct.image);

    setProducts((prev) => [...prev, { ...newProduct, image: imageUrl }]);
    setNewProduct({ name: "", image: null, description: "" });
    setPreview(null);
    setShowForm(false);
    setErrors({});
  };

  const deleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const initials = sellerInfo.companyName.slice(0, 2).toUpperCase();
  const remaining = 3 - products.length;

  return (
    <section className="min-h-screen px-4 pb-5 bg-white">
      <Link
        to="/signUp"
        className="flex items-center gap-2 cursor-pointer py-5"
      >
        <GoArrowLeft className="text-2xl text-gray-600 cursor-pointer" />
        <span className="text-gray-600">Back</span>
      </Link>
      {/* Seller Info */}
      <div className="pt-3 px-1 space-y-3 flex flex-col items-center">
        {/* Avatar */}
        <div
          className="w-20 h-20 bg-white flex justify-center items-center rounded-2xl"
          style={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          <span className="text-primary font-black text-2xl">{initials}</span>
        </div>

        <h2 className="text-black text-2xl font-black">
          {sellerInfo.companyName}
        </h2>
        <div className="flex gap-2 flex-wrap">
          {sellerInfo.categories.map((category, id) => (
            <span
              key={id}
              className="bg-gray-100 font-bold text-black rounded-3xl py-1 px-3"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="text-slate-600 text-justify pt-4 leading-loose">
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
          <div className="text-primary text-lg">
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
        <h3 className="font-bold text-slate-400 uppercase tracking-widest">
          Your Catalog
        </h3>
        <div className="flex-1 h-px bg-slate-400" />
      </div>

      {/* How it looks like when added */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {products.map((prod, i) => (
          <div
            key={i}
            className="relative w-72 rounded-2xl overflow-hidden bg-slate-50 border-[1.5px] border-slate-200 shadow-sm"
          >
            <button
              onClick={() => deleteProduct(i)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 transition"
            >
              <MdDelete className="text-red-500 text-sm" />
            </button>

            <img
              src={prod.image}
              alt={prod.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 pb-4">
              <p className="text-base font-black text-slate-900 uppercase">
                {prod.name}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed text-justify">
                {prod.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {products.length < 3 && !showForm && (
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-slate-400">
            You can add{" "}
            <span className="font-bold text-primary">{remaining}</span> more
            item{remaining !== 1 ? "s" : ""}
          </p>
          <button
            onClick={() => {
              setShowForm(true);
              setPreview(null);
            }}
            className="bg-primary text-white px-3 py-3 rounded-xl"
          >
            Add Item ({products.length}/3)
          </button>
        </div>
      )}

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-slate-50 rounded-2xl border-[1.5px] border-slate-200 p-4 flex flex-col gap-3">
          <div>
            <span className="font-black text-slate-900">NEW LISTING</span>
          </div>

          {/* Image upload preview */}
          <label className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer overflow-hidden bg-white">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-slate-400">
                <FaImage />
                <span className=" font-bold">Upload Product Photo</span>
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
          {errors.image && (
            <p className="text-xs text-red-500">{errors.image}</p>
          )}

          {/* Inputs */}
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="What are you selling?"
              className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-[#1A55E3] bg-white transition-colors"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}

            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Tell us more about it..."
              rows={2}
              className="w-full p-3.5 border-[1.5px] border-slate-200 rounded-xl outline-none resize-none focus:border-[#1A55E3] bg-white transition-colors"
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex gap-2 mt-1">
            <button
              onClick={submitProduct}
              className="flex-2 p-3.5 bg-primary border-none rounded-xl text-white font-black text-xs cursor-pointer shadow-md active:scale-95 transition-all"
            >
              SAVE LISTING
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setPreview(null);
              }}
              className="flex-1 p-3.5 bg-slate-200 border-none rounded-xl text-slate-600 font-bold text-xs cursor-pointer active:scale-95 transition-all"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
      <div className="w-full bg-[#10B981] rounded-xl p-3.5 text-center text-white cursor-pointer">
        Share Your Profile
      </div>
    </section>
  );
}
