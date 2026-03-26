import { FaImage } from "react-icons/fa";
import SpinnerMini from "./SpinnerMini";
import Modal from "./Modal";


export default function AddProductForm({
    showForm,
    selectedProducts,
    handleSelectImages,
    handleProductFieldChange,
    handleRemoveSelectedImage,
    errors,
    handleSubmit,
    handleCancel,
    loading,
    remaining,
    uploadProgress,
}){
    return (
        <>
        {showForm && (
                <form
                  className={`mx-5 bg-stone-50 rounded px-6 py-4 flex flex-col gap-5 transition-opacity duration-300 ${loading ? "opacity-85" : "opacity-100"}`}
                  aria-busy={loading}
                >                  
                  <span className="capitalize text-lg">New listing</span>                  
        
                  {/* Image upload selector */}
                  <div className={`flex flex-col gap-1 ${remaining === 0 ? "hidden" : ""}`}>
                    <label className="w-full h-32 rounded border-2 border-dashed border-stone-300 flex items-center justify-center cursor-pointer overflow-hidden bg-white">
                      <div className="flex flex-col items-center gap-2 text-stone-400 text-center px-3">
                        <FaImage className="text-lg" />
                        <span>
                          Select up to {remaining} more image{remaining !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <input
                        type="file"
                        name="image_url"
                        accept="image/*"
                        multiple
                        onChange={handleSelectImages}
                        className="hidden"
                        disabled={loading || remaining === 0}
                      />
                    </label>
                    {errors.image_url && (
                      <p className="text-xs text-red-500">{errors.image_url}</p>
                    )}
                  </div>
        
                  {/* Per-image metadata */}
                  <div className="space-y-3">
                    {selectedProducts.map((item, index) => (
                      <>
                      <div key={`${item.preview}-${index}`} className="bg-white p-3 rounded ring ring-stone-200 space-y-2">
                        <div className="flex items-start gap-3">

                          <img
                            src={item.preview}
                            alt={`Selected listing ${index + 1}`}
                            className=" object-cover rounded"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleProductFieldChange(index, "name", e.target.value)}
                            placeholder="What are you selling?"
                            className="p-3 ring ring-stone-200 rounded outline-none focus:ring-primary bg-white transition-all duration-300"
                            disabled={loading}
                          />
                          {errors.items?.[index]?.name && (
                            <p className="text-xs text-red-500">{errors.items[index].name}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <textarea
                            value={item.caption}
                            onChange={(e) => handleProductFieldChange(index, "caption", e.target.value)}
                            placeholder="Tell us more about it in 15 words..."
                            rows={2}
                            className="p-3 ring ring-stone-200 rounded outline-none focus:ring-primary bg-white transition-all duration-300 resize-none"
                            disabled={loading}
                          />
                          {errors.items?.[index]?.caption && (
                            <p className="text-xs text-red-500">{errors.items[index].caption}</p>
                          )}
                        </div>

                        {/* Upload progress bar */}
                        {loading && uploadProgress?.[index] !== undefined && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  uploadProgress[index] === 100 ? "bg-green-500" : "bg-primary"
                                }`}
                                style={{ width: `${uploadProgress[index]}%` }}
                              />
                            </div>
                            <span className="text-xs text-stone-600 w-10 text-right">
                              {uploadProgress[index]}%
                            </span>
                          </div>
                        )}

                        {/* work on delete loading spinner */}
                        <div className="flex gap-2">
                          <Modal.Open opens={`productPreview-${index}`}>
                            <button
                              type="button"
                              className="flex-4 p-3 bg-white rounded text-primary cursor-pointer flex items-center justify-center gap-2 shadow active:scale-95 transition-all capitalize disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>
                                Preview
                            </button>
                          </Modal.Open>
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedImage(index)}
                            className="flex-4 p-3 bg-stone-200 rounded text-stone-800 cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all capitalize disabled:cursor-not-allowed disabled:opacity-70">
                            Delete
                          </button>
                        </div>
                      </div>

                      <Modal.Preview name={`productPreview-${index}`} key={index}>
                          <img
                            src={item.preview}
                            alt={`Selected listing ${index + 1}`}
                            className=" object-cover rounded w-full"
                          />
                      </Modal.Preview>  
                    </>
                    ))}
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