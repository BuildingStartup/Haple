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
import FieldDescription from "../ui/FieldDescription.jsx";

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

    useEffect(() => {
      if (seller?.whatsapp_number) {
        const localDigits = seller.whatsapp_number.replace(/^\+234/, "").replace(/\D/g, "").slice(0, 10);
        setValue("whatsapp_number", localDigits);
      }
    }, [seller?.whatsapp_number, setValue]);
    
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
            
            // File size validation (5MB max)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if(file.size > maxSize){
                setFileError('Image size must be less than 5MB');
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
        
        const whatsappDigits = (data.whatsapp_number || "").replace(/\D/g, "").slice(0, 10);

        const updateData = {
        username: data.business_name.toLowerCase().replace(/\s+/g, ""), //generate username from business name
        business_name: data.business_name,
        description: data.description,
        whatsapp_number: `+234${whatsappDigits}`,
        avatar_url: data.avatarFile ? data.avatarFile[0] : (seller?.avatar_url || null) // Keep existing avatar if no new file selected
        };

        //api call;
        updateSeller(seller.id, updateData);
    };  

    

    const handleWhatsAppChange = (value) => {
    const cleanedNumber = value.replace(/\D/g, "").slice(0, 10);

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
                    {(preview || seller?.avatar_url) ? (
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
                    {(errors.avatarFile || fileError) && (
                        <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center gap-1">
                            <VscError />
                        <span>{errors.avatarFile?.message || fileError}</span>
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
        
                {/* Description */}
                <FieldDescription
                  register={register}
                  labelName="Description"
                  forTag="description"
                  errors={errors}
                  errorMessage="Description is Required"
                  placeholder="What buyers will know about you"
                  type="text"
                />

                {/* Contact Info */}        
                <Fields
                    forTag="whatsapp_number"
                    labelName="WhatsApp Number"
                    validation={{
                      value: /^\d{10}$/,
                      message: "Enter 10 digits after +234",
                    }}
                    placeholder="9012345678"
                    type="tel"
                    errorMessage="Enter a valid WhatsApp number"
                    errors={errors}
                    register={register}
                    prefix="+234"
                    onChange={(e) => handleWhatsAppChange(e.target.value)}
                  />
        
        
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary font-medium text-white rounded-lg py-3 mb-3 cursor-pointer hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                    disabled={updateLoading}
                  >
                    {updateLoading && <SpinnerMini />}
                    <span>Edit Seller Account</span>
                  </button>

            </form>
        </div>
    )
}



