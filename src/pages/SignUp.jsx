import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { VscError } from "react-icons/vsc";
import Fields from "../ui/Fields.jsx";
import SpinnerMini from "../ui/SpinnerMini.jsx";
import useSignUp from "../features/authentication/useSignUp.js";
import useCategories from "../features/categories/useCategories.js";
import FieldDescription from "../ui/FieldDescription.jsx";

export default function SignUp() {
  const { loading, handleSignUp } = useSignUp();
  const { categories, getAllCategories } = useCategories();

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
    ? categories.filter((cat) => cat?.catalog === "products")
    : [];
  const services = Array.isArray(categories)
    ? categories.filter((cat) => cat?.catalog === "services")
    : [];

  // Get current category list based on mode
  const currentCategories = currentMode === "product" ? products : services;

  // Helper function to get category ID by name
  const getCategoryIdByName = (name) => {
    const category = currentCategories.find((cat) => cat.name === name);
    return category?.id;
  };

  //add display name to sign up form and update supabase profile with it after sign up
  const onSubmit = (data) => {
    if (!data.email || !data.password) return;

    const whatsappDigits = (data.whatsapp || "").replace(/\D/g, "").slice(0, 10);

    handleSignUp({
      email: data.email,
      password: data.password,
      profileData: {
        ...data,
        whatsapp: `+234${whatsappDigits}`,
        categories: data.categories[0],
      }, // pass the form data with category as UUID
      onSuccess: () => {
        console.log("Sign up and profile creation successful!");
      },
      onError: (error) => {
        console.error("Sign up error:", error);
      },
    });
  };

  const handleToggle = (categoryName) => {
    const categoryId = getCategoryIdByName(categoryName);
    if (!categoryId) return;

    const next = selectedCategories.includes(categoryId) ? [] : [categoryId];
    setValue("categories", next);
  };

  const handleWhatsAppChange = (value) => {
    const cleanedNumber = value.replace(/\D/g, "").slice(0, 10);
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

        {/* Description */}
        <FieldDescription
          register={register}
          labelName="Description"
          forTag="description"
          errors={errors}
          errorMessage="Description is Required"
          placeholder="What buyers will know about you"
          type="text"
        />

        {/* Mode Toggle */}
        <div className="space-y-4">
          <label htmlFor="categories" className="text-gray-700 font-medium">
            Select Categories
          </label>
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => {
                setValue("mode", "product");
                setValue("categories", []);
              }}
              className={`flex-1 px-4 py-3 rounded-lg transition-all ring ring-gray-300 cursor-pointer ${
                currentMode === "product"
                  ? "bg-primary-lightest text-primary font-medium ring-2 ring-primary"
                  : "bg-white border-gray-300 text-gray-600"
              }`}
            >
              Products
            </button>

            <button
              type="button"
              onClick={() => {
                setValue("mode", "service");
                setValue("categories", []);
              }}
              className={`flex-1 px-4 py-3 rounded-lg transition-all ring ring-gray-300 cursor-pointer ${
                currentMode === "service"
                  ? "bg-primary-lightest text-primary font-medium ring-2 ring-primary"
                  : "bg-white border-gray-300 text-gray-600"
              }`}
            >
              Services
            </button>
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
                {currentCategories.map((category) => (
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
                ))}
              </div>
              {errors.categories && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center gap-1">
                  <VscError />
                  <span>{errors.categories.message}</span>
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
              value: /^\d{10}$/,
              message: "Enter 10 digits after +234",
            }}
            placeholder="9012345678"
            type="tel"
            errorMessage="Enter a valid WhatsApp number"
            errors={errors}
            register={register}
            prefix="+234"
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
        </div>
      </form>

      <p className="text-center text-gray-600"> 
        Already have an account? <Link to="/signIn" className="text-primary font-medium">Sign in</Link>
      </p>
    </div>
  );
}
