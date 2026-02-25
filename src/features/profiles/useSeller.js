import { useState } from "react";
import { getSellerById } from "../../services/apiSellers";

function useSeller(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seller, setSeller] = useState(null);

    async function fetchSeller(id){
        setLoading(true);
        setError(null);
        try{
            const data = await getSellerById(id);
            setSeller(data);
        } catch(err){
            console.log(err)
            setError(err.message);
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    }

    
    return {loading, error, seller, fetchSeller};
}



export default useSeller;
