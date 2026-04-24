import { getCategories } from "@/api/Categoryapi";
import CategoryCard from "./CategoryCard";
import Link from "next/link";

async function SectionTwo() {
    const categories = await getCategories({ limit: 5, status: true, is_home: true })
    const allcategories = categories.allcategories
    return (
        <section className="bg-[#f2f3f7] py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-xl p-6">

                    {/* Section Title */}
                    <h3 className="text-sm font-semibold mb-6">
                        POPULAR CATEGORIES
                    </h3>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-6 gap-x-4">
                        {allcategories.map((cat, index) => (
                            <Link key={index} href={`/products?category_slug=${cat.slug}`}>
                                <CategoryCard
                                    key={index}
                                    name={cat.name}
                                    image={cat.image}
                                />
                            </Link>

                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SectionTwo;
