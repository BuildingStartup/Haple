import { useState } from "react";
import { getSellersByCategory } from "../../services/apiSellers";

function useSellersCategorySlug(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sellers, setSellers] = useState([]);

    async function fetchSellersById(category_id){
        setLoading(true);
        setError(null);
        try{
            const data = await getSellersByCategory(category_id)
            setSellers(data);
        }
        catch(err){
            const message = err?.message;
            console.log(message);
            setError(message);
            throw new Error(message);
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, error, sellers, fetchSellersById}
}


export default useSellersCategorySlug;


