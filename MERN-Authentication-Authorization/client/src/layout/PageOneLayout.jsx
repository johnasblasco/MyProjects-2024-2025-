import React from 'react'
import { Outlet } from 'react-router-dom'
const PageOneLayout = () => {
    return (
        <>
            <header className='w-full bg-black text-white p-6 font-bold'>Hello World</header>
            <Outlet />

        </>
    )
}

export default PageOneLayout