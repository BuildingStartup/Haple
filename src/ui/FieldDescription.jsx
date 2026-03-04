export default function FieldDescription({
    labelName,
    forTag,
    errorMessage,
    placeholder,
    register,
    errors,
    type,
}){

    const countWords = (text = "") => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };


    return (
        <div className="flex flex-col gap-2">
                  <label htmlFor={forTag} className="text-gray-700 font-medium">
                    {labelName}
                  </label>
                  <textarea
                    id={forTag}
                    type={type}
                    {...register(forTag, {
                      required: errorMessage,
                      validate: (value) =>
                        countWords(value) <= 200 || "Description must be 200 words or less",
                    })}
                    placeholder={placeholder}
                    className="w-full px-3 py-3 ring ring-gray-300 rounded-lg resize-none outline-none focus:ring focus:ring-primary transition-all duration-200"
                    rows={3}
                  />
                  {errors[forTag] && (
                    <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center gap-1">
                      <VscError />
                      <span>{errors[forTag].message}</span>
                    </div>
                  )}
                </div>
    )
}