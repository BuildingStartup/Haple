import { IoIosSearch } from "react-icons/io";

export default function SearchBar({ query, onSearch }){
    return (
        <div className="flex items-center gap-2 pl-4 py-1  rounded-full bg-stone-100">
            <IoIosSearch className="text-xl text-stone-700" />
            <input
                  type="text"
                  placeholder="Search for businesses"
                  className="flex-6 focus:outline-none py-2 text-base"
                  value={query}
                  onChange={(e) => onSearch(e.target.value)}
                />
        </div>
    )
}