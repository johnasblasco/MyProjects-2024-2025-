import React from 'react'

const Home = () => {
    return (
        <form className='px-10 w-full max-w-sm bg-amber-400 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            <input id='username' type="username" placeholder='Username' className='mb-4 border-2 border-black' />
            <input id='password' type="password" placeholder='Password' className='mb-4 border-2 border-black' />
            <input id='submit' type="submit" value="Login" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' />
        </form>
    )
}

export default Home