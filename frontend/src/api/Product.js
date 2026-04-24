import { axiosinstance } from "@/helper/helper"
async function getProduct(query={}) {
  const filter = new URLSearchParams()
  if(query.id) filter.append("id",query.id)
  if(query.status) filter.append("status",query.status)
  if(query.limit) filter.append("limit",query.limit)
  if(query.category_slug) filter.append("category_slug",query.category_slug)
  if(query.brand_slug) filter.append("brand_slug",query.brand_slug)
    console.log(query,"qurry")
  try {
    const res = await axiosinstance.get(`product?${filter.toString()}`);
    // console.log(res)
    return res.data;
  } catch (err) {
    // console.log(err);
    return [];
  }
}

async function GetProductById(id) {
  try {
    const res = await axiosinstance.get(`product/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
export { getProduct, GetProductById }