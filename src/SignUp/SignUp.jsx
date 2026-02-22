import { useForm } from "react-hook-form";
import Fields from "./Fields.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "product",
      categories: [],
    },
  });

  const currentMode = watch("mode");
  const selectedCategories = watch("categories") || [];
  const [showPassword, setShowPassword] = useState(false);

  const products = [
    "Food",
    "Clothes",
    "Shoes",
    "Accessories",
    "Crotchet",
    "Perfumes",
    "Gift Packages",
    "Skincare",
  ];

  const services = [
    "Make-up",
    "Nail Tech",
    "Photographing",
    "Graphic design",
    "Web design",
  ];
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("Final Seller Data:", data);
    navigate("/SellersProfile");
  };

  const handleToggle = (cat) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];

    setValue("categories", next);
  };

  return (
    <section className="min-h-screen bg-[#F1F5F9] flex justify-center">
      <div className="w-full bg-white min-h-screen px-4 py-8 space-y-6">
        <button
          style={{
            background: "#F1F5F9",
            border: "none",
            borderRadius: "10px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#374151",
          }}
        >
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </button>
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-[#1A55E3]">Sign Up</h2>
          <p className="text-sm text-gray-600">
            Fill in your details to start reaching students
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Name */}
          <Fields
            register={register}
            labelName="Company Name"
            forTag="companyName"
            errors={errors}
            errorMessage="Company Name is Required"
            placeholder="Haple"
            type="text"
          />

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="What buyers will know about you"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg resize-none outline-none focus:ring-1 focus:ring-[#1A55E3]"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-[13px]">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Mode Toggle */}
          <p className="text-sm font-medium">Select Categories</p>
          <div className="flex justify-center gap-8">
            <input
              type="hidden"
              {...register("categories", {
                validate: (val) =>
                  val.length > 0 || "Select at least one category",
              })}
            />
            <label className="flex items-center gap-2 font-semibold text-sm">
              <input
                {...register("mode")}
                type="radio"
                value="product"
                onChange={() => {
                  setValue("mode", "product");
                  setValue("categories", []);
                }}
                className="w-4 h-4 accent-[#1A55E3]"
              />
              Products
            </label>

            <label className="flex items-center gap-2 font-semibold text-sm">
              <input
                {...register("mode")}
                type="radio"
                value="service"
                onChange={() => {
                  setValue("mode", "service");
                  setValue("categories", []);
                }}
                className="w-4 h-4 accent-[#1A55E3]"
              />
              Services
            </label>
          </div>

          {/* Category Multi Select */}
          <div className="space-y-2">
            <div className="flex overflow-x-auto gap-3 no-scrollbar pb-2">
              {(currentMode === "product" ? products : services).map(
                (service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleToggle(service)}
                    className={`flex-shrink-0 min-w-24 h-20 px-3 flex items-center justify-center text-center rounded-xl border-2 text-xs font-bold uppercase transition-all ${
                      selectedCategories.includes(service)
                        ? "bg-[#1A55E3] border-[#1A55E3] text-white"
                        : "bg-white border-gray-200 text-gray-600"
                    }`}
                  >
                    {service}
                  </button>
                )
              )}
            </div>
            {errors.categories && (
              <span className="text-red-500 text-[13px]">
                {errors.categories.message}
              </span>
            )}
          </div>

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
              value: /^\d{11}$/,
              message: "WhatsApp must be exactly 11 digits",
            }}
            placeholder="+234"
            type="tel"
            errorMessage="Number must be 11 digits"
            errors={errors}
            register={register}
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
            placeholder="Joel25@#"
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
            className="w-full bg-[#1A55E3] py-4 text-white font-bold uppercase tracking-widest rounded-lg active:scale-95 transition-transform"
          >
            Launch My Shop
          </button>
        </form>
      </div>
    </section>
  );
}
