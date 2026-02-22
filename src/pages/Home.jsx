import {Link} from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaStore } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center p-3 ">

      <div className="space-y-2 text-center">
        <h1 className="text-5xl mb-3 text-primary font-semibold md:text-7xl">
          HAPLE
        </h1>
        <p className="text-gray-800 text-lg md:text-xl ">
          Tired of asking "Who sells this?"
        </p>

        <p className="text-gray-600 text-lg md:text-xl">
          HAPLE connects you to verified sellers of products and services.
        </p>
      </div>

      <div className="flex gap-4 mt-6">

        <button className=" bg-primary flex gap-2 flex-row-reverse items-center justify-center py-3 px-4 rounded-xl text-white cursor-pointer ">
          <span className="text-base md:text-lg">Find Sellers</span>
          <GoSearch className="text-base lg:text-lg" />            
          {/* <p>Browse the campus marketplace</p> */}
        </button>

        <button className=" bg-white text-primary ring flex gap-2 flex-row-reverse items-center justify-center py-3 px-4 rounded-xl cursor-pointer ">
          <span className="text-base md:text-lg">Start Selling</span>
          <FaStore className="text-base lg:text-lg" />
          {/* <p>List your shop in minutes</p> */}
        </button>       

      </div>

      <p className="mt-2 md:text-base ">
        <span >Already a seller?</span> 
        <Link to="sign-in" className="italic text-primary hover:underline">Sign in</Link>
      </p>

    </div>
  );
}
