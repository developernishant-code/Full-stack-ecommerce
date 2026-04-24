import ProductsGrid from '@/components/website/Store/Section_3/Products/ProductsGrid'
import SectionThree from '@/components/website/Store/Section_3/SectionThree'

export default async function  Page({ searchParams }) {
  const query=await searchParams

  return (<ProductsGrid query={query} />)
}
