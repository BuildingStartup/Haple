import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

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

  const onSubmit = (data) => {
    console.log("Final Seller Data:", data);
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
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-[#1A55E3]">Sign Up</h2>
          <p className="text-sm text-gray-600">
            Fill in your details to start reaching students
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="companyName" className="text-sm font-medium">
              Company Name
            </label>
            <input
              id="companyName"
              {...register("companyName", {
                required: "Company Name is Required",
              })}
              placeholder="Company Name"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#1A55E3]"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">
                {errors.companyName.message}
              </p>
            )}
          </div>

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
            {errors.description && <p>{errors.description.message}</p>}
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
              <span className="text-red-500 text-sm">
                {errors.categories.message}
              </span>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.(com)$/i,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#1A55E3]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="whatsapp" className="text-sm font-medium">
              WhatsApp Number
            </label>
            <input
              id="whatsapp"
              {...register("whatsapp", {
                required: "Number must be 11 digits",
                pattern: {
                  value: /^\d{11}$/,
                  message: "WhatsApp must be exactly 11 digits",
                },
              })}
              type="tel"
              placeholder="+234..."
              className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#1A55E3]"
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-sm">{errors.whatsapp.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[!@#$%^&*]).{8,}$/, // at least 8 chars, 1 symbol
                  message:
                    "Password must be at least 8 characters with at least 1 symbol",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#1A55E3]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

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
