import { Link } from "react-router-dom";
export default function Error404() {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-1 justify-center flex-col">
        <img
          src="Error404.png"
          alt="Saying 404 eror in black and red"
          className="w-80 h-80 object-cover"
        />
      </div>
      <div className="p-6 w-5/6">
        <Link to="/">
          <button className="w-full bg-primary text-white py-3 rounded-xl text-base cursor-pointer">
            Home Page
          </button>
        </Link>
      </div>
    </section>
  );
}
