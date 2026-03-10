import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaStore } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

export default function Home() {
  const brandName = "HAPLE";
  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center p-3 bg- ">
      <div className="space-y-2 text-center">
        {brandName.split("").map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: 50, opacity: 0 }}
            animate={{
              // The wave sequence: Start at 0, rise up, return to 0
              y: [0, -9, 0],
              opacity: 1,
            }}
            transition={{
              // Opacity only happens once at the start
              opacity: {
                delay: 1 + i * 0.1,
                duration: 0.8,
              },
              // Y-axis movement loops forever
              y: {
                delay: 1 + i * 0.15, // The '0.15' creates the distance between peaks
                duration: 1.2, // How fast the wave travels
                repeat: Infinity, // Keeps the wave moving
                repeatDelay: 0.5, // Pause between waves so it's not too chaotic
                ease: "easeInOut",
              },
            }}
            className="tracking-[0.2em] inline-block text-5xl mb-3 text-primary font-bold md:text-7xl"
          >
            {letter}
          </motion.span>
        ))}
        <p className="text-gray-800 text-lg md:text-xl">
          Discover trusted student sellers on campus
        </p>

        <p className="text-gray-600 italic md:text-base leading-relaxed">
          Building a business is one thing. Getting discovered is another. Haple
          helps your business get found.
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        <Link
          to="/explore"
          className=" bg-primary flex items-center justify-between gap-4 py-4 px-6 text-white rounded-xl cursor-pointer group hover:shadow-lg transition-all duration-300 "
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary-light text-white p-3 rounded-lg">
              <GoSearch className="text-xl text-white group-hover:stroke-1" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium">Find Sellers</p>
              <span className="text-stone-100">
                Browse the campus marketplace
              </span>
            </div>
          </div>
          <MdKeyboardArrowRight className="text-3xl text-stone-200 group-hover:text-white" />
        </Link>

        <Link
          to="/signUp"
          className=" bg-stone-50 flex items-center justify-between gap-4 py-4 px-6 rounded-xl cursor-pointer group hover:shadow-lg transition-all duration-300 "
        >
          <div className="flex items-center gap-4">
            <div className="bg-accent p-3 rounded-lg">
              <FaStore className="text-xl text-stone-700 group-hover:text-black" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium">Start Selling</p>
              <span className="text-stone-500">
                Sell your products and services
              </span>
            </div>
          </div>
          <MdKeyboardArrowRight className="text-3xl text-stone-700 group-hover:text-black" />
        </Link>
      </div>

      <p className="mt-2 md:text-base">
        <span>Already a seller?</span>
        <Link to="/signIn" className="italic text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
