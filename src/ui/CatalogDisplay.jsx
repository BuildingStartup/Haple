import { useState } from "react";
import { Link } from "react-router-dom";

export default function CatalogDisplay({
  catalog,
  name,
  // setSelectedCategory,
}) {
  const [isExpanded, setIsExpanded] = useState(null);  
  const isOpen = isExpanded === name;
  const catalogLength = isOpen ? catalog : catalog.slice(0, 3);
  return (
    <div className="">

      <div className="flex justify-between items-center border-l-4 border-l-primary px-2">
        <h2 className="text-lg font-medium">{name}</h2>
        <button
          className="text-primary cursor-pointer"
          onClick={() => setIsExpanded(isOpen ? null : name)}
        >
          {isOpen ? "View Less" : "View More"}
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 mt-5">
        {catalogLength.map((product, value) => (
          <Link 
          to="/explore/:categoryName" 
          key={value} className="bg-white min-w-40 h-auto flex flex-col items-center gap-3 rounded-lg justify-center text-base cursor-pointer shadow hover:-translate-y-1 transition-all duration-300 p-8">            
              <div
                className={`h-15 w-15 flex items-center justify-center text-2xl ${product.color} ${product.bg} p-2 rounded-full`}
              >
                {product.icon}
              </div>
              <span className="text-gray-700 text-center">
                {product.name}
              </span>
          </Link>
        ))}
      </div>
    </div>
  );
}