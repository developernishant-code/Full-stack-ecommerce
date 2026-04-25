const categorymodel = require("../models/Categorymodel");
const { uniqueName } = require("../utils/helper");

const createCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const category_image = req.files.image;

        if (!name || !slug || !category_image) {
            return res.status(400).json({
                message: "All Fields are required",
                success: false
            });
        }

        const iscategoryexist = await categorymodel.findOne({ name });

        if (iscategoryexist) {
            return res.status(409).json({
                message: "Category Already Exist",
                success: false
            });
        }

        const image = uniqueName(category_image);
        const destination = "./public/images/category/" + image;

        category_image.mv(destination, async (error) => {

            if (error) {
                return res.status(500).json({
                    message: "Unable to upload file",
                    success: false
                });
            }

            await categorymodel.create({
                name,
                slug,
                image: image
            });

            res.status(201).json({
                message: "Data Created Successfully",
                success: true
            });

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const getCategory = async (req, res) => {
    try {
        const query = req.query
        // console.log(query)
        const limit = query.limit ? parseInt(query.limit) : 0
        const filter = {}
        if (query.status) {
            filter.status = query.status === "true"
        }
        if (query.is_top) {
            filter.is_top = query.is_top === "true"
        }
        if (query.is_home) {
            filter.is_home = query.is_home === "true"
        }
        if (query.is_popular) {
            filter.is_popular = query.is_popular === "true"
        }
        if (query.id) filter._id = query.id


        const allcategories = await categorymodel.find(filter).limit(limit)
        const total = await categorymodel.find().countDocuments()
        res.status(200).json({
            message: "Data found Successfully",
            success: true,
            allcategories,
            total
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const getbyid = async (req, res) => {
    try {
        const id = req.params.id
        const allcategories = await categorymodel.findById(id)
        res.status(200).json({
            message: "Data found Successfully",
            success: true,
            allcategories
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const iscategoryexist = await categorymodel.findById(id)
        if (!iscategoryexist) {
            return res.status(404).json({
                message: "Category Not found",
                success: false
            })
        }

        await categorymodel.deleteOne({ _id: id })
        return res.status(201).json({
            message: "Data deleted Successfully",
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

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const { field } = req.body
        const iscategoryexist = await categorymodel.findById(id)
        if (!iscategoryexist) {
            return res.status(404).json({
                message: "Category Not found",
                success: false
            })
        }
        const allowfields = ["status", "is_home", "is_top", "is_best", "is_popular"]
        if (!allowfields.includes(field)) {
            res.status(500).json({
                message: "Bad Request",
                success: false
            })
        }
        await categorymodel.findByIdAndUpdate(
            id,
            { [field]: !iscategoryexist[field] }
        )

        return res.status(201).json({
            message: "Data updated Successfully",
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}
const updateCategoryById = async (req, res) => {
    try {

        const { name, slug } = req.body
        const id = req.params.id
        const category_image = req.files ? req.files.image : null

        const iscategoryexist = await categorymodel.findById(id)

        if (!iscategoryexist) {
            return res.status(404).json({
                message: "Category Not found",
                success: false
            })
        }

        const update = {}

        if (name) update.name = name
        if (slug) update.slug = slug

        // console.log(update, "update")

        if (category_image) {

            const image = uniqueName(category_image.name)
            const destination = "./public/images/category/" + image

            category_image.mv(destination, async (error) => {

                if (error) {
                    return res.status(500).json({
                        message: "Internal Server Error",
                        success: false
                    })
                }

                update.image = image

                await categorymodel.findByIdAndUpdate(id, {
                    $set: update
                })

                res.status(201).json({
                    message: "Category Updated Successfully",
                    success: true
                })
            })

        } else {

            await categorymodel.findByIdAndUpdate(id, {
                $set: update
            })

            res.status(201).json({
                message: "Category Updated Successfully",
                success: true
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports = { createCategory, getCategory, deleteCategory, updateCategory, getbyid, updateCategoryById }