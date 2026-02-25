import supabase from "../services/supabase";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();


function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        //get current session on app load
        const getSession = async ()=> {
            const {data, error} = await supabase.auth.getSession();
            if(error){
                console.log("Error getting session:", error.message);
            }
            setUser(data.session?.user ?? null);
            setLoading(false);
        }
        getSession();

        //listen for auth changes(login, logout, signup)
        const {data: authListener} = supabase.auth.onAuthStateChange((_event, session)=> {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        //clean up subscription on unmount
        return ()=>{
            authListener.subscription.unsubscribe();
       }  
        
        
    }, []);

    // const value = {
    //     user, // globally stored user 
    //     setUser,
    //     loading,
    //     setLoading,           
    // };

    return (
        <AuthContext.Provider value={{user, loading, setUser, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error ("AuthContext was used outside of AuthProvider")
    return context;
}


export {AuthProvider, useAuth};



