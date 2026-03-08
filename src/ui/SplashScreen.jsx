import { motion } from "framer-motion";

export default function SplashScreen() {
  const brandName = "Haple";
  const tagline = "Whether you are a seller or buyer, we have you covered";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }} // Smooth 1.2s fade out
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white text-primary px-6"
    >
      {/* LOGO */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-6"
      >
        <img className="w-22 h-20" src="./Logo.png" alt="" />
      </motion.div>

      {/* 2. BRAND NAME */}
      <div className="flex overflow-hidden h-12">
        {brandName.split("").map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1 + i * 0.07,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl font-black tracking-[0.2em]"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* 3. TAGLINE (Soft "Bloom" Animation) */}
      {/* <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2, // Starts after the brand name is almost finished
          duration: 1,
          ease: "easeOut",
        }}
        className="mt-3 text-gray-500 text-center text-sm md:text-base font-medium max-w-xs leading-relaxed"
      >
        {tagline}
      </motion.p> */}
    </motion.div>
  );
}
