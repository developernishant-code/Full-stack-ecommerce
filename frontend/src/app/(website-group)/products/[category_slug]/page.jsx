import React from 'react'
import { getProduct } from '@/api/Product'
import ProductCard from '@/components/website/Store/Section_3/Products/ProductCard'

export default async function page({ searchParams }) {
    const category_slug = searchParams?.category_slug;

    const allProducts = await getProduct({
        category_slug,
        status: true
    });

    const products = allProducts?.allProduct || [];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((item) => (
                <ProductCard key={item._id} product={item} />
            ))}
        </div>
    );
}
