import React, { useState, useEffect } from 'react'
import { BackButton } from '../components/Button'
import { Spinner } from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateBooks = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSaveBook = async () => {
        try {

            const data = {
                title: title,
            }

            const response = await axios.post("http://localhost:8000/books", data);
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
                                <h1>Create Book</h1>
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

export default CreateBooks