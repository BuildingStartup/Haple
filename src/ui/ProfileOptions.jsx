// import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useOutsideClick } from "../hooks/useOutsideClick";
import ConfirmAction from "./ConfirmAction";
import Modal from "./Modal";
import SpinnerMini from "./SpinnerMini";

export default function ProfileOptions({
  handleShare,
  handleCopyLink,
  onClose,
}) {
  const ref = useOutsideClick(() => onClose?.());

  return (
    <ul
      ref={ref}
      className="bg-white py-2 space-y-2 w-40 rounded-lg absolute top-7 -right-2 z-10 shadow"
    >
      <li
        className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer"
        onClick={() => {
          handleShare?.();
          onClose?.();
        }}
      >
        Share
      </li>

      <li className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer" onClick={handleCopyLink}>
        Copy Link
      </li>

      <Modal.Open opens="confirm-logout">
        <li
          className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer flex items-center gap-1 disabled:cursor-not-allowed disabled:text-stone-500">
          <span className="text-red-500">Logout</span>
        </li>
      </Modal.Open>   
      
          
    </ul>
  );
} 