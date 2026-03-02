import { useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";

function useUser(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    async function loadUser(){
        setLoading(true);
        setError(null);
        try{
            const data = await getCurrentUser();
            setUser(data);
        } catch(error){
            console.log(error);
            setError(error?.message);
            throw new Error(error?.message);
        } finally {
            setLoading(false);
        }
    }

    console.log(user)
    return {user, loading, error, loadUser}
}


export default useUser;