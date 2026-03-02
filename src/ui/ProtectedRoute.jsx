import { Navigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";
import NetworkError from "./NetworkError";

function ProtectedRoute({children}){
    //1. Load the authenticated user
    const {user, loading: isLoading, error, loadUser} = useUser();

    useEffect(()=>{
        loadUser();
    }, []);
    
   

    //2. while loading, show a spinner
    if(isLoading) return (
        <div>
            <Spinner />
        </div>
    )

    if(error) return (
        <NetworkError />
    )

    
    //3. if there IS an authenticated user, show the protected page  
    if(user) return children;
    
    // If no user, redirect to login
    if(!user && !isLoading){
        return <Navigate to="/signIn" replace />;
    }
}


export default ProtectedRoute;