import { Link } from "react-router-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import SpinnerMini from "./SpinnerMini";

export default function ProfileOptions({
  handleShare,
  handleLogout,
  signOutLoading,
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
      <Link to="edit" onClick={onClose}>
        <li className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer">Edit</li>
      </Link>
      <li
        className="px-4 py-3 hover:bg-stone-200 rounded cursor-pointer flex items-center gap-1 disabled:cursor-not-allowed disabled:text-stone-500"
        disabled={signOutLoading}
        onClick={() => {
          handleLogout?.();
          onClose?.();
        }}
      >
        {signOutLoading && <SpinnerMini />}
        <span className="text-red-500">Logout</span>
      </li>
    </ul>
  );
} 