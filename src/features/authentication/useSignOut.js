import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut as apiSignOut} from "../../services/apiAuth";

function useSignOut(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSignOut(){
        setLoading(true);
        setError(null);
        try{
            await apiSignOut();
            toast.success("Signed out successfully!");
            navigate("/signIn");
        } catch(err){
            console.log(err);
            setError(err.message);
            toast.error("Failed to sign out. Please try again.");
            throw new Error(err.message);
        } finally {
            setLoading(false);
        }
    }
    return {handleSignOut, loading, error};
}





export default useSignOut;
