import MainBanner from '@/components/website/Store/Section_1/MainBanner'
import SectionTwo from '@/components/website/Store/Section_2/SectionTwo'
import Filters from '@/components/website/Store/Section_3/Filters/Filters'
import Pagination from '@/components/website/Store/Section_3/Products/Pagination'
import ProductsToolbar from '@/components/website/Store/Section_3/Products/ProductsToolbar'

export default function Rootlayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto">

      {/* Heading */}
      <h2 className="text-lg md:text-xl font-semibold my-4 px-4">
        Top Cell Phones and Tablets
      </h2>

      {/* Banner */}
      <MainBanner />

      {/* Categories / Brands */}
      <SectionTwo />

      {/* PRODUCT + FILTER SECTION */}
      <section className="bg-white py-8">
        <div className="grid grid-cols-12 gap-6 px-4">

          {/* Filters Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="lg:sticky top-24">
              <Filters />
            </div>
          </aside>

          {/* Products Section */}
          <main className="col-span-12 lg:col-span-9">
            <ProductsToolbar />
            {children}
            <Pagination />
          </main>

        </div>
      </section>

    </div>
  )
}