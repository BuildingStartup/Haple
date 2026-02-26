import { useState } from "react";
import { getAllCategories as apiGetAllCategories, getCategoryByCatalogAndSlug as apiGetCategoryByCatalogAndSlug } from "../../services/apiCategory";

function useCategories(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    async function getAllCategories(){
        setLoading(true);
        setError(null);
        try{
            const data = await apiGetAllCategories();
            setCategories(data);
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

    async function getCategoryByCatalogAndSlug(catalog, slug) {
        setLoading(true);
        setError(null);
        try {
            const data = await apiGetCategoryByCatalogAndSlug(catalog, slug);
            setCategory(data);
            return data;
        }
        catch (err) {
            const message = err?.message;
            console.log(message);
            setError(message);
            throw new Error(message);
        }
        finally {
            setLoading(false);
        }
    }

    return {categories, category, loading, error, getAllCategories, getCategoryByCatalogAndSlug};
}



export default useCategories;