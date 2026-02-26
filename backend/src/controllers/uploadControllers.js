import cloudinary from "../lib/cloudinary.js";

export const uploadImages = async (req, res) => {
    const {images} = req.body
    try {
        if(!images || images.length === 0) return res.status(400).json({message: "No images Provided!"})

        const uploadPromises = images.map((image) => cloudinary.uploader.upload(image, {folder: "vantawear"}))

        // will wait for all upload to finish
        const uploadResponses = await Promise.all(uploadPromises)
        const imageUrls = uploadResponses.map((response) => response.secure_url) // an array for all secure urls(from cloudinary) of images

        res.status(200).json(imageUrls)
    } catch (error) {
        console.log("Error in uploadImages controller : ", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}