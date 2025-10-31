"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(180deg, #a8d5e2 0%, #e8f4f8 50%, #fef5e7 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 rounded-lg relative overflow-hidden flex items-center justify-center shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#a8d5ba] to-[#7ba8d4]" />
            <span className="text-base relative z-10">✨</span>
          </div>
          <h1 className="mt-3 text-xl font-bold text-gray-900">Craft My Prep</h1>
        </div>

        <div
          className="rounded-2xl p-6 shadow-xl border"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderColor: "rgba(255,255,255,0.7)",
          }}
        >
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-1 text-sm text-gray-600">
              Login to continue your prep journey
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#7ec4b6] bg-white"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Link href="#" className="text-xs text-gray-500 hover:text-gray-700">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#7ec4b6] bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white font-semibold py-2.5 shadow-md disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-white border text-gray-800 py-2.5 shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2"
              onClick={() => {
                const origin = typeof window !== "undefined" ? window.location.origin : "";
                const returnTo = `${origin}/user`;
                const authUrl = `${API_BASE}/auth/github?state=${encodeURIComponent(returnTo)}`;
                window.location.href = authUrl;
              }}
            >
              <span></span>
              <span>Continue with GitHub</span>
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account? {" "}
              <Link href="#" className="text-[#2a8c7e] font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
