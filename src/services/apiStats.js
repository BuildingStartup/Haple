import supabase from "./supabase";

export async function incrementProfileView(sellerId){
  const { error } = await supabase.rpc("increment_profile_view", {
    seller_id_input: sellerId
  })
  
  if (error) {
    console.error("Error incrementing profile view:", error);
    throw new Error(error.message);
  }
}

export async function incrementWhatsappClick(sellerId){
  const { error } = await supabase.rpc("increment_whatsapp_click", {
    seller_id_input: sellerId
  })
  
  if (error) {
    console.error("Error incrementing whatsapp click:", error);
    throw new Error(error.message);
  }
}

export async function getSellerStats(sellerId){
  const { data, error } = await supabase
    .from("seller_stats")
    .select("*")
    .eq("seller_id", sellerId)
    .single()

  if (error) {
    throw new Error(error);
  }
  return data
};





