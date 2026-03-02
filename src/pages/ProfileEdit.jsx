import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { FaImage } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import Fields from "../ui/Fields.jsx";
import SpinnerMini from "../ui/SpinnerMini";
import Spinner from "../ui/Spinner.jsx";
import { useAuth } from "../context/AuthContext";
import useSeller from "../features/profiles/useSeller.js";
import useUpdateSeller from "../features/profiles/useUpdateSeller.js";

export default function ProfileEdit(){
    const { user } = useAuth();
    const {loading, seller, fetchSellerById } = useSeller();
    const {loading: updateLoading, updateSeller} = useUpdateSeller();
    const { register, setValue, watch, handleSubmit, formState: { errors },} = useForm({
        values: seller || {},
        resetOptions: {
            keepDirtyValues: true, //retains user input if they started editing early
            keepErrors: true, //keeps any validation errors visible
        }
      });

    const navigate = useNavigate(); 
    
    const [preview, setPreview] = useState(null);
    const [fileError, setFileError] = useState(null);
    
    //watch the file input for changes
    const selectedFile = watch("avatarFile");
    

    useEffect(()=> {
        if(user?.id) fetchSellerById(user.id);
    }, [user, fetchSellerById])
    
    useEffect(()=>{
        //if a new file is selected, creates a preview with url
        if(selectedFile && selectedFile[0]){
            const file = selectedFile[0];
            
            // File type validation
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if(!validTypes.includes(file.type)){
                setFileError('Please upload a valid image file (JPG, PNG, or WEBP)');
                setPreview(null);
                return;
            }
            
            // File size validation (4MB max)
            const maxSize = 4 * 1024 * 1024; // 4MB in bytes
            if(file.size > maxSize){
                setFileError('Image size must be less than 4MB');
                setPreview(null);
                return;
            }
            
            // Clear error if validation passes
            setFileError(null);
            
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            //clean up memory for unmount or file change.
            return ()=> URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile])


    const onSubmit = (data) => {
        if (!data.business_name || !data.description || !data.whatsapp_number) return; 
        
        // Don't submit if there's a file error
        if(fileError) return;
        
        const updateData = {
        username: data.business_name.toLowerCase().replace(/\s+/g, ""), //generate username from business name
        business_name: data.business_name,
        description: data.description,
        whatsapp_number: data.whatsapp_number,
        avatar_url: data.avatarFile ? data.avatarFile[0] : null // Pass the file
        };

        //api call;
        updateSeller(seller.id, updateData);
    };  

    

    const handleWhatsAppChange = (value) => {
    // Remove all non-digit characters except +
    let cleanedNumber = value.replace(/[^\d+]/g, "");

    // If it starts with 0, remove it
    if (cleanedNumber.startsWith("0")) {
      cleanedNumber = cleanedNumber.substring(1);
    }

    // If it doesn't start with +234, add it
    if (!cleanedNumber.startsWith("+234") && cleanedNumber.length > 0) {
      cleanedNumber = "+234" + cleanedNumber;
    }

    setValue("whatsapp_number", cleanedNumber);
  };  

  const handleGoBack = ()=>{
    if(window.history.length > 1){
        navigate(-1);
    } else {
        navigate("/", {replace: true});
    }
  }

    if(loading) return <Spinner />;
    return (
        <div className="h-screen px-4 py-6 space-y-6 pb-20">
              <Link to="#" onClick={handleGoBack} className="flex items-center gap-2 cursor-pointer">
                <GoArrowLeft className="text-2xl text-gray-600 cursor-pointer" />
                <span className="text-gray-600">Back</span>
              </Link>
        
              {/* Header */}
              <div className="text-center space-y-1">
                <h2 className="text-xl font-medium text-primary">
                  Edit Profile
                </h2>
              </div>
        
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-10">
                    {/* Image upload preview */}
                <div className="flex flex-col gap-1">
                    <label className="w-45 h-45 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center cursor-pointer overflow-hidden bg-white mx-auto">
                        {preview ? (
                        <img
                            src={preview || seller?.avatar_url || "/default-placeholder.png"}
                            alt="avatar preview"
                            className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-stone-400">
                            <FaImage className="text-lg" />
                            <span>Upload logo</span>
                        </div>
                        )}

                        <input
                        type="file"
                        name="image"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        {...register("avatarFile")}
                        className="hidden"
                        />
                    </label>
                    {(errors.image || fileError) && (
                        <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center gap-1">
                            <VscError />
                            <span>{errors.image?.message || fileError}</span>
                        </div>
                        )}
                </div>
                


                {/* Business Name */}
                <Fields
                  register={register}
                  labelName="Business Name"
                  forTag="business_name"
                  errors={errors}
                  errorMessage="Business Name is Required"
                  placeholder="DesignByJoel"
                  type="text"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
                    {errors.description.message}
                  </p>
                )}
        
                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-gray-700 font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="What buyers will know about you"
                    className="w-full px-3 py-3 ring ring-gray-300 rounded-lg resize-none outline-none focus:ring focus:ring-primary transition-all duration-200"
                    rows={3}
                  />
                  {errors.description && (
                    <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center gap-1">
                      <VscError />
                      <span>{errors.description.message}</span>
                    </div>
                  )}
                </div>
        
                       
                {/* Contact Info */}
        
                <Fields
                    forTag="whatsapp_number"
                    labelName="WhatsApp Number"
                    validation={{
                      value: /^\+234\d{10}$/,
                      message: "Must be +234 followed by 10 digits (11 digits total)",
                    }}
                    placeholder="+234 (e.g., +2349012345678)"
                    type="tel"
                    errorMessage="Enter a valid WhatsApp number"
                    errors={errors}
                    register={register}
                    onChange={(e) => handleWhatsAppChange(e.target.value)}
                  />
        
        
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary font-medium text-white rounded-lg py-3 mb-3 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                    disabled={updateLoading}
                  >
                    {updateLoading && <SpinnerMini />}
                    <span>Create Seller Account</span>
                  </button>

            </form>
        </div>
    )
}



