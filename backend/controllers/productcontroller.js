const categorymodel = require("../models/Categorymodel")
const ProductModel = require("../models/Productmodel")
const BrandModel = require("../models/Brandmodel")
const { uniqueName } = require("../utils/helper")
const fs = require("fs")

const createproduct = async (req, res) => {
    try {
        const { name, slug, category_id, short_description, long_description, original_price, discount_price, final_price, brand_Id, color_ids } = req.body
        const thumbnail = req.files?.thumbnail
        if (
            !name ||
            !slug ||
            !thumbnail ||
            !category_id ||
            !short_description ||
            !long_description ||
            !original_price ||
            !discount_price ||
            !final_price ||
            !brand_Id ||
            !color_ids) {
            return res.status(400).json({
                message: "All Fields are required",
                success: false
            })
        }

        const isproductexist = await ProductModel.findOne({ name })
        if (isproductexist) {
            return res.status(409).json({
                message: "product already exists",
                success: false
            })
        }

        const image = uniqueName(thumbnail.name)
        const destination = "./public/images/product/" + image

        thumbnail.mv(
            destination,
            async (error) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({
                        message: "Unable to upload file",
                        success: false
                    })
                }

                else {

                    await ProductModel.create({ name, slug, thumbnail: image, category_id, short_description, long_description, original_price, discount_price, final_price, brand_Id, color_ids: JSON.parse(color_ids) })
                    return res.status(201).json({
                        message: "Data Created Successfully",
                        success: true
                    })

                }
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const getProduct = async (req, res) => {
    try {

        const query = req.query
        const filter = {}
        // console.log(query)
        const page = parseInt(query.page) || 1
        const limit = parseInt(query.limit) || 10
        const skip = (page - 1) * limit

        if (query.status)
            filter.status = query.status === "true"

        if (query.stock)
            filter.stock = query.stock === "true"



        if (query.id)
            filter._id = query.id

        if (query.category_slug) {
            const category = await categorymodel.findOne({
                slug: query.category_slug
            })

            if (category) {
                filter.category_id = category._id
            }
        }

        if (query.brand_slug) {
            const brand = await BrandModel.findOne({
                slug: query.brand_slug
            })

            if (brand) {
                filter.brand_Id = brand._id
            }
        }

        const [total, allProduct] = await Promise.all([

            ProductModel.countDocuments(filter),

            ProductModel.find(filter)
                .skip(skip)
                .limit(limit)
                .populate({
                    path: "category_id",
                    select: "name slug"
                })
                .populate({
                    path: "brand_Id",
                    select: "name slug"
                })
                .populate({
                    path: "color_ids",
                    select: "name slug hex_code"
                })

        ])

        return res.status(200).json({
            success: true,
            allProduct,
            total,
            limit,
            pages: Math.ceil(total / limit)
        })

    } catch (error) {

        // console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const allProduct = await ProductModel.findById(id)
        return res.status(200).json({
            message: "Data founded",
            success: true,
            allProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}
const deleteProduct = async (req, res) => {
    try {

        const id = req.params.id
        const isproductexist = await ProductModel.findById(id)
        if (!isproductexist) {
            return res.status(409).json({
                message: "Data not found",
                success: false
            })
        }

        await ProductModel.deleteOne({ _id: id })
        return res.status(200).json({
            message: "Product Deleted Successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const { field } = req.body
        const id = req.params.id
        const isproductexist = await ProductModel.findById(id)
        if (!isproductexist) {
            return res.status(409).json({
                message: "Data not found",
                success: false
            })
        }
        const fields = ["is_top", "status", "is_home", "is_popular"]

        // agar field allowed nahi hai
        if (!fields.includes(field)) {
            return res.status(400).json({
                message: "Bad Request",
                success: false
            })
        }


        await ProductModel.findByIdAndUpdate(
            id,
            { [field]: !isproductexist[field] }

        )


        return res.status(200).json({
            message: "Product Updated Successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const editproduct = async (req, res) => {
    try {

        const { name, slug } = req.body
        const id = req.params.id
        const brand_logo = req.files ? req.files.image : null

        const isproductexist = await ProductModel.findById(id)

        if (!isproductexist) {
            return res.status(404).json({
                message: "brand Not found",
                success: false
            })
        }

        const update = {}

        if (name) update.name = name
        if (slug) update.slug = slug

        // console.log(update, "update")

        if (brand_logo) {

            const image = uniqueName(brand_logo.name)
            const destination = "./public/images/product/" + image

            brand_logo.mv(destination, async (error) => {

                if (error) {
                    return res.status(500).json({
                        message: "Internal Server Error",
                        success: false
                    })
                }

                update.image = image

                await ProductModel.findByIdAndUpdate(id, {
                    $set: update
                })

                res.status(201).json({
                    message: "Product Updated Successfully",
                    success: true
                })
            })

        } else {

            await ProductModel.findByIdAndUpdate(id, {
                $set: update
            })

            res.status(201).json({
                message: "Product Updated Successfully",
                success: true
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const add_images = async (req, res) => {
    try {
        const id = req.params.id
        const isproductexist = await ProductModel.findById(id)
        if (!isproductexist) {
            return res.status(404).json({
                message: "product Not found",
                success: false
            })
        }
        if (!req.files || !req.files.images) {
            return res.status(400).json({
                message: "No Files were uploaded",
                success: false
            })
        }
        const images = Array.isArray(req.files.image) ? req.files.images : [req.files.images]
        const image_name = []
        for (const image of images) {
            const image_name = uniqueName(image.name)
            const destination = "./public/images/product/other" + image_name
            await image.mv(destination)
            image_name.push(image_name)
        }
        isproductexist.images.push(...image_name)
        await isproductexist.save()
        return res.status(201).json({
            message: "Images Added Successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const delete_image = async (req, res) => {
    try {
        const id = req.params.id
        const { image_name } = req.body
        const isproductexist = await ProductModel.findById(id)
        if (!isproductexist) {
            return res.status(404).json({
                message: "product Not found",
                success: false
            })
        }
        await ProductModel.findByIdAndUpdate(
            id,
            { $pull: { images: image_name } }
        )
        fs.unlink(`./public/images/product/other/${image_name}`, (err) => {
            if (err) console.log("Unable to delete image", err)
            return res.status(201).json({
                message: "Images Deleted Successfully",
                success: true
            })
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports = { createproduct, getProduct, add_images, delete_image, getProductById, deleteProduct, updateProduct, editproduct }