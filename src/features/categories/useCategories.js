import { useState } from "react";
import { getAllCategories as apiGetAllCategories} from "../../services/apiCategory";

function useCategories(){
    const [categories, setCategories] = useState([]);

    async function getAllCategories(){
        try{
            const data = await apiGetAllCategories();
            setCategories(data);
        }
        catch(err){
            const message = err?.message;
            console.log(message)
            throw new Error(message);
        }        
    }
    return {categories, getAllCategories};
}



export default useCategories;