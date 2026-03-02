import { useState } from "react";
import { uploadSellerImage, getSellerImage, deleteSellerImage } from "../../services/apiSellerImage";

function useSellerImages(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);

    async function handleUploadImage(imageFile, sellerId, position, name, caption){
        setLoading(true);
        setError(null);
        try {
            const newImage = await uploadSellerImage(imageFile, sellerId, position, name, caption);
            setImages((prevImages) => [...prevImages, newImage]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleGetImages(sellerId){
        setLoading(true);
        setError(null);
        try {
            const sellerImages = await getSellerImage(sellerId);
            setImages(sellerImages);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            throw new Error(err?.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteImage(sellerId, imageId){
        setLoading(true);
        setError(null);
        try {
            await deleteSellerImage(sellerId, imageId);
            setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, images, handleUploadImage, handleGetImages, handleDeleteImage };
}

export default useSellerImages;

