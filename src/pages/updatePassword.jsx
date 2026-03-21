import {useState} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import Fields from "../ui/Fields";
import SpinnerMini from "../ui/SpinnerMini";
import useResetPassword from "../features/authentication/useResetPassword";

export default function UpdatePassword(){
    const [showPassword, setShowPassword] = useState(false);
    const {loading, resetPassword} = useResetPassword();
    const {
            register,
            handleSubmit,        
            formState: { errors },
        } = useForm();

    const onSubmit = async (data)=>{
        if(!data.password) return;
        if(data.password !== data.confirmPassword){
            toast.error("Passwords do not match!");
            return;
        }
        const password = data?.password;
        await resetPassword(password)
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
                        Reset Password
                    </h2>
                    <p className="text-gray-600">
                        Choose a new password password(with at least a symbol(@, #...))
                    </p>    
                    </div>
        
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-10">            
        
                    <Fields
                        forTag="password"
                        labelName="Password"
                        validation={{
                            value: /^(?=.*[!@#$%^&*]).{8,}$/, // at least 8 chars, 1 symbol
                            message:
                            "Password must be at least 8 characters with at least 1 symbol",
                        }}
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        errorMessage="Password is required"
                        errors={errors}
                        register={register}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />

                    <Fields
                        forTag="confirmPassword"
                        labelName="Confirm Password"
                        validation={{
                            value: /^(?=.*[!@#$%^&*]).{8,}$/, // at least 8 chars, 1 symbol
                            message:
                            "Password must be at least 8 characters with at least 1 symbol",
                        }}
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        errorMessage="Confirm Password is required"
                        errors={errors}
                        register={register}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />
        
                    
                               
        
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary font-medium text-white rounded-lg py-3 mb-3 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                        disabled={loading}
                    >
                        {loading && <SpinnerMini />}
                        <span>Reset Password</span>
                    </button>
                  </form>              
              </div>
              </div>
    )
}