import { useCallback, useState } from "react";
import { getSellerById, getSellerByUsername } from "../../services/apiSellers";

function useSeller(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seller, setSeller] = useState(null);

    const fetchSellerById = useCallback(async (id) => {
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
    }, []);

    const fetchSellerByUsername = useCallback(async (username) => {
        setLoading(true);
        setError(null);
        try{
            const data = await getSellerByUsername(username);
            setSeller(data);
        }
        catch(err){
            console.log(err)
            setError(err.message);
            throw new Error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    
    return {loading, error, seller, fetchSellerById, fetchSellerByUsername};
}



export default useSeller;
