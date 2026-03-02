import { useState, useRef } from "react";
import { searchSellersByName } from "../../services/apiSellers";

function useSearchSeller(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sellers, setSellers] = useState([]);
    const timeoutRef = useRef(null);

    async function searchSellers(query){
        // Clear previous timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (query.length <= 1) {
            setSellers([]);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        timeoutRef.current = setTimeout(async () => {
            try{
                const data = await searchSellersByName(query);
                setSellers(data);
            }
            catch(err){
                console.log(err?.message);
                setError(err?.message);
            }
            finally{
                setLoading(false);
            }
        }, 400);
    }

    return {loading, error, sellers, searchSellers}
}

export default useSearchSeller;