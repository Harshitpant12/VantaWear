import Product from "../models/productModel.js"

export const getAllProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1 // default page number will be 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        const query = { deletedAt: null }

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
        const product = await Product.findById(req.params.id).populate("reviews.user", "name").where({ deletedAt: null }) // populate the user field in reviews with the name of the user
        if (!product) return res.status(404).json({ message: "No Such Product Found!" })

        res.status(200).json(product)
    } catch (error) {
        console.log("Error in getProduct controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getFeaturedProducts = async (_, res) => {
    try {
        const products = await Product.find({ isFeatured: true, deletedAt: null }).limit(10)
        res.status(200).json(products)
    } catch (error) {
        console.log("Error in getFeaturedProducts controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getAllCategories = async (_, res) => {
    try {
        const categories = await Product.distinct("category", { deletedAt: null }) // get distinct categories from products collection
        res.status(200).json(categories) // can be sorted as well like categories.sort() if needed later
    } catch (error) {
        console.log("Error in getAllCategories controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const createProduct = async (req, res) => {
    const { name, description, price, category, stock_quantity, isFeatured, images } = req.body
    try {
        if (!name || price == null || !category || stock_quantity == null) return res.status(400).json({ message: "Please provide all necessary details" })
        if (price < 0) return res.status(400).json({ message: "Price must be greater than or equal to 0" })
        if (stock_quantity < 0) return res.status(400).json({ message: "Stock quantity must be greater than or equal to 0" })

        const product = await Product.create({
            name: name.trim(),
            description: description ? description.trim() : "",
            price,
            category,
            stock_quantity,
            isFeatured, // relying on schema default value
            images
        })
        res.status(201).json(product)
    } catch (error) {
        console.log("Error in createProduct controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateProduct = async (req, res) => {
    const productId = req.params.id
    const { name, description, price, category, stock_quantity, isFeatured, images } = req.body
    try {
        if (name == null && description == null && price == null && category == null && stock_quantity == null && isFeatured == null && images == null) return res.status(400).json({ message: "Nothing to update!" })

        const updateFields = {}
        if (name) updateFields.name = name.trim() // if name is provided, trim it, otherwise keep it unchanged
        if (description != null) updateFields.description = description.trim()
        if (price != null) updateFields.price = price
        if (category) updateFields.category = category
        if (stock_quantity != null) updateFields.stock_quantity = stock_quantity
        if (isFeatured != null) updateFields.isFeatured = isFeatured
        if (images) updateFields.images = images
        // we can use spread syntax as well ...(name && {name: name.trim()})

        const product = await Product.findByIdAndUpdate(productId, updateFields, { new: true })
        if (!product) return res.status(404).json({ message: "Product not found!" })

        res.status(200).json(product)
    } catch (error) {
        console.log("Error in updateProduct controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId)
        // const product = await Product.findByIdAndUpdate(productId, { deletedAt: Date.now() }, { new: true })
        if (!product) return res.status(404).json({ message: "Product not found!" })
        if(product.deletedAt) return res.status(400).json({message: "Product already deleted!"})

        product.deletedAt = Date.now()
        await product.save()

        res.status(200).json({ message: "Product deleted successfully!" })
    } catch (error) {
        console.log("Error in deleteProduct controller : ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}