import {Link} from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaStore } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center p-3 bg- ">

      <div className="space-y-2 text-center">
        <h1 className="text-5xl mb-3 text-primary font-semibold md:text-7xl">
          HAPLE
        </h1>
        <p className="text-gray-800 text-lg md:text-xl">
          Discover trusted student sellers on campus
        </p>

        <p className="text-gray-600 italic md:text-base ">
          Find food, fashion, design, tech repairs and more &mdash; all in one place .
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-6">

        <Link to="/explore" className=" bg-primary flex items-center justify-between gap-4 py-4 px-6 text-white rounded-xl cursor-pointer group hover:shadow-lg transition-all duration-300 ">
          <div className="flex items-center gap-4">
            <div className="bg-primary-light text-white p-3 rounded-lg">
              <GoSearch className="text-xl text-white group-hover:stroke-1"  />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium">Find Sellers</p>
              <span className="text-stone-100">Browse the campus marketplace</span>
            </div>
          </div>
          <MdKeyboardArrowRight className="text-3xl text-stone-200 group-hover:text-white" />
        </Link>

        <Link to="/signUp" className=" bg-stone-50 flex items-center justify-between gap-4 py-4 px-6 rounded-xl cursor-pointer group hover:shadow-lg transition-all duration-300 ">
          <div className="flex items-center gap-4">
            <div className="bg-accent p-3 rounded-lg">
              <FaStore className="text-xl text-stone-700 group-hover:text-black"  />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium">Start Selling</p>
              <span className="text-stone-500">Sell your products and services</span>
            </div>
          </div>
          <MdKeyboardArrowRight className="text-3xl text-stone-700 group-hover:text-black" />
        </Link>      

      </div>

      <p className="mt-2 md:text-base">
        <span >Already a seller?</span> 
        <Link to="/signIn" className="italic text-primary hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
