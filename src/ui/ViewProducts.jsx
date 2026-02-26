import { MdDelete } from "react-icons/md";

export default function ViewProducts({products, handleDelete}){
    return (
        <>
        <div className="flex flex-wrap gap-3 p-5">
                {products.map((prod, i) => (
                  <div
                    key={i}
                    className="relative w-50 rounded-lg overflow-hidden bg-stone-50"
                  >
                    <button
                      onClick={() => handleDelete(i)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 transition cursor-pointer"
                    >
                      <MdDelete className="text-red-500" />
                    </button>
        
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-35 object-cover"
                    />
                    <div className="p-2">
                      <p className="text-stone-900 capitalize">
                        {prod.name}
                      </p>
                      <p className="text-stone-600">
                        {prod.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
        </>
    )
}