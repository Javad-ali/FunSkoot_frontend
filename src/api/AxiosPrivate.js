import axios from 'axios'


import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from 'state'

function AxiosPrivate() {
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
         const axiosPrivate = axios.create({ baseURL: 'http://localhost:3001/', headers: { Authorization: token } })
    axiosPrivate.interceptors.response.use(res => {
        console.log(res)
        return res
    },async err => {
        if (err.response.status === 403) {
        toast.error("you have been blocked by funskoot ")
            dispatch(setLogout())
        }
        console.log(err)
     return   Promise.reject(err)
    })
    return (axiosPrivate)
}

export default AxiosPrivate