import supabase, {supabaseUrl} from "./supabase";


export async function uploadSellerImage(imageFile, sellerId, position, name, caption){
     //1. checking if it has an image path already
        const hasImagePath = imageFile?.startsWith?.(supabaseUrl);
    
        //2. create an image name
        //choose a base for the image name: existing path, string name, file.name or fallback image.
    
        const imageBase = hasImagePath ? imageFile
        : (typeof imageFile === "string" 
            ? imageFile : imageFile?.name
            || "image");
        
        const imageName = `${Math.random()}-${imageBase}`.replaceAll("/", "");
        
        

        const filePath = `seller-${sellerId}/${imageName}`;


    
    
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
            position: position,
            name: name,
            caption: caption,
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
    .select()
    .single();
    
    if(fetchError){
        throw new Error(fetchError.message);
    }

    //delete the image from storage
    const filePath = `seller-${sellerId}/${imageData.image_url.split("/").pop()}`;
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











