import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft, GoLink } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import AddProductForm from "../ui/AddProductForm";
import ViewProducts from "../ui/ViewProducts";
import AddProductButton from "../ui/AddProductButton";
import SellerContact from "../ui/SellerContact";
import Spinner from "../ui/Spinner";
import SellerInfo from "../ui/SellerInfo";
import useSeller from "../features/profiles/useSeller";
import useSellerCategory from "../features/categories/useSellerCategory";
import useSellerImages from "../features/profiles/useSellerImages";
import useSignOut from "../features/authentication/useSignOut";
import SpinnerMini from "../ui/SpinnerMini";

export default function MyProfile() {
  const { user } = useAuth();
  const { fetchSellerById, seller: sellerInfo, loading, error } = useSeller();
  const { fetchSellerCategory, loading: categoryLoading, error:categoryError, category} = useSellerCategory();
  const { handleUploadImage, handleDeleteImage, handleGetImages, images, loading: imageLoading, error: imageError } = useSellerImages();
  const { loading: signOutLoading, handleSignOut } = useSignOut();

  useEffect(() => {    
    if (user?.id) fetchSellerById(user.id);
  }, [user]);

  useEffect(() => {    
    if (sellerInfo?.category_id) fetchSellerCategory(sellerInfo.category_id);
  }, [sellerInfo?.category_id]);


  useEffect(() => {    
    if (sellerInfo?.id) handleGetImages(sellerInfo.id);
  }, [sellerInfo?.id]);


  // Products added by user
  const [newProduct, setNewProduct] = useState({
    name: "",
    image_url: null,
    caption: "",
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
    if (!newProduct.image_url) temp.image_url = "Listing image is required";
    if (!newProduct.caption)
      temp.caption = "Listing caption is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const submitProduct = () => {
    if (!validate()) return;

    const position = images.length + 1;
    
    handleUploadImage(newProduct.image_url, sellerInfo.id, position, newProduct.caption, newProduct.name);
    setNewProduct({ name: "", image_url: null, caption: "" });
    setPreview(null);
    setShowForm(false);
    setErrors({});    
  };

  const deleteProduct = (imageId) => {
    if (!imageId) return;
    handleDeleteImage(sellerInfo.id, imageId);    
  };

  const handleCancel = () => {
    setShowForm(false);
    setPreview(null);
  };

  const handleAddItem = () => {
    setShowForm(true);
    setPreview(null);
  };

  const handleLogout = () => {
    handleSignOut();
  }

  if (loading || categoryLoading || imageLoading) return <Spinner />;
  if (error || categoryError || imageError) return <p>Error: {error || categoryError || imageError}</p>;
  if (!sellerInfo) return <p>No seller data found</p>;

  
  const remaining = 3 - images.length;

  // Share and Copy
  // Share and copy
  const profileUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: sellerInfo.business_name,
        text: `Check out ${sellerInfo.business_name} on Haple!`,
        url: profileUrl,
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl).then(() => alert("Link copied!"));
  };

  // Share and Copy
  // Share and copy
  const profileUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: sellerInfo.business_name,
        text: `Check out ${sellerInfo.business_name} on Haple!`,
        url: profileUrl,
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl).then(() => alert("Link copied!"));
  };

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
                <Link to="edit">
                  <li className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer">Edit</li>
                </Link>
                <li className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer flex items-center gap-1 disabled:cursor-not-allowed disabled:text-stone-500" disabled={signOutLoading} onClick={handleLogout}>
                  {signOutLoading && <SpinnerMini /> }
                  <span className="text-red-500">Logout</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        

        {/* Seller Info */}
        <SellerInfo sellerInfo={sellerInfo} category={category} />
      </div>

      
      {/* Description */}
      <div className="px-5 pt-3 text-stone-700">{sellerInfo.description}</div>

      {/* actions */}
      <div className="flex gap-4 items-center justify-center p-5">
        <button
          onClick={handleShare}
          className="flex-4 flex flex-col gap-2 items-center justify-center py-2 px-6 ring ring-stone-100 rounded cursor-pointer"
        >
          <FaShare className="text-xl text-secondary" />
          <span className="text-secondary">Share</span>
        </button>
        <button
          onClick={handleCopyLink}
          className="flex-4 flex flex-col gap-2 items-center justify-center py-2 px-6 ring ring-stone-200 rounded cursor-pointer"
        >
          <GoLink className="text-xl text-primary" />
          <span className="text-primary">Copy Link</span>
        </button>
      </div>

      
      {/* Catalog Text */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-stone-200" />
        <h3 className="text-stone-400 tracking-widest">Catalog</h3>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* How it looks like when added */}
      <ViewProducts products={images} handleDelete={(imageId) => deleteProduct(imageId)} />

      <AddProductButton
        products={images}
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
