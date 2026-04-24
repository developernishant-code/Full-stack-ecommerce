import { axiosinstance } from "@/helper/helper"
async function GetColor(query={}) {
  const filter = new URLSearchParams()
  if (query.limit) filter.append("limit", query.limit)
  if (query.status) filter.append("status", query.status)
  if(query.id) filter.append("id",query.id)
  try {
    const res = await axiosinstance.get(`color?${filter.toString()}`);
    // console.log(res)
    return res.data;
    
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function GetColorById(id) {
  try {
    const res = await axiosinstance.get(`color/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
export { GetColor, GetColorById }