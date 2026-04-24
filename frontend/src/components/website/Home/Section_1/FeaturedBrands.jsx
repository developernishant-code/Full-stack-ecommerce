import { GetBrands } from '@/api/Brand'
import Link from 'next/link'

export default async function FeaturedBrands() {
    const brands = await GetBrands({ limit: 8, status: true, is_top: true })
    const data = brands.allBrand
    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Featured Brands</h3>
                <span className="text-sm text-gray-500 cursor-pointer hover:text-teal-500">
                    View All
                </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 items-center">
                {data.map((brand, index) => (
                    <Link key={index} href={`/products?brand_slug=${brand.slug}`}>
                        <div
                            className="flex items-center justify-center h-14 rounded-lg hover:shadow transition bg-white"
                        >
                            <img
                                src={process.env.NEXT_PUBLIC_BRAND_IMAGE + brand.image}


                                className="object-contain w-15"
                            />
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}
