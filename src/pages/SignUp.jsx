import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { VscError } from "react-icons/vsc";
import Fields from "../ui/Fields.jsx";
import SpinnerMini from "../ui/SpinnerMini.jsx";
import useSignUp from "../features/authentication/useSignUp.js";
import useCategories from "../features/categories/useCategories.js";

export default function SignUp() {
  const {loading, handleSignUp} = useSignUp();
  const {categories, getAllCategories} = useCategories();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "",
      categories: [],
    },
  });

  const currentMode = watch("mode");
  const selectedCategories = watch("categories") || [];
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getAllCategories();
  }, []);

  // Filter categories based on current mode
  const products = Array.isArray(categories) 
    ? categories.filter(cat => cat?.catalog === "products")
    : [];
  const services = Array.isArray(categories) 
    ? categories.filter(cat => cat?.catalog === "services")
    : [];

  // Get current category list based on mode
  const currentCategories = currentMode === "product" ? products : services;

  // Helper function to get category ID by name
  const getCategoryIdByName = (name) => {
    const category = currentCategories.find(cat => cat.name === name);
    return category?.id;
  };

  //add display name to sign up form and update supabase profile with it after sign up
  const onSubmit = (data) => {
    if(!data.email || !data.password) return;
    
    handleSignUp({
      email: data.email,
      password: data.password,
      profileData: {...data, categories: data.categories[0]}, // pass the form data with category as UUID
      onSuccess: () => {
        console.log("Sign up and profile creation successful!");
      },
      onError: (error) => {
        console.error("Sign up error:", error);
      }
    });
  };

  const handleToggle = (categoryName) => {
    const categoryId = getCategoryIdByName(categoryName);
    if (!categoryId) return;
    
    const next = selectedCategories.includes(categoryId) ? [] : [categoryId];
    setValue("categories", next);
  };
  

  const handleWhatsAppChange = (value) => {
    // Remove all non-digit characters except +
    let cleanedNumber = value.replace(/[^\d+]/g, "");
    
    // If it starts with 0, remove it
    if (cleanedNumber.startsWith("0")) {
      cleanedNumber = cleanedNumber.substring(1);
    }
    
    // If it doesn't start with +234, add it
    if (!cleanedNumber.startsWith("+234") && cleanedNumber.length > 0) {
      cleanedNumber = "+234" + cleanedNumber;
    }
    
    setValue("whatsapp", cleanedNumber);
  };

  return (
    // <div className="b-20">
      <div className="h-screen px-4 py-6 space-y-6 pb-20">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <GoArrowLeft className="text-2xl text-gray-600 cursor-pointer" />
          <span className="text-gray-600">Back</span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-medium text-primary">
            Create your Seller Profile
          </h2>
          <p className="text-gray-600">
            Fill in your details to start reaching students
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-10">
          {/* Business Name */}
          <Fields
            register={register}
            labelName="Business Name"
            forTag="businessName"
            errors={errors}
            errorMessage="Business Name is Required"
            placeholder="DesignByJoel"
            type="text"
          />
          {errors.description && (
            <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {errors.description.message}
            </p>
          )}        

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-gray-700 font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="What buyers will know about you"
              className="w-full px-3 py-3 ring ring-gray-300 rounded-lg resize-none outline-none focus:ring focus:ring-primary transition-all duration-200"
              rows={3}
            />
            {errors.description && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center gap-1">                  
                  <VscError />
                  <span>
                    {errors.description.message}
                  </span>
                </div>
            )}
          </div>

          {/* Category Multi Select */}
          {currentMode && (
            <div className="space-y-2">
              <input
                type="hidden"
                {...register("categories", {
                  validate: (val) =>
                    val.length > 0 || "Select at least one category",
                })}
              />
              <div className="flex flex-wrap gap-3 p-1">
                {currentCategories.map(
                  (category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleToggle(category.name)}
                      className={`text-center text-gray-400 rounded-xl ring ring-gray-300 px-6 py-1 transition-all cursor-pointer ${
                        selectedCategories.includes(category.id)
                          ? "bg-primary-lightest text-primary font-medium "
                          : "bg-white border-gray-200 text-gray-600"
                      }`}
                    >
                      {category.name}
                    </button>
                  )
                )}
              </div>
              {errors.categories && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center gap-1">                  
                  <VscError />
                  <span>
                    {errors.categories.message}
                  </span>
                </div>
              )}
            </div>
            )}
          

          {/* For email */}
          <Fields
            forTag="email"
            labelName="Email Address"
            validation={{
              value: /^[^\s@]+@[^\s@]+\.(com)$/i,
              message: "Enter a valid email",
            }}
            placeholder="joel@gmail.com"
            type="email"
            errorMessage="Email is required"
            errors={errors}
            register={register}
          />
          {/* Contact Info */}

          <Fields
            forTag="whatsapp"
            labelName="WhatsApp Number"
            validation={{
              value: /^\+234\d{10}$/,
              message: "Must be +234 followed by 10 digits (11 digits total)",
            }}
            placeholder="+234 (e.g., +2349012345678)"
            type="tel"
            errorMessage="Enter a valid WhatsApp number"
            errors={errors}
            register={register}
            onChange={(e) => handleWhatsAppChange(e.target.value)}
          />

          {/* PassWord */}

          <Fields
            forTag="password"
            labelName="Password"
            validation={{
              value: /^(?=.*[!@#$%^&*]).{8,}$/, // at least 8 chars, 1 symbol
              message:
                "Password must be at least 8 characters with at least 1 symbol",
            }}
            placeholder="********"
            type={showPassword ? "text" : "password"}
            errorMessage="Password is required"
            errors={errors}
            register={register}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary font-medium text-white rounded-lg py-3 mb-3 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={loading}
          >
            {loading && <SpinnerMini />}
            <span>Create Seller Account</span>
          </button>
      </form>
      </div>
  );
}
