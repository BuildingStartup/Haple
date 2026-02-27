import { useCallback, useState } from "react";
import { getSellerCategoryById } from "../../services/apiCategory";

function useSellerCategory(){
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);

    const fetchSellerCategory = useCallback(async (category_id) => {
        setLoading(true);
        setError(null);
        try{
            const data = await getSellerCategoryById(category_id);
            setCategory(data);
        }
        catch(err){
            console.log(err?.message);
            setError(err?.message);
            throw new Error(err?.message);
        }
        finally{
            setLoading(false);
        }
    }, []);

    

    return {loading, error, category, fetchSellerCategory}
}



export default useSellerCategory;