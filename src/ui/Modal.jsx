import { cloneElement, createContext, useContext, useState } from "react";
import {useOutsideClick} from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { StyledModal } from "./StyledModal";


const ModalContext = createContext();


function Modal({children}){
    const [openName, setOpenName] = useState("");

    const close = ()=> setOpenName("");
    const open = (e)=> setOpenName(e);

    return <ModalContext.Provider value={{openName, close, open}}>
        {children} 
    </ModalContext.Provider>
}


function Open({children, opens: opensWindowName}){
    const {open} = useContext(ModalContext);

    return cloneElement(children, {
        onClick: (e) => {
            children.props?.onClick?.(e);
            open(opensWindowName);
        }})
}

function Window({children, name}){
    const {openName, close} = useContext(ModalContext);
    const ref = useOutsideClick(close);

    if(name !== openName) return null;

    return createPortal (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/20 backdrop-blur-sm transition-all duration-500 z-50">
            <StyledModal ref={ref} className="h-full flex flex-col gap-3  justify-center px-5">
                <button className="p-1.5 rounded-sm group cursor-pointer ml-auto" onClick={close}>
                    <HiXMark className="text-xl font-bold" />
                </button>
                <div>
                    {cloneElement(children, {onCloseModal: close})}
                </div>
            </StyledModal>
        </div>,
        document.body
    )
}

function Button({children}){
    return (
        <button>
            {children}
        </button>
    )
}

function Preview({children, name, key}){
    const {openName, close} = useContext(ModalContext);
    const ref = useOutsideClick(close);

    if(name !== openName) return null;

    return createPortal (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/20 backdrop-blur-sm transition-all duration-500 z-50" key={key}>
            <StyledModal ref={ref} className="h-full flex flex-col gap-3  justify-center px-5">
                <button className="p-1.5 rounded-sm bg-primary  group hover:bg-white  cursor-pointer ml-auto" onClick={close}>
                    <HiXMark className="text-xl text-white group-hover:text-primary" />
                </button>
                <div className="">
                    {cloneElement(children, {onCloseModal: close})}
                </div>
            </StyledModal>
        </div>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window
Modal.Button = Button
Modal.Preview = Preview


export default Modal;
