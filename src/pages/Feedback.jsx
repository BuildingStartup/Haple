import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Feedback() {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/joelOhikhena12@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = res.json();
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus("error");
    }
  };
  return (
    <section className="py-4 px-3">
      <Link
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <GoArrowLeft className="text-xl text-gray-600 cursor-pointer" />
        <span className="text-gray-600">Back</span>
      </Link>
      <div className="text-center mt-6 space-y-1">
        <h2 className="text-lg text-primary">Help Us Improve Haple</h2>
        <p className="text-gray-600 leading-relaxed">
          Your suggestions and complaints help us build a better marketplace and
          experience for everyone.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 space-y-2 h-screen"
      >
        <input
          {...register("_honey")}
          type="text"
          style={{ display: "none" }}
        />
        <input type="hidden" value="Feedback Form" {...register("_subject")} />
        <input type="hidden" value="box" {...register("_template")} />
        <textarea
          {...register("message", { required: true })}
          className="p-1 border border-gray-500 w-full h-44 resize-none leading-loose text-sm pl-2 outline-0 text-gray-900"
        ></textarea>
        <button
          type="submit"
          className="bg-primary w-full p-3 rounded-sm text-white text-sm"
        >
          Send
        </button>

        {status === "success" && <p>Message sent successfully!</p>}
        {status === "failed" && <p>Something went wrong.</p>}
        {status === "error" && <p>Error sending message.</p>}
      </form>
    </section>
  );
}
