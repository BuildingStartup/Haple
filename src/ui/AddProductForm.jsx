import { FaImage } from "react-icons/fa";
import SpinnerMini from "./SpinnerMini";


export default function AddProductForm({showForm, preview, handleChange, errors, newProduct, handleSubmit, handleCancel, loading}){
    return (
        <>
        {showForm && (
                <form
                  className={`mx-5 bg-stone-50 rounded px-6 py-4 flex flex-col gap-3 transition-opacity duration-300 ${loading ? "opacity-85" : "opacity-100"}`}
                  aria-busy={loading}
                >                  
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
                        name="image_url"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        disabled={loading}
                        />
                    </label>
                    {errors.image_url && (
                        <p className="text-xs text-red-500">{errors.image_url}</p>
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
                        disabled={loading}
                        />
                        {errors.name && (
                        <p className="text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <textarea
                        name="caption"
                        value={newProduct.caption}
                        onChange={(e) => {
                            const wordCount = e.target.value.trim().split(/\s+/).filter(Boolean).length;
                            if (wordCount <= 15 || e.target.value === '') {
                                handleChange(e);
                            }
                        }}
                        placeholder="Tell us more about it in 15 words..."
                        rows={2}
                        className="p-3 ring ring-stone-200 rounded outline-none focus:ring-primary bg-white transition-all duration-300"
                        disabled={loading}
                        />
                        {errors.caption && (
                            <p className="text-xs text-red-500">{errors.caption}</p>
                        )}
                    </div>    
                  </div>
        
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-4 p-3 bg-primary rounded text-white cursor-pointer flex items-center justify-center gap-2 shadow active:scale-95 transition-all capitalize disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>
                        {loading && <SpinnerMini />}
                        {loading ? "saving product..." : "save product"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-4 p-3 bg-stone-200 rounded text-stone-800 cursor-pointer active:scale-95 transition-all capitalize disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={loading}>
                      cancel
                    </button>
                  </div>
                </form>
              )}
        </>
    )
}