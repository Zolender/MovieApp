import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";

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
        dispatch(loginUser({ ...formData }))
        navigate("/search", { replace: true })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-sm flex flex-col gap-2"
                style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--card-border)",
                    boxShadow: "var(--card-shadow)",
                    borderRadius: "1rem",
                    padding: "2.5rem 2rem",
                }}
            >
                {/* Logo */}
                <div className="flex flex-col items-center gap-3 mb-8">
                    
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "var(--text-primary)",
                            fontSize: "1.6rem",
                            fontWeight: 700,
                        }}
                    >
                        CineSearch
                    </h1>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Sign in to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Username */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="username"
                            className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: "var(--text-muted)" }}
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
                            style={{
                                backgroundColor: "var(--input-bg)",
                                border: "1px solid var(--input-border)",
                                color: "var(--text-primary)",
                                borderRadius: "0.5rem",
                                padding: "0.65rem 0.85rem",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.2s ease",
                                width: "100%",
                            }}
                            onFocus={e => e.target.style.borderColor = "var(--input-focus)"}
                            onBlur={e => e.target.style.borderColor = "var(--input-border)"}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="password"
                            className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: "var(--text-muted)" }}
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
                            style={{
                                backgroundColor: "var(--input-bg)",
                                border: "1px solid var(--input-border)",
                                color: "var(--text-primary)",
                                borderRadius: "0.5rem",
                                padding: "0.65rem 0.85rem",
                                fontSize: "0.9rem",
                                outline: "none",
                                transition: "border-color 0.2s ease",
                                width: "100%",
                            }}
                            onFocus={e => e.target.style.borderColor = "var(--input-focus)"}
                            onBlur={e => e.target.style.borderColor = "var(--input-border)"}
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm"
                            style={{ color: "#E05A5A" }}
                        >
                            {error}
                        </motion.p>
                    )}

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full h-10 rounded-md text-sm font-semibold mt-2"
                        style={{
                            backgroundColor: "var(--accent)",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            letterSpacing: "0.03em",
                            transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--accent)")}
                    >
                        Sign In
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default Login
