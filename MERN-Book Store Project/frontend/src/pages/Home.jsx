import React, { useEffect, useState } from 'react'
import { Spinner } from '../components/Spinner'
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');
// outside of a function so that it will render once


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {


        try {

            if (socket) {
                socket.on('liveBooks', (data) => {
                    console.log("LIVE BOOKS", data);
                    setBooks(data);
                })

                socket.on('newBook', (data) => {
                    console.log("NEW TITE", data);
                    setBooks(prevData => [...prevData, data]);
                })


                setTimeout(() => {
                    setLoading(false);
                }, 1000)
            }

            return () => {
                if (socket) {

                    socket.off('liveBooks');
                    socket.off('newBook');
                }
            }

        } catch (err) {
            console.log(err)
            setLoading(true)
        }



    }, [])



    return (
        <div>
            {
                loading ?
                    (
                        <main className='bg-neutral-950 h-[90vh] flex justify-center items-center  m-20 p-10 text-amber-100 font-bold' >
                            <Spinner />


                            <h2 className='text-4xl text-red-600'>API FETCHING.....</h2>


                        </main >
                    )

                    :          //------CONDITIONAL RENDERING------//

                    (
                        <main className='bg-red-700 min-h-[90vh]  m-20 p-10 text-amber-100 font-bold' >
                            <h1 className='text-center text-4xl'>BOOK LIST</h1>

                            <Link to="/books/create" className='border-2 p-2 m-4 hover:bg-amber-100 hover:text-red-700'>
                                Create Book
                            </Link>

                            <table className='mt-10 p-2 w-full border border-amber-100 rounded-md'>
                                <thead>
                                    <tr className="bg-amber-50 text-red-700">
                                        <th className='border border-amber-100 '>No</th>
                                        <th className='border border-amber-100 '>Title</th>

                                        {/* RESPONSIVE HIDDEN when screen is less than MD */}
                                        <th className='border border-amber-100  max-md:hidden'>Author</th>
                                        <th className='border border-amber-100  max-md:hidden'>Publish Year</th>

                                        <th className='border border-amber-100 '>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        books.map((book, index) => {
                                            return (
                                                <tr className='p-2 text-center' key={index}>
                                                    <td className='border border-amber-100 rounded-md'>{index + 1}</td>
                                                    <td className='border border-amber-100 rounded-md'>{book.title}</td>
                                                    <td className='border border-amber-100 rounded-md max-md:hidden'>{book.author}</td>
                                                    <td className='border border-amber-100 rounded-md max-md:hidden'>{book.publishYear}</td>
                                                    <td className='border border-amber-100 rounded-md'>
                                                        <div className='flex gap-x-4 justify-center'>
                                                            <Link to={`/books/details/${book._id}`} className='bg-blue-500 text-white rounded-md p-2'></Link>
                                                            <Link to={`/books/edit/${book._id}`} className='bg-green-500 text-white rounded-md p-2'></Link>
                                                            <Link to={`/books/delete/${book._id}`} className='bg-red-500 text-white rounded-md p-2'></Link>
                                                        </div>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </main>
                    )}
        </div>
    )
}

export default Home