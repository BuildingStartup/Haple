import { useState } from "react";
import { uploadSellerImage, getSellerImage, deleteSellerImage } from "../../services/apiSellerImage";

function useSellerImages(){
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);

    async function handleUploadImage(imageFileOrItems, sellerId, positionOrOnItemProgress, name, caption, onProgress){
        setIsUploading(true);
        setError(null);
        try {
            const uploadedResult = await uploadSellerImage(
                imageFileOrItems,
                sellerId,
                positionOrOnItemProgress,
                name,
                caption,
                onProgress
            );

            if (Array.isArray(uploadedResult)) {
                setImages((prevImages) => [...prevImages, ...uploadedResult]);
            } else {
                setImages((prevImages) => [...prevImages, uploadedResult]);
            }

            return uploadedResult;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsUploading(false);
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
        setIsDeleting(true);
        setError(null);
        try {
            await deleteSellerImage(sellerId, imageId);
            setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return {
        loading,
        isUploading,
        isDeleting,
        error,
        images,
        handleUploadImage,
        handleGetImages,
        handleDeleteImage,
    };
}

export default useSellerImages;

