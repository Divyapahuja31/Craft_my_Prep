"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useEffect, Suspense } from "react";
import { api } from "../../lib/axios";

function OAuthCallbackContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { loginUser } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    if (!token) return;

    localStorage.setItem("cmp_token", token);

    api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      loginUser(token, res.data.user);
      router.push("/dashboard");
    }).catch(() => {
      router.push("/login");
    });

  }, []);

  return <p>Finishing login…</p>;
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <OAuthCallbackContent />
    </Suspense>
  );
}
