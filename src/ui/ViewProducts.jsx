import { MdDelete } from "react-icons/md";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";

export default function ViewProducts({products, handleDelete, isDeleting}){
    const [loadedImages, setLoadedImages] = useState({});
    const [deletingProductId, setDeletingProductId] = useState(null);

    const handleImageLoad = (id) => {
      setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const handleDeleteClick = async (id) => {
      setDeletingProductId(id);
      try {
        await handleDelete(id);
      } finally {
        setDeletingProductId(null);
      }
    };

    return (
        <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 place-items-center">
                {products.map((prod) => {
                  const isProductDeleting = isDeleting && deletingProductId === prod.id;

                  return (
                  <div
                    key={prod.id}
                    className="relative w-40 rounded-lg overflow-hidden bg-stone-50"
                  >
                    <button
                      onClick={() => handleDeleteClick(prod.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 transition cursor-pointer z-10"
                      disabled={isDeleting}
                    >
                      <MdDelete className="text-red-500" />
                    </button>

                    <div className="relative">
                      <img
                        src={prod.image_url}
                        alt={prod.name}
                        className={`w-full h-35 object-cover transition-all duration-500 ${
                          loadedImages[prod.id] ? 'blur-0' : 'blur-md'
                        } ${isProductDeleting ? 'blur-md' : ''}`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(prod.id)}
                      />

                      {isProductDeleting && (
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center pointer-events-none">
                          <SpinnerMini />
                        </div>
                      )}
                    </div>

                    <div className="p-2">
                      <p className="text-stone-900 capitalize">
                        {prod.name}
                      </p>
                      <p className="text-stone-600">
                        {prod.caption}
                      </p>
                    </div>
                  </div>
                  );
                })}
              </div>
        </>
    )
}