import supabase from "./supabase";


export async function uploadSellerImage(imageFile, sellerId, position){
    //validate file type
    if(!imageFile.type.startsWith("image/")){
        throw new Error("Only image files are allowed")
    }

    //create a unque file name
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${sellerId}/${fileName}`;
    
    //upload to supabase storage
    const {error: uploadError, } = await supabase.storage
        .from("seller-images")
        .upload(filePath, imageFile);
    
    if(uploadError){
        throw new Error(uploadError.message);
    }

    //get public url
    const {data: publicUrlData, error: publicUrlError} = supabase.storage
        .from("seller-images")
        .getPublicUrl(filePath);
    
        if(publicUrlError){
            throw new Error(publicUrlError.message);
        }
    
        const imageUrl = publicUrlData.publicUrl;

        //insert into seller-images table
        const {data, error: insertError} = await supabase
        .from("seller_images")
        .insert([{
            seller_id: sellerId,
            image_url: imageUrl,
            position: position
            },
        ])
        .select()
        .single()

        if(insertError){
            //delete the uploaded image if db insert fails
            await supabase.storage
            .from("seller-images")
            .remove([filePath]);
            throw new Error(insertError.message);
        }

        return data;
};  

export async function uploadSellerAvatar(avatarFile, userId){
   //1. validate user
   if(!userId) throw new Error("User not authenticated");
   
   //2. validate file
   if(!avatarFile) throw new Error("No file selected");

   const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
   if(!allowedTypes.includes(avatarFile.type)) throw new Error("Only JPG, PNG and WEBP files are allowed");

   //3. create file path
   const fileExtension = avatarFile.name.split(".").pop();
   const filePath = `${userId}/avatar.${fileExtension}`

   //4. upload to storage bucket
  const { error: uploadError } = await supabase.storage
    .from("seller-avatars")
    .upload(filePath, avatarFile, {
      upsert: true
    })

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  //5. get public url
  const { data: publicUrlData, error: publicUrlError } =  supabase.storage
    .from("seller-avatars")
    .getPublicUrl(filePath);

    if(publicUrlError){
        throw new Error(publicUrlError)
    }

    const avatarUrl = publicUrlData.publicUrl;

    //6. update sellers table
    const {data: updatedSeller, error: updatedError} = await supabase
    .from("sellers")
    .update({avatar_url: avatarUrl})
    .eq("id", userId)
    .select()
    .single()

    if(updatedError){
        throw new Error(updatedError);
    }
    

    return updatedSeller;

  
}



export async function getSellerImage(sellerId){
    const {data, error} = await supabase
    .from("seller_images")
    .select("*")
    .eq("seller_id", sellerId)
    .order("position", {ascending: true});
    
    if(error){
        throw new Error(error.message);
    }

    return data;
};

export async function deleteSellerImage(sellerId, imageId){
    //get the image record
    const {data: imageData, error: fetchError} = await supabase
    .from("seller_images")
    .select("*")
    .eq("id", imageId)
    .eq("seller_id", sellerId)
    .single();
    
    if(fetchError){
        throw new Error(fetchError.message);
    }

    //delete the image from storage
    const filePath = imageData.image_url.split("/").pop();
    const {error: deleteStorageError} = await supabase.storage
        .from("seller-images")
        .remove([filePath]);

    if(deleteStorageError){
        throw new Error(deleteStorageError.message);
    }

    //delete the image record from database
    const {error: deleteDbError} = await supabase
        .from("seller_images")
        .delete()
        .eq("id", imageId);

    if(deleteDbError){
        throw new Error(deleteDbError.message);
    }
    
};











