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
        <div className="">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className="" onChange={handleChange} value={formData.username} placeholder="Enter your name"/>
                </div>

                <div className="">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter a password" value={formData.password} onChange={handleChange} className="" name="password" id="password" />
                </div>

                {error && <p className="text-red-400">{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
 
export default Login;