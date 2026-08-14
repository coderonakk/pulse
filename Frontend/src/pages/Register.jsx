import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Register = () => {

    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", {
                username, email, password
            }, {
                withCredentials: true
            })

            navigate('/')

        }
        catch (err) {
            console.log(err.response.data.message);
            seterror(err.response.data.message)
        }
    }

    return (
        <div className="min-h-screen bg-[#050b1a] flex items-center justify-center px-4">

            <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#0a1328] border border-[#172642] rounded-2xl p-8 shadow-2xl" >

                <h1 className="text-3xl font-bold text-white text-center mb-7">
                    Register
                </h1>

                <input type="text"
                    required
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="Enter Username"
                    className="w-full mb-4 px-4 py-3 bg-[#071022] border border-[#1b2d4d] rounded-lg text-white placeholder:text-slate-500 outline-none focus:border-blue-500" />

                <input type="email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter Email"
                    className="w-full mb-4 px-4 py-3 bg-[#071022] border border-[#1b2d4d] rounded-lg text-white placeholder:text-slate-500 outline-none focus:border-blue-500" />

                <input type="password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full mb-5 px-4 py-3 bg-[#071022] border border-[#1b2d4d] rounded-lg text-white placeholder:text-slate-500 outline-none focus:border-blue-500" />

                <div className="min-h-6 mb-3">

                    <h1 className="text-sm text-red-400"> {error} </h1>
                </div>

                <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors" > Submit </button>

                <div className="mt-6 text-center text-sm text-slate-400"> Already have an account?{" "} <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium" > Login </Link> </div>

            </form>
        </div>
    )
}


export default Register