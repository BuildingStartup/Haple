import supabase from "./supabase";

export async function incrementProfileViews(sellerId){
    const {error} = await supabase
    .from("seller_stats")
    .update({ profile_views: supabase.raw("profile_views + 1") })
    .eq("seller_id", sellerId);

    if(error){
        throw new Error(error.message);
    }
};

export async function incrementWhatsappClicks(sellerId){
    const {data, error:fetchError} = await supabase
    .from("seller_stats")
    .select("*")
    .eq("seller_id", sellerId)
    .single();

    if(fetchError){
        throw new Error(fetchError.message);
    }

    const {error: updateError} = await supabase
    .from("seller_stats")
    .update({ 
        whatsapp_clicks: data.whatsapp_clicks + 1,
        updated_at: new Date().toISOString()
     })
    .eq("seller_id", sellerId);

    if(updateError){
        throw new Error(updateError.message);
    }
};


export async function getSellerStats(sellerId){
    const {data, error} = await supabase
    .from("seller_stats")
    .select("*")
    .eq("seller_id", sellerId)
    .single();

    if(error){
        throw new Error(error.message);
    }

    return data;
};


