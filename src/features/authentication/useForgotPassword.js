import { useState } from "react";
import { forgotPassword as apiForgotPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useForgotPassword(){
    // const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [message, setMessage] = useState("");
    
    async function ForgotPassword(email){
        setLoading(true);
        setError(null);
        const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
        const redirectPath = `${siteUrl}/updatePassword`;
        try{
            await apiForgotPassword(email, redirectPath)
            toast.success("Password reset link sent to your email inbox(and spam folder).")
            return true;
            // setEmail("");
        }
        catch(err){
            const message = err?.message || "Error: Could not send the reset link";
            const normalizedMessage = message.toLowerCase();
            console.log(message)
            setError(message)

            if (normalizedMessage.includes("rate limit")) {
                toast.error("Too many reset requests. Please wait a few minutes and try again.")
            } else if (err?.status === 500) {
                toast.error("Password reset is temporarily unavailable. Please try again shortly.")
            } else {
                toast.error("Could not send the reset link")
            }

            return false;
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, error, ForgotPassword}
}


export default useForgotPassword;
