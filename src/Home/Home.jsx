import { FaShoppingBag } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
export default function Home() {
  return (
    <section className="h-screen w-full flex flex-col justify-center bg-[#F1F5F9] px-1 text-center">
      <div className="flex flex-col items-center text-sm  space-y-2">
        <h1 className="tracking-wider text-4xl text-[#1A55E3] font-bold">
          HAPLE
        </h1>
        <p className="text-gray-900 font-bold text-lg leading-tight">
          Find it. Book it. Haple it.
        </p>

        <p className="text-gray-600 text-sm leading-relaxed">
          Discover entrepreneurs offering products and services on campus. From
          food to clothes to accessories to services.
        </p>
      </div>
      <div className="w-[93%] flex flex-col justify-center mx-auto gap-4 text-white mt-5 text-sm">
        <button className=" bg-[#1A55E3] py-3 rounded-xl text-sm">
          <p className="flex gap-2 items-center justify-center  mb-2">
            <span>
              <FaTag />
            </span>
            Start Selling
          </p>
          <p>List your shop in minutes</p>
        </button>
        {/*  */}
        <button className="bg-[#10B981] py-3 rounded-xl">
          <p className="flex gap-2 items-center justify-center mb-2">
            <span>
              <FaShoppingBag />
            </span>
            Find Products
          </p>
          <p>Browse the campus marketplace</p>
        </button>
      </div>
      <p className="text-sm mt-3">
        Already Signed in? <a href="#">Log in</a>
      </p>
    </section>
  );
}
