"use client";
import { axiosinstance, notify, slugCreate } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function EditproductForm({product}) {
    // console.log(product)
    const router = useRouter()
    const [loading, setloading] = useState(false)
    const nameRef = useRef(null);
    const slugRef = useRef(null);

    function generateSlug() {
        const name = nameRef.current.value;
        const slug = slugCreate(name);
        slugRef.current.value = slug;
    }

    function clearform() {
        nameRef.current.value = ""
        slugRef.current.value = ""
    }

    function submithandler(event) {
        event.preventDefault();
        setloading(true)
        const payload = new FormData()
        payload.append("name", nameRef.current.value)
        payload.append("slug", slugRef.current.value)
        payload.append("image", event.target.image.files[0])
        axiosinstance
            .put(`/product/update/${product._id}`, payload)
            .then((res) => {
                if (res.data.success) {
                    notify(res?.data?.message, true);
                    clearform()
                    router.push("/admin/product")
                    router.refresh()
                }
            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong";

                notify(message, false);
            }).finally(
                () => {
                    setloading(false)
                }
            )
            // console.log(payload)
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Edit product
                </h2>

                <form onSubmit={submithandler} className="space-y-5">
                    {/* product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            product Name
                        </label>
                        <input
                        defaultValue={product?.name}
                            onChange={generateSlug}
                            ref={nameRef}
                            type="text"
                            placeholder="Enter product name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Slug
                        </label>
                        <input
                        defaultValue={product?.slug}
                            ref={slugRef}
                            type="text"
                            placeholder="Enter slug"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            product Image
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition">
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg
                                        className="w-8 h-8 text-gray-400 mb-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 16V4m0 0l-4 4m4-4l4 4m6 8v4m0 0l-4-4m4 4l4-4"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-500">Click to upload image</p>
                                </div>
                                <input type="file" name="image" accept="/image" className="hidden" />
                            </label>
                            
                        </div>
                        <img src={process.env.NEXT_PUBLIC_PRODUCT_IMAGE + product.thumbnail} className="w-20 h-20 rounded" alt={product.name} />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3">
                        <button
                            onClick={clearform}
                            type="button"
                            className="w-full bg-blue-600 cursor-pointer text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
                        >
                            Cancel product
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 cursor-pointer rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? "wait..." : "Save product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
