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
        try {
            await signUpSeller({
                email: email, 
                password: password,
                profileData: profileData,
            });
            toast.success("Profile created successfully!.");
            if(typeof onSuccess === "function") onSuccess();
            navigate(`/profile/${profileData?.username}`);
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
