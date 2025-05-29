import React, { useState, useEffect } from 'react'
import { BackButton } from '../components/Button'
import { Spinner } from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBooks = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    //1. use params
    const { id } = useParams();
    //2. get the book first
    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/books/${id}`);
                console.log(response.data);
                setTitle(response.data.title);
            }
            catch (err) {
                console.log(err);
                setLoading(true);
            }
        }
        getBook();
    }, [])



    const handleEditBook = async () => {
        try {

            const data = {
                title: title,
            }

            const response = await axios.put(`http://localhost:8000/books/${id}`, data);
            console.log(response.data);
            navigate("/");
            setTimeout(() => {
                setLoading(false);
            }, 1000)


        }
        catch (err) {
            console.log(err);
            alertt("Error creating book");
            setLoading(true);
        }

    }


    return (
        <div>
            <div>
                <BackButton />
            </div>

            <main>
                {
                    loading ?
                        (<Spinner />)
                        :
                        (
                            <div>
                                <h1>Edit Book</h1>
                                {/* inputs */}
                                <div className='flex flex-col gap-y-2'>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id='title' placeholder='Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                        )

                }
            </main>
        </div>
    )
}

export default EditBooks