import { getCategories } from '@/api/Categoryapi'
import Link from 'next/link'



export default async function CategorySidebar() {
    const allcategories = await getCategories({ limit: 4, status: true, is_top: true })
    const categories = allcategories.allcategories
    // console.log(categories)
    return (
        <aside className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Category</h3>

            <ul className="space-y-3">
                {categories.map((cat, index) => (
                    <Link key={index} href={`/products?category_slug=${cat.slug}`}>
                        <li
                            className="flex items-center justify-between px-4 py-3 rounded-lg border hover:border-teal-500 transition cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <img src={process.env.NEXT_PUBLIC_CATEGORY_IMAGE + cat.image} className='w-15 h-10' alt="" />

                                <span className="text-sm font-medium">{cat.name}</span>
                            </div>

                            <span className="text-xs bg-teal-100 text-teal-600 w-6 h-6 flex items-center justify-center rounded-full">
                                {cat.count || 2}
                            </span>
                        </li>
                    </Link>

                ))}
            </ul>
        </aside>
    )
}
