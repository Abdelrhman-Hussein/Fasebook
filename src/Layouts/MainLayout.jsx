import React from 'react'
import MainNavbar from '../Components/MainNavbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <>
            <MainNavbar/>
                <div className='min-h-screen bg-gray-200 pt-5'>
                    <Outlet />
                </div>
        </>
    )
}
