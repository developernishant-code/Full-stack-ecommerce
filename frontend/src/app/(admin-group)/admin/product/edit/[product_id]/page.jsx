import { GetProductById } from '@/api/Product'
import EditproductForm from '@/components/admin/EditProduct'
import React from 'react'

export default async function page({params}) {
    const promise = await params
    const data = await GetProductById(promise.product_id)
    const allProduct = data !=null ? data.allProduct : null
  return (
    <EditproductForm product={allProduct} />
  )
}
