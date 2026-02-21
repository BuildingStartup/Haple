import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Fields({
  labelName,
  forTag,
  errorMessage,
  placeholder,
  register,
  errors,
  type,
  validation,
  showPassword,
  setShowPassword,
}) {
  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={forTag} className="text-sm font-medium">
        {labelName}
      </label>
      <input
        id={forTag}
        type={type}
        {...register(forTag, {
          required: errorMessage,
          pattern: validation,
        })}
        placeholder={placeholder}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#1A55E3]"
      />
      {errors[forTag] && (
        <p className="text-red-500 text-[13px]">{errors[forTag].message}</p>
      )}
      {forTag === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-11 text-gray-400"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
}
