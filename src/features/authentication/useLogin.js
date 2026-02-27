import { useState } from "react";
import { signInSeller } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function loginSeller({email, password}){
        setLoading(true);
        setError(null);
        try{
            await signInSeller({email, password});
            toast.success("Successfully logged in!");
            navigate("/myProfile");
        }
        catch(err){
            console.log(err?.message);
            setError(err?.message);
            throw new Error(err?.message);
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, error, loginSeller};
}



export default useLogin;
