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
      <label htmlFor={forTag} className="text-gray-700 font-medium">
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
        className="w-full px-3 py-3 ring ring-gray-300 rounded-lg outline-none focus:ring focus:ring-primary transition-all duration-200"
      />
      {errors[forTag] && (
        <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{errors[forTag].message}</p>
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
