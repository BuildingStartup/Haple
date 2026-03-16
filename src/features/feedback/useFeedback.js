import { useState } from "react";
import toast from "react-hot-toast";


function useFeedback(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function submitFeedback(data){
        setLoading(true);
        setError(null);
        try {
        const res = await fetch(
            "https://formsubmit.co/ajax/77d8fe23cc5362a59a7ad1538abfd2eb",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
            }
        );
        const result = await res.json();
            if (result.success) {
                toast.success("Message sent successfully!");
                return true;
            } else {
                const message = "Something went wrong while sending your message.";
                setError(message);
                toast.error(message);
                return false;
            }
        } 
        catch(err) {
            console.log(err?.message);
            setError(err?.message || "Error sending message.");
            toast.error("Error sending message.");
            return false;
        }
        finally{
            setLoading(false);
        }
        };


    return { loading, error, submitFeedback }

} 


export default useFeedback;