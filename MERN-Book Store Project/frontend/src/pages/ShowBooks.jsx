import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BackButton } from '../components/Button'
import axios from 'axios'
import { Spinner } from '../components/Spinner'
const ShowBooks = () => {
    const [loading, setLoading] = useState(false)
    const [book, setBook] = useState({})
    const { id } = useParams()

    useEffect(() => {
        try {
            const FetchBook = async () => {
                setLoading(true)
                const response = await axios.get(`http://localhost:8000/books/${id}`)
                setBook(response.data)
                console.log(response.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }

            FetchBook();
        } catch (err) {
            console.log(err)
        }



    }, []);

    return (
        <div>
            <BackButton />
            {/* CONDITIONAL RENDERING */}
            {
                loading ?
                    (
                        <div className='flex justify-center items-center'>
                            <Spinner />
                        </div>
                    )
                    :
                    (
                        <div className='p-4'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-3xl my-12'>{book.title}</h1>
                                <span className='p-4 bg-zinc-800 rounded-lg'>{book.author}</span>
                                <span className='p-4 bg-zinc-800 rounded-lg'>{book.publishYear}</span>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ShowBooks