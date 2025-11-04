"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import SocialButton from "../components/SocialButton";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/axios";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const { loginUser } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", { name, email, password });
            loginUser(res.data.token, res.data.user);
            router.push("/dashboard");
        } catch (err) {
            alert(err.response?.data?.error || "Registration failed");
        }
    };

    const handleGithubSignup = () => {
        window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/github";
    };

    return (
        <AuthLayout title="Create Account" subtitle="Start your interview prep journey">
            <form onSubmit={handleSignup} className="space-y-6">
                <AuthInput
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    delay={0.3}
                />

                <AuthInput
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    delay={0.4}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    delay={0.5}
                />

                {/* Sign Up Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-6 py-4 rounded-xl bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white font-semibold text-lg shadow-lg transition-all"
                >
                    Sign Up
                </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
                <SocialButton onClick={handleGithubSignup} icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                }>
                    Continue with GitHub
                </SocialButton>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-[#7ec4b6] hover:text-[#6eb4a6] font-semibold">
                    Login
                </Link>
            </p>
        </AuthLayout >
    );
}
