import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import { AnimatePresence } from "framer-motion";
export default function SmallScreen({ children }) {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplash(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <AnimatePresence>{splash && <SplashScreen />}</AnimatePresence>
      <div className="block md:hidden">{children}</div>
    </>
  );
}
