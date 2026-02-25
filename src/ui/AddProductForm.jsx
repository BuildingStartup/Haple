import { FaImage } from "react-icons/fa";


export default function AddProductForm({showForm, preview, handleChange, errors, newProduct, handleSubmit, handleCancel}){
    return (
        <>
        {showForm && (
                <form className="mx-5 bg-stone-50 rounded px-6 py-4 flex flex-col gap-3">                  
                  <span className="capitalize text-lg">New listing</span>                  
        
                  {/* Image upload preview */}
                  <div className="flex flex-col gap-1">
                    <label className="w-full h-48 rounded border-2 border-dashed border-stone-300 flex items-center justify-center cursor-pointer overflow-hidden bg-white">
                        {preview ? (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-stone-400">
                            <FaImage className="text-lg" />
                            <span>Upload listing photo</span>
                        </div>
                        )}
                        <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        />
                    </label>
                    {errors.image && (
                        <p className="text-xs text-red-500">{errors.image}</p>
                        )}
                    </div>
        
                  {/* Inputs */}
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                        <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        placeholder="What are you selling?"
                        className="p-3 ring ring-stone-200 rounded outline-none focus:ring-primary bg-white transition-all duration-300"
                        />
                        {errors.name && (
                        <p className="text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleChange}
                        placeholder="Tell us more about it..."
                        rows={2}
                        className="p-3 ring ring-stone-200 rounded outline-none focus:ring-primary bg-white transition-all duration-300"
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500">{errors.description}</p>
                        )}
                    </div>    
                  </div>
        
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmit}
                      className="flex-4 p-3 bg-primary rounded text-white cursor-pointer shadow active:scale-95 transition-all capitalize">
                      save 
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-4 p-3 bg-stone-200 rounded text-stone-800 cursor-pointer active:scale-95 transition-all capitalize">
                      cancel
                    </button>
                  </div>
                </form>
              )}
        </>
    )
}