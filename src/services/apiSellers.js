import supabase from "./supabase";


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

export async function updateSellerProfile(data, sellerId){
    const {data: seller, error} = await supabase
    .from("sellers")
    .update(data)
    .eq("id", sellerId)
    .select()

    if(error){
        console.log(error);
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


