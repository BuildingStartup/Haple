import { useLocation, Link } from "react-router-dom";

export default function GlobalFeedbackButton() {
  const location = useLocation();

  if (location.pathname === "/feedback") return null;

  return (
    <Link
      to="/feedback"
      className="fixed right-4 bottom-4 z-50 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-md"
    >
      Feedback
    </Link>
  );
}



