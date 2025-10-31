"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        if (!ignore) setUser(data);
      } catch (e) {
        if (!ignore) setError("Please login to view your profile");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{
          background:
            "linear-gradient(180deg, #a8d5e2 0%, #e8f4f8 50%, #fef5e7 100%)",
        }}
      >
        <div className="rounded-2xl p-8 shadow-xl border bg-white/90">
          <p className="text-gray-700 mb-4">{error}</p>
          <Link href="/login" className="text-[#2a8c7e] font-medium">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-start justify-center px-4 pt-16"
      style={{
        background:
          "linear-gradient(180deg, #a8d5e2 0%, #e8f4f8 50%, #fef5e7 100%)",
      }}
    >
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg relative overflow-hidden flex items-center justify-center shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#a8d5ba] to-[#7ba8d4]" />
            <span className="text-base relative z-10">✨</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Craft My Prep</h1>
        </div>

        <div className="rounded-2xl p-6 shadow-xl border bg-white/90">
          <div className="flex items-center gap-4">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={user.name || user.email || "Avatar"}
                className="w-16 h-16 rounded-full border shadow"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 grid place-items-center text-xl">
                🧑
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Hi{user?.name ? ", " : ""}{user?.name || "there"}!</h2>
              {user?.email ? (
                <p className="text-gray-600 text-sm">{user.email}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-700 underline">← Back to Home</Link>
            <form onSubmit={async (e) => {
              e.preventDefault();
              await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" });
              window.location.href = "/login";
            }}>
              <button type="submit" className="px-3 py-1.5 rounded-lg bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white text-sm shadow">Logout</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
