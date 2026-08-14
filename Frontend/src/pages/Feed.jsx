import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Trash2 } from "lucide-react"


const Feed = () => {

    const [user, setuser] = useState({})
    const [posts, setposts] = useState([])
    const [myPosts, setmyPosts] = useState(false)

    const navigate = useNavigate()

    const userName = async () => {

        try {
            const user = await axios.get('http://localhost:3000/api/auth/me',
                {
                    withCredentials: true
                })

            setuser(user.data);
        }
        catch (err) {

            navigate('/login')
        }

    }

    const getData = async () => {

        const posts = await axios.get("http://localhost:3000/api/get")

        setposts(posts.data.result);


    }

    const deletePost = async (postId) => {
        try {
            await axios.delete(
                `http://localhost:3000/api/delete/${postId}`,
                {
                    withCredentials: true
                }
            )

            setposts(posts.filter(post => post._id !== postId))

        } catch (err) {
            alert(err.response?.data.message)
        }
    }

    const logOut = async () => {

        try {
            await axios.post('http://localhost:3000/api/auth/logout', {}, {
                withCredentials: true
            })

            navigate('/login')
        } catch (err) {
            console.log(err.response);

        }
    }



    useEffect(() => {
        userName(), getData()
    }, [])

    return (
        <div className="min-h-screen bg-[#050b1a] text-white">

            <div className="h-20 bg-[#0a1328] border-b border-[#172642] flex justify-between items-center px-8">

                <h1 className="text-xl font-semibold text-white">
                    Welcome, {user.username}
                </h1>

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => { navigate('/createpost') }}
                        className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        Create Post
                    </button>

                    <button
                        onClick={logOut}
                        className="px-5 py-2.5 bg-[#111d35] text-slate-300 text-sm font-medium border border-[#243758] rounded-lg hover:bg-[#182641] hover:text-white transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

                {(myPosts
                    ? posts.filter(post => post.author._id === user.id)
                    : posts
                ).map((post) => (

                    <div
                        key={post._id}
                        className="bg-[#0a1328] border border-[#172642] rounded-2xl overflow-hidden shadow-xl"
                    >

                        <div className="px-5 py-4 border-b border-[#172642] flex justify-between">
                            <h2 className="text-base font-semibold text-white">
                                {post.author.username}
                            </h2>

                            {post.author._id === user.id && (
                                <h2 onClick={() => deletePost(post._id)}>
                                    <Trash2 size={20} />
                                </h2>
                            )}
                        </div>

                        <img
                            src={post.image}
                            alt=""
                            className="w-full aspect-video object-cover"
                        />

                        <div className="px-5 py-4">
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {post.caption}
                            </p>
                        </div>

                    </div>

                ))}

                {/* thats anothrer problem btw and make sure to chweck tf */}


            </div>

            <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#0a1328] border-t border-[#172642] flex items-center justify-center gap-16">

                <button
                    onClick={() => setmyPosts(false)}
                    className={`text-sm font-medium transition-colors ${!myPosts
                        ? "text-blue-400"
                        : "text-slate-500 hover:text-slate-300"
                        }`}
                >
                    All Posts
                </button>

                <button
                    onClick={() => setmyPosts(true)}
                    className={`text-sm font-medium transition-colors ${myPosts
                        ? "text-blue-400"
                        : "text-slate-500 hover:text-slate-300"
                        }`}
                >
                    My Posts
                </button>

            </div>
        </div>
    )
}

export default Feed