import { MdDelete } from "react-icons/md";

export default function ViewProducts({products, handleDelete}){
    return (
        <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 place-items-center">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="relative w-40 rounded-lg overflow-hidden bg-stone-50"
                  >
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 transition cursor-pointer"
                    >
                      <MdDelete className="text-red-500" />
                    </button>
        
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      className="w-full h-35 object-cover"
                    />
                    <div className="p-2">
                      <p className="text-stone-900 capitalize">
                        {prod.name}
                      </p>
                      <p className="text-stone-600">
                        {prod.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
        </>
    )
}