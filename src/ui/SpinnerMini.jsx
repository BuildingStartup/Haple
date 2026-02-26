import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini() {
    return (
        <BiLoaderAlt 
          className="w-[15] h-[15] animate-spin" 
          style={{ animationDuration: '1.5s' }} 
        />
    )
}

export default SpinnerMini
