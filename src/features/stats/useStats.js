import { useState } from "react";
import { getSellerStats, incrementProfileView, incrementWhatsappClick } from "../../services/apiStats";

function useStats(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);

    async function handleIncrementProfileViews(sellerId){
        setLoading(true)
        try{            
            await incrementProfileView(sellerId);
        }
        catch(err){
            console.log(err?.message)
        }
        finally{
            setLoading(false);
        }
    }

    async function handleIncrementWhatsappClicks(sellerId){
        setLoading(true)
        try{
            await incrementWhatsappClick(sellerId);
        }
        catch(err){
            console.log(err?.message)
        }
        finally{
            setLoading(false);
        }
    }

    async function fetchSellerStats(sellerId){
        setLoading(true);
        setError(null);
        try{
            const data = getSellerStats(sellerId);
            setStats(data)
        }
        catch(err){
            console.log(err?.message)
            setError(err?.message)
            throw new Error(err?.message)
        }
        finally{
            setLoading(false);
        }
    }

    return {stats, error, loading, fetchSellerStats, handleIncrementWhatsappClicks, handleIncrementProfileViews}
}



export default useStats;