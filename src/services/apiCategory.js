import supabase from "./supabase";

export async function getAllCategories(){
    const {data: categories, error} = await supabase
    .from("categories")
    .select("*");
    
    if(error){
        console.log(error);
        throw new Error(error);
    }

    return categories;
};

export async function getCategoryBySlug(slug){
    const {data: category, error} = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
    
    if(error){
        console.log(error);
        throw new Error(error);
    }

    return category;
};


