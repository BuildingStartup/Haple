import { useState } from "react";
import { updateSellerProfile, updateUserMetadata } from "../../services/apiSellers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useUpdateSeller(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const updateSeller = async (id, formData) => {
        setLoading(true);
        setError(null);
        try{
            await updateSellerProfile(id, formData);
            
            // Update user metadata if username changed
            if(formData.username){
                await updateUserMetadata({username: formData.username});
            }
            
            toast.success("Profile updated successfully!");
            navigate(`/my-profile`, {replace: true});
        }
        catch(err){
            const message = err?.message || "An error occurred while updating the profile.";
            setError(message);
            throw new Error(message);
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, error, updateSeller};
}



export default useUpdateSeller;

