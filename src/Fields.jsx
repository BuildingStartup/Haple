export default function Fields({
  labelName,
  errorMessage,
  placeholder,
  register,
  errors,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={labelName.toLowerCase()} className="text-sm font-medium">
        {labelName}
      </label>
      <input
        id={labelName.toLowerCase()}
        {...register(labelName.toLowerCase(), {
          required: { errorMessage },
        })}
        placeholder={placeholder}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#1A55E3]"
      />
      {errors.companyName && (
        <p className="text-red-500 text-sm">{errors.companyName.message}</p>
      )}
    </div>
  );
}
