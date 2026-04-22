import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";

const Login = () => {

    const [formData, setFormData] = useState({username: "", password: ""})
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const validate = (): boolean =>{
        if(!formData.username || !formData.password){
            setError("Please fill the input fields properly")
            return false
        }


        if(formData.username.trim().length< 3){
            setError("Username must be at least 3 chars long gee")
            return false
        }

        if(formData.password.trim().length < 6){
            setError("Password must be at least 6 characters sir/ma'am")
            return false
        }
        
        return true
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError("")
        if(!validate())return

        dispatch(loginUser({...formData}))
        navigate("/search", {replace: true})

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h1 className="text-2xl font-semibold">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input type="text" name="username" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} value={formData.username} placeholder="Enter your name"/>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input type="password" placeholder="Enter a password" value={formData.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" />
                        </div>

                        {error && <p className="text-red-400">{error}</p>}

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Login;
