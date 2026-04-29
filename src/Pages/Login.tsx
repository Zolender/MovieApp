import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";
import { Film } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validate = (): boolean => {
        if (!formData.username || !formData.password) {
            setError("Please fill in all fields")
            return false
        }
        if (formData.username.trim().length < 3) {
            setError("Username must be at least 3 characters")
            return false
        }
        if (formData.password.trim().length < 6) {
            setError("Password must be at least 6 characters")
            return false
        }
        return true
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        if (!validate()) return
        dispatch(loginUser({
            username: formData.username.trim(),
            password: formData.password.trim(),
        }))
        navigate("/search", { replace: true })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-slate-950/60 p-10"
            >
                <div className="flex flex-col items-center gap-2 mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                        className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-500 mb-1"
                    >
                        <Film size={20} color="#fff" />
                    </motion.div>
                    <h1
                        className="text-slate-100 text-2xl font-bold tracking-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        CineSearch
                    </h1>
                    <p className="text-slate-500 text-xs">
                        Sign in to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="username"
                            className="text-xs font-semibold uppercase tracking-widest text-slate-500"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            autoComplete="off"
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm px-3.5 py-2.5 outline-none focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="password"
                            className="text-xs font-semibold uppercase tracking-widest text-slate-500"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm px-3.5 py-2.5 outline-none focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-400"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full h-10 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold tracking-wide mt-1 cursor-pointer border-none transition-colors duration-200"
                    >
                        Sign In
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default Login