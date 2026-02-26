import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft, GoLink } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import useSeller from "../features/profiles/useSeller";
import AddProductForm from "../ui/AddProductForm";
import ViewProducts from "../ui/ViewProducts";
import AddProductButton from "../ui/AddProductButton";
import SellerContact from "../ui/SellerContact";
import Spinner from "../ui/Spinner";
import useSellerCategory from "../features/categories/useSellerCategory";

export default function SellersProfile() {
  const { user } = useAuth();
  const { fetchSeller, seller: sellerInfo, loading, error } = useSeller();
  const {
    fetchSellerCategory,
    loading: categoryLoading,
    error: categoryError,
    category,
  } = useSellerCategory();

  useEffect(() => {
    if (user?.id) fetchSeller(user.id);
  }, [user]);

  useEffect(() => {
    if (sellerInfo?.category_id) fetchSellerCategory(sellerInfo.category_id);
  }, [sellerInfo]);

  // Products added by user
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: null,
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
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
    if (!newProduct.name) temp.name = "Listing name is required";
    if (!newProduct.image) temp.image = "Listing image is required";
    if (!newProduct.description)
      temp.description = "Listing description is required";

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
  const handleCancel = () => {
    setShowForm(false);
    setPreview(null);
  };

  const handleAddItem = () => {
    setShowForm(true);
    setPreview(null);
  };

  if (loading || categoryLoading) return <Spinner />;
  if (error || categoryError) return <p>Error: {error || categoryError}</p>;
  if (!sellerInfo) return <p>No seller data found</p>;

  const initials = sellerInfo.business_name.slice(0, 2).toUpperCase();
  const remaining = 3 - products.length;

  return (
    <section className="h-screen space-y-3">
      <div className="bg-primary p-5 relative h-45 mb-30">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <GoArrowLeft className="text-2xl text-stone-100 cursor-pointer" />
            <span className="text-stone-100">Back</span>
          </Link>
          <div className="relative">
            <BsThreeDotsVertical
              className="text-lg text-stone-100 cursor-pointer"
              onClick={() => setOpenOptions((value) => !value)}
            />
            {openOptions && (
              <ul className="bg-white py-2 space-y-2 w-40 rounded-lg absolute top-7 -right-2 z-10 shadow">
                <li className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer">
                  Share
                </li>
                <li className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer">
                  Edit
                </li>
                <li className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer">
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Seller Info */}
        <div className=" flex flex-col gap-3 items-center absolute -bottom-25 left-0 right-0 mx-auto">
          {/* Avatar */}
          <div className="bg-white w-25 h-25 flex justify-center items-center rounded-full shadow-lg inset-ring-3 inset-ring-primary-light">
            <span className="text-primary font-bold text-3xl">{initials}</span>
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
      <div className="px-5 pt-3 text-stone-700">{sellerInfo.description}</div>

      {/* actions */}
      <div className="flex gap-4 items-center justify-center p-5">
        <div className="flex-4 flex flex-col gap-2 items-center justify-center py-2 px-6 ring ring-stone-100 rounded cursor-pointer">
          <FaShare className="text-xl text-secondary" />
          <span className="text-secondary">Share</span>
        </div>
        <div className="flex-4 flex flex-col gap-2 items-center justify-center py-2 px-6 ring ring-stone-200 rounded cursor-pointer">
          <GoLink className="text-xl text-primary" />
          <span className="text-primary">Copy Link</span>
        </div>
      </div>

      {/* Catalog Text */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-stone-200" />
        <h3 className="text-stone-400 tracking-widest">Catalog</h3>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* How it looks like when added */}
      <ViewProducts products={products} handleDelete={deleteProduct} />

      <AddProductButton
        products={products}
        handleAddItem={handleAddItem}
        showForm={showForm}
        remaining={remaining}
      />

      {/* Add Product Form */}
      <AddProductForm
        showForm={showForm}
        handleSubmit={submitProduct}
        preview={preview}
        errors={errors}
        handleCancel={handleCancel}
        newProduct={newProduct}
        handleChange={handleChange}
      />

      {/* Contact Row */}
      <SellerContact sellerInfo={sellerInfo} category={category} />
    </section>
  );
}
