import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSeller } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSignUp({email, password, onSuccess, onError}) {
        console.log(typeof email)
        setLoading(true);
        setError(null);
        try {
            await signUpSeller({
                email: email, 
                password: password
            });
            toast.success("Profile created successfully! Please log in.");
            if(typeof onSuccess === "function") onSuccess();
            navigate("/login");
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
