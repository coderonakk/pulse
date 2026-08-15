import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        try {

            const posts = await axios.post("https://pulse-backend-01ms.onrender.com/api/create", formData,
                {
                    withCredentials: true
                })

            navigate('/')
        }

        catch (err) {
            alert('Something went wrong')

        }
    }

    const auth = async () => {

        try {
            const user = await axios.get('https://pulse-backend-01ms.onrender.com/api/auth/me',
                {
                    withCredentials: true
                })
        }
        catch (err) {

            navigate('/login')
        }
    }

    useEffect(() => {
        auth()
    }, [])

    return (
        <div className="min-h-screen bg-[#050b1a] flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-[#0a1328] border border-[#172642] rounded-2xl p-8 shadow-2xl"
            >

                <h1 className="text-3xl font-bold text-white text-center mb-7">
                    Create Post
                </h1>

                <input
                    type="file"
                    required
                    name="file"
                    accept="image/*"
                    placeholder="Select file"
                    className="w-full mb-4 px-4 py-3 bg-[#071022] border border-[#1b2d4d] rounded-lg text-slate-400 text-sm outline-none focus:border-blue-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-500"
                />

                <input
                    type="text"
                    required
                    name="caption"
                    placeholder="write caption"
                    className="w-full mb-5 px-4 py-3 bg-[#071022] border border-[#1b2d4d] rounded-lg text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors"
                >
                    Submit
                </button>

            </form>

        </div>
    )
}

export default CreatePost