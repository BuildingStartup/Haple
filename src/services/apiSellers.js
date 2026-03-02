import supabase, { supabaseUrl } from "./supabase";


export async function createSellerProfile(form){
    const {data: seller, error} = await supabase
    .from("sellers")
    .insert({form})
    .select();

    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    return seller;
};


//public seller profile: buyer flow
export async function getSellerByUsername(username){
    const {data: seller, error} = await supabase
    .from("sellers")
    .select("*")
    .eq("username", username)
    .single();
    
    if(error){
        console.log(error.message);
        throw new Error(error.message);
    }

    return seller;
}; 

//private seller profile: seller flow
export async function getSellerById(id){
    const { data:seller, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", id)
    .single();

    if(error){
        console.log(error.message);
        throw new Error(error);
    }

    
    return seller;
}; 



export async function getAllActiveSellers(){
    const {data: sellers, error} = await supabase
    .from("sellers")
    .select("*")
    .eq("is_active", true);
    
    if(error){
        console.log(error);
        throw new Error(error);
    }
    
    return sellers;
};

export async function getSellersByCategory(categoryId){
    const {data: sellers, error} = await supabase
    .from("sellers")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true);
    
    if(error){
        console.log(error);
        throw new Error(error);
    }
    
    return sellers;
};



export async function updateSellerProfile(sellerId, profileData){
    //1. checking if it has an image path already
    const hasImagePath = profileData.avatar_url?.startsWith?.(supabaseUrl);

    //2. create an image name
    //choose a base for the image name: existing path, string name, file.name or fallback image.

    const imageBase = hasImagePath ? profileData.avatar_url
    : (typeof profileData.avatar_url === "string" 
        ? profileData.avatar_url : profileData.avatar_url?.name
        || "image");
    
        const imageName = `${Math.random()}-${imageBase}`.replaceAll("/", "");
    
    //3. follows this pattern //https://mnojffbasafjsyamcbqw.supabase.co/storage/v1/object/public/seller-avatar/team3.jpg
    //https://mnojffbasafjsyamcbqw.supabase.co/storage/v1/object/public/seller-avatar/0.0963254126291676-image
    const imagePath = hasImagePath ? profileData.avatar_url
    : `${supabaseUrl}/storage/v1/object/public/seller-avatar/${imageName}`;


    const {data: seller, error} = await supabase
    .from("sellers")
    .update({...profileData, avatar_url: imagePath})
    .eq("id", sellerId)
    .select()
    .single();

    if(error){
        console.log(error);
        throw new Error(error || "Profile could not be updated!");
    }

    //2. upload image
    //if cover has already a hosted url, skip upload and return db result.
    if(hasImagePath) return seller;

    const {error: storageError} = await supabase
    .storage
    .from("seller-avatar")
    .upload(imageName, profileData.avatar_url)

    if(storageError){
        console.log(storageError)
        throw new Error("Profile image could not be uploaded!")
    }

    return seller;
};


export async function updateUserMetadata(updates){
    const {data, error} = await supabase.auth.updateUser({
        data: updates
    });

    if(error){
        console.log(error);
        throw new Error(error.message || "User metadata could not be updated!");
    }

    return data;
};





