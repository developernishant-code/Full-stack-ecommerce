import { toast } from 'react-toastify';
import axios from 'axios';
const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" })
const axiosinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
function slugCreate(value) {
    const slug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g , '-')
    return slug
}

export { notify, slugCreate, axiosinstance }