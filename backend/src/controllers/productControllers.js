import Product from "../models/productModel.js"

export const getAllProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1 // default page number will be 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        const query = {}

        // filter by category
        if (req.query.category) {
            query.category = req.query.category
        }

        // filter by price range
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {}
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice) // $gte -> greater than or equal to
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice) // $lte -> less than or equal to
        }

        // filter by keyword in name or description
        if (req.query.keyword) {
            query.$or = [
                { name: { $regex: req.query.keyword, $options: "i" } }, // $regex -> regular expressions
                { description: { $regex: req.query.keyword, $options: "i" } }, // $options -> used with $regex
            ]
        }
        const products = await Product.find(query).skip(skip).limit(limit) // query for filtering, skip and limit for pagination

        const total = await Product.countDocuments(query) // count total products

        res.status(200).json({
            products,
            page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total
        })
    } catch (error) {
        console.log("Error in getAllProducts controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("reviews.user", "name") // populate the user field in reviews with the name of the user
        if (!product) return res.status(404).json({ message: "No Such Product Found!" })

        res.status(200).json(product)
    } catch (error) {
        console.log("Error in getProduct controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getFeaturedProducts = async (_, res) => {
    try {
        const products = await Product.find({ isFeatured: true}).limit(10)
        res.status(200).json(products)
    } catch (error) {
        console.log("Error in getFeaturedProducts controller : ", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}