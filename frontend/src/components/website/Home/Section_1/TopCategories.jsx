
import { getCategories } from '@/api/Categoryapi'
import Link from 'next/link'

export default async function TopCategories() {
    const categories = await getCategories({ limit: 4, status: true, is_home: true })
    const topCategories = categories.allcategories
    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Top Categories</h3>
                <span className="text-sm text-gray-500 cursor-pointer hover:text-teal-500">
                    View All
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {topCategories.map((cat, index) => (
                    <Link key={index} href={`/products?category_slug=${cat.slug}`}>
                        <div
                            
                            className="flex flex-col items-center justify-center rounded-lg p-4 hover:shadow transition cursor-pointer"
                        >
                            <div className="relative w-16 h-16 mb-3">
                                <img
                                    className="w-[55px] h-[55px] rounded-md object-cover"
                                    src={process.env.NEXT_PUBLIC_CATEGORY_IMAGE + cat.image}
                                    alt={cat.name}
                                />
                            </div>
                            <span className="text-sm text-center font-medium">{cat.name}</span>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}
