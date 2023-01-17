import  axios  from "axios";

const baseURL = process.env.REACT_APP_BASE_URL+'/auth/otp'
const api = axios.create({baseURL,headers: { 'Content-Type': 'application/json' }})

export default api