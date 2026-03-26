import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { GoArrowLeft, GoLink } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPen } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import AddProductForm from "../ui/AddProductForm";
import ViewProducts from "../ui/ViewProducts";
import AddProductButton from "../ui/AddProductButton";
import SellerContact from "../ui/SellerContact";
import Spinner from "../ui/Spinner";
import SellerInfo from "../ui/SellerInfo";
import NetworkError from "../ui/NetworkError";
import ProfileOptions from "../ui/ProfileOptions";
import useSeller from "../features/profiles/useSeller";
import useSellerCategory from "../features/categories/useSellerCategory";
import useSellerImages from "../features/profiles/useSellerImages";
import useSignOut from "../features/authentication/useSignOut";

export default function MyProfile() {
  const { user } = useAuth();
  const { fetchSellerById, seller: sellerInfo, loading, error } = useSeller();
  const {
    fetchSellerCategory,
    loading: categoryLoading,
    error: categoryError,
    category,
  } = useSellerCategory();
  const {
      isUploading,
      isDeleting,
      handleUploadImage,
      handleGetImages,
      handleDeleteImage,
      images,
      loading: imageLoading,
      error: imageError,
  } = useSellerImages();
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

  // Products selected for upload (max 4 in total catalog)
  const [newProducts, setNewProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const selectedProductsRef = useRef([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const isProductUploadBusy = isSubmittingProduct || isUploading;

  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const MAX_FILE_SIZE = 11 * 1024 * 1024;
    const remainingSlots = Math.max(0, 4 - images.length - newProducts.length);
    const selectedFiles = files.slice(0, remainingSlots);

    const validItems = [];
    let hasLargeFile = false;

    selectedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        hasLargeFile = true;
        return;
      }

      validItems.push({
        file,
        preview: URL.createObjectURL(file),
        name: "",
        caption: "",
      });
    });

    setNewProducts((prev) => [...prev, ...validItems]);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.items;
      if (hasLargeFile) {
        next.image_url = "Some files were skipped because they exceed 11MB.";
      } else {
        delete next.image_url;
      }
      return next;
    });

    // Allow selecting the same file again after removing it.
    e.target.value = "";
  };

  const handleProductFieldChange = (index, field, value) => {
    if (field === "caption") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > 15 && value !== "") return;
    }

    setNewProducts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );

    setErrors((prev) => {
      const next = { ...prev };
      if (next.items?.[index]?.[field]) {
        next.items = { ...next.items, [index]: { ...next.items[index], [field]: undefined } };
      }
      return next;
    });
  };

  const handleRemoveSelectedImage = (index) => {
    setNewProducts((prev) => {
      const removedItem = prev[index];
      if (removedItem?.preview) URL.revokeObjectURL(removedItem.preview);
      return prev.filter((_, i) => i !== index);
    });

    setErrors((prev) => {
      const next = { ...prev };
      if (next.items) {
        const rebuilt = {};
        Object.entries(next.items).forEach(([key, value]) => {
          const currentIndex = Number(key);
          if (currentIndex < index) rebuilt[currentIndex] = value;
          if (currentIndex > index) rebuilt[currentIndex - 1] = value;
        });
        next.items = rebuilt;
      }
      return next;
    });
  };

  // keeps latest selected items
  useEffect(() => {
    selectedProductsRef.current = newProducts;
  }, [newProducts]);

  // revokes object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedProductsRef.current.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
    };
  }, []);

  const validate = () => {
    let temp = {};
    if (!newProducts.length) {
      temp.image_url = "Select at least one image";
    }

    const itemErrors = {};
    newProducts.forEach((item, index) => {
      const perItemErrors = {};
      if (!item.name.trim()) perItemErrors.name = "Listing name is required";
      if (!item.caption.trim()) perItemErrors.caption = "Listing description is required";

      if (Object.keys(perItemErrors).length) {
        itemErrors[index] = perItemErrors;
      }
    });

    if (Object.keys(itemErrors).length) {
      temp.items = itemErrors;
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1600,
      initialQuality: 0.9,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch(error){
      console.error("Image compression error:", error);
      return file; //fallback
    }
  }

  const submitProduct = async () => {
    if (isProductUploadBusy) return;
    if (!validate()) return;

    setIsSubmittingProduct(true);
    setUploadProgress(new Array(newProducts.length).fill(0));
    try {
      const uploadItems = await Promise.all(
        newProducts.map(async (item, index) => ({
          imageFile: await compressImage(item.file),
          position: images.length + index + 1,
          name: item.name.trim(),
          caption: item.caption.trim(),
        }))
      );

      await handleUploadImage(uploadItems, sellerInfo.id, (itemIndex, progress) => {
        setUploadProgress((prev) => {
          const updated = [...prev];
          updated[itemIndex] = progress;
          return updated;
        });
      });

      newProducts.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
      setNewProducts([]);
      setShowForm(false);
      setErrors({});
      setUploadProgress([]);
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const deleteProduct = (imageId) => {
    if (!imageId) return;
    handleDeleteImage(sellerInfo.id, imageId);
  };

  const handleCancel = () => {
    newProducts.forEach((item) => {
      if (item.preview) URL.revokeObjectURL(item.preview);
    });
    setNewProducts([]);
    setErrors({});
    setShowForm(false);
  };

  const handleAddItem = () => {
    setShowForm(true);
  };

  const handleLogout = () => {
    handleSignOut();
  };

  if (loading || categoryLoading || imageLoading || isDeleting) return <Spinner />;
  if (error || categoryError || imageError) return <NetworkError />;
  if (!sellerInfo) return <p>No seller data found</p>;

  const remaining = 4 - images.length;

  // Share and Copy
  const profilePath = `/seller/${sellerInfo?.username}`;
  const profileUrl = `${window.location.origin}${profilePath}`;
  // e.g. http://localhost:5173/seller/john
  // or https://yourdomain.com/seller/john in production

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
      <div
        className={`p-5 relative h-45 mb-30 ${
          !sellerInfo.avatar_url ? "bg-primary" : "bg-cover bg-center"
        }`}
        style={
          sellerInfo.avatar_url
            ? { backgroundImage: `url(${sellerInfo.avatar_url})` }
            : {}
        }
      >
        {/* Dark overlay */}
        {sellerInfo.avatar_url && (
          <div className="absolute inset-0 bg-black opacity-50 rounded-t"></div>
        )}

        <div className="flex justify-between items-center relative z-10">
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
              <ProfileOptions
                handleShare={handleShare}
                handleLogout={handleLogout}
                handleCopyLink={handleCopyLink}
                signOutLoading={signOutLoading}
                onClose={() => setOpenOptions(false)}
              />
            )}
          </div>
        </div>

        {/* Seller Info */}
        <div className="z-10">
          <SellerInfo sellerInfo={sellerInfo} category={category} />
        </div>
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

        <Link to="edit" 
          className="flex-4 flex flex-col gap-2 items-center justify-center py-2 px-6 ring ring-stone-200 rounded cursor-pointer"
        >
          <FaPen className="text-xl text-primary" />
          <span className="text-primary">Edit</span>
        </Link>
      </div>

      {/* Catalog Text */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-stone-200" />
        <h3 className="text-stone-400 tracking-widest">Catalog</h3>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* How it looks like when added */}
      <ViewProducts
        products={images}
        handleDelete={(imageId) => deleteProduct(imageId)}
      />

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
        selectedProducts={newProducts}
        errors={errors}
        handleCancel={handleCancel}
        handleSelectImages={handleSelectImages}
        handleProductFieldChange={handleProductFieldChange}
        handleRemoveSelectedImage={handleRemoveSelectedImage}
        remaining={Math.max(0, 4 - images.length - newProducts.length)}
        loading={isProductUploadBusy}
        uploadProgress={uploadProgress}
      />

      {/* Contact Row */}
      <SellerContact sellerInfo={sellerInfo} category={category} />
    </section>
  );
}
