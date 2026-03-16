import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useForm } from "react-hook-form";
import useFeedback from "../features/feedback/useFeedback";
import SpinnerMini from "../ui/SpinnerMini";

export default function Feedback() {
  const { register, handleSubmit, reset } = useForm();
  const { loading, submitFeedback } = useFeedback();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const isSubmitted = await submitFeedback(data);
    if (isSubmitted) {
      reset();
    }
  };

  return (
    <section className="min-h-screen px-3 py-4 flex flex-col">

      <Link
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <GoArrowLeft className="text-xl text-gray-600 cursor-pointer" />
        <span className="text-gray-600">Back</span>
      </Link>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center space-y-1">
            <h2 className="text-lg text-primary font-medium">Help Us Improve Haple</h2>
            <p className="text-gray-600 leading-relaxed">
              Your suggestions and complaints help us build a better platform and
              experience for everyone.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
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
              className="bg-primary w-full p-3 rounded flex items-center justify-center gap-2 text-white text-sm cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={loading}
            >
              {loading && <SpinnerMini />}
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>

    </section>
  );
}
