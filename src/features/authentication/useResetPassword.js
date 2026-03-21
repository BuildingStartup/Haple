import { useState }  from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUserPassword } from "../../services/apiAuth";

function useResetPassword(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function resetPassword(newPassword){
        setLoading(true);
        setError(null);
        try{
            await updateUserPassword(newPassword)
            toast.success("Password updated successfully! Redirecting to login..")
            setTimeout(()=>{
                navigate("/signIn");
            }, 3000)
        }
        catch(err){
            console.log(err?.message);
            setError(err?.message || "Error in reseting password")
            toast.error("Couldn't update password. Try again!")
            throw new Error(err?.message);
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, error, resetPassword}
}



export default useResetPassword;
