'use client'

import { useEffect, useState } from "react";
import { GetBrands } from "@/api/Brand";
import { getCategories } from "@/api/Categoryapi";
import Link from "next/link";
import { GetColor } from "@/api/Color";
import { useRouter, useSearchParams } from "next/navigation";

function Filters() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);

    // ✅ current selected values
    const selectedCategory = searchParams.get("category_slug")
    const selectedBrand = searchParams.get("brand_slug")

    // 🔄 Fetch data
    useEffect(() => {
        const fetchData = async () => {
            const [cateRes, brandRes, colorRes] = await Promise.all([
                getCategories(),
                GetBrands(),
                GetColor()
            ]);

            setCategories(cateRes?.allcategories || []);
            setBrands(brandRes?.allBrand || []);
            setColors(colorRes?.allColor || []);
        };

        fetchData();
    }, []);

    // 🧠 COMMON MERGE FUNCTION
    function updateQuery(key, value) {
        const query = new URLSearchParams(searchParams.toString())

        if (query.get(key) === value) {
            query.delete(key) // toggle off
        } else {
            query.set(key, value) // add/update
        }

        router.push(`/products?${query.toString()}`)
    }

    // ❌ Remove specific filter
    function removeFilter(key) {
        const query = new URLSearchParams(searchParams.toString())
        query.delete(key)
        router.push(`/products?${query.toString()}`)
    }

    // ❌ Remove all filters
    function clearAll() {
        router.push(`/products`)
    }

    return (
        <div className="bg-[#f3f4f8] rounded-xl p-5 text-sm space-y-6">

            {/* 🔴 CLEAR ALL */}
            <button
                onClick={clearAll}
                className="w-full bg-red-500 text-white py-2 rounded-md"
            >
                Clear All Filters
            </button>

            {/* ================= CATEGORIES ================= */}
            <div>
                <h4 className="font-semibold mb-3">CATEGORIES</h4>

                <button
                    onClick={() => removeFilter("category_slug")}
                    className="w-full bg-white border rounded-md py-2 mb-3"
                >
                    Remove Category
                </button>

                <div className="space-y-1 text-gray-600">
                    {categories.map((item) => (
                        <p
                            key={item._id || item.slug}
                            onClick={() => updateQuery("category_slug", item.slug)}
                            className={`ml-3 cursor-pointer hover:text-black 
                            ${selectedCategory === item.slug ? "text-black font-bold" : ""}`}
                        >
                            {item.name}
                        </p>
                    ))}
                </div>
            </div>

            <hr />

            {/* ================= BRANDS ================= */}
            <div>
                <h4 className="font-semibold mb-3">BRANDS</h4>

                <button
                    onClick={() => removeFilter("brand_slug")}
                    className="w-full bg-white border rounded-md py-2 mb-3"
                >
                    Remove Brand
                </button>

                <div className="space-y-1 text-gray-600">
                    {brands.map((item) => (
                        <p
                            key={item._id || item.slug}
                            onClick={() => updateQuery("brand_slug", item.slug)}
                            className={`ml-3 cursor-pointer hover:text-black 
                            ${selectedBrand === item.slug ? "text-black font-bold" : ""}`}
                        >
                            {item.name}
                        </p>
                    ))}
                </div>
            </div>

            <hr />

            {/* ================= COLORS ================= */}
            <div>
                <h4 className="font-semibold mb-3">COLORS</h4>

                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <div
                            key={color._id || color.hex_code}
                            className="w-8 h-8 rounded-full border cursor-pointer hover:scale-110 transition"
                            style={{ backgroundColor: color.hex_code }}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Filters;