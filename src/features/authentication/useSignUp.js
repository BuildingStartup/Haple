import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signUpSeller } from "../../services/apiAuth";

function useSignUp(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSignUp({email, password, profileData, onSuccess, onError}) {
        setLoading(true);
        setError(null);
        // console.log(profileData)
        try {
            await signUpSeller({
                email: email, 
                password: password,
                profileData: profileData,
            });

            
            //2. Create the seller profile after successful sign-up
            // const user = signUpData?.user;
            // await createSellerProfile({
            //     id: user.id,
            //     full_name: businessName,
            //     username: businessName,
            //     business_name: businessName,
            //     description: description,
            //     whatsapp_number: whatsapp,
            //     is_active: true, // New sellers are inactive by default
            //     campus:"Bowen University",
            //     category_id: categories[0]
            // }); 

            toast.success("Profile created successfully!.");
            if(typeof onSuccess === "function") onSuccess();
            navigate("/");
        } catch (err) {
            setError(err.message);
            toast.error(`Sign up failed: ${err.message}`);
            if(typeof onError === "function") onError(err);
        } finally {
            setLoading(false);
        }
    }

    return {loading, error, handleSignUp};
}


export default useSignUp;
