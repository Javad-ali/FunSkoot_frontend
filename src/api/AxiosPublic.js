import axios from 'axios'
import React from 'react'

function AxiosPublic() {
    const axiosPublic = axios.create({baseURL:'http://localhost:3001/',headers: { "Content-Type": "application/json" }})
  return (axiosPublic)
}

export default AxiosPublic