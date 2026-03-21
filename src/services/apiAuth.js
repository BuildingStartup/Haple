import supabase from "./supabase";

export async function signUpSeller({email, password, profileData}){
    // console.log(profileData)
    const {data: seller, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: profileData?.businessName,
                // Creating a URL-friendly username from the business name
                username: profileData?.businessName?.toLowerCase().replace(/\s/g, ''),
                business_name: profileData?.businessName,
                description: profileData?.description,
                whatsapp_number: profileData?.whatsapp,
                is_active: true, 
                campus: "Bowen University",
                // FIX: Use the full string '0b4cc712...', not [0]
                category_id: profileData?.categories
            }
        }
    });
    
    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    return {seller, error};
};

export async function signInSeller({email, password}){
    const {data: seller, error} = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if(error){
        console.log(error);
        throw new Error("Wrong email or password");
    }

    return seller;
};

export async function signOut(){
    const {error} = await supabase.auth.signOut();

    if(error){
        console.log(error);
        throw new Error(error.message);
    }
};

export async function getCurrentUser(){
    const {data: {user}, error} = await supabase.auth.getUser();

    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    return user;
};


export async function forgotPassword(email, redirectPath){
    const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: redirectPath,
        }
    )

    if(error){
        console.log(error);
        const forgotPasswordError = new Error(error.message);
        forgotPasswordError.status = error.status;
        forgotPasswordError.code = error.code;
        throw forgotPasswordError;
    }
}


export async function updateUserPassword(newPassword){
    const {error} = await supabase.auth.updateUser({
        password: newPassword,
    });

    if(error){
        console.log(error);
        throw new Error(error.message);
    }
}




