import supabase from "./supabase";

export async function signUpSeller(email, password){
    const {data: seller, error} = await supabase.auth.signUp({
        email,
        password
    });
    
    if(error){
        console.log(error);
        throw new Error(error);
    }

    return seller;
};

export async function signInSeller(email, password){
    const {data: seller, error} = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if(error){
        console.log(error);
        throw new Error(error);
    }

    return seller;
};

export async function signOut(){
    const {error} = await supabase.auth.signOut();

    if(error){
        console.log(error);
        throw new Error(error);
    }
};

export async function getCurrentUser(){
    const {data: {user}, error} = await supabase.auth.getUser();

    if(error){
        console.log(error);
        throw new Error(error);
    }

    return user;
};


