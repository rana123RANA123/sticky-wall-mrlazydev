import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Forget from './Forget'
import Reset from './Reset'

export default function Index() {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forget' element={<Forget />} />
            <Route path='reset' element={<Reset />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}
