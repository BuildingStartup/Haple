import { Link } from "react-router-dom";
export default function Error404() {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-1 justify-center flex-col">
        <img
          src="Error404.png"
          alt="Saying 404 error in black and red"
          className="w-80 h-80 object-cover hover:cursor-not-allowed"
        />
      </div>
      <div className="p-6 w-full max-w-md text-center">
        <Link to="/">
          <button className="w-full bg-primary text-white py-3 rounded-xl text-base cursor-pointer">
            Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
}
