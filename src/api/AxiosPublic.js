import axios from 'axios'
import React from 'react'

function AxiosPublic() {
    const axiosPublic = axios.create({baseURL:process.env.REACT_APP_BASE_URL,headers: { "Content-Type": "application/json" }})
  return (axiosPublic)
}

export default AxiosPublic