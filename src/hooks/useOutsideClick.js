import { useRef, useEffect } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();

  useEffect(function(){
    function handleClick(e){
      //this condition becomes true if the click happens outside the modal
      if(ref.current && !ref.current.contains(e.target)) handler();
    } 
    //to enable event capturing and disable the bubbling, you add a third parameter as "true or {capture: true}"  
    document.addEventListener("click", handleClick, listenCapturing)

    return ()=> document.removeEventListener("click", handleClick, listenCapturing)
  },[handler, listenCapturing])

  return ref;
}


