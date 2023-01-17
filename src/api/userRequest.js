import axios from "axios";

const API = axios.create({baseURL:process.env.REACT_APP_BASE_URL})

 export const userNotifications = (id) => API.get(`/users/${id}/notifications`)