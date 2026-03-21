import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import Fields from "../ui/Fields";
import SpinnerMini from "../ui/SpinnerMini";
import useForgotPassword from "../features/authentication/useForgotPassword";

export default function ForgotPassword(){
    const {loading, ForgotPassword: resetLink} = useForgotPassword(); 
    const {
            register,
            handleSubmit,        
            formState: { errors },
          } = useForm();

    const onSubmit = (data)=>{
        if(!data.email) return;
        const email = data?.email;
        resetLink(email);
      }      


    return (
        <div className="h-screen px-6 py-6 flex flex-col">
        <Link to="/" className="flex items-center gap-2 cursor-pointer mt-15">
          <GoArrowLeft className="text-2xl text-gray-600 cursor-pointer" />
          <span className="text-gray-600">Back</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col justify-center gap-3 flex-1">
            <div className="text-center space-y-1">
            <h2 className="text-xl font-medium text-primary">
                Forgot Password
            </h2>
            <p className="text-gray-600">
                Fill in your email to reset password
            </p>    
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-10">            

            {/* For email */}
            <Fields
                forTag="email"
                labelName="Email Address"
                validation={{
                value: /^[^\s@]+@[^\s@]+\.(com)$/i,
                message: "Enter a valid email",
                }}
                placeholder="joel@gmail.com"
                type="email"
                errorMessage="Email is required"
                errors={errors}
                register={register}
            />

            
                       

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-primary font-medium text-white rounded-lg py-3 mb-3 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                disabled={loading}
            >
                {loading && <SpinnerMini />}
                <span>Send Reset Link</span>
            </button>
          </form>              
      </div>
      </div>
    )
}