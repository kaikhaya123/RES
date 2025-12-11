"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password: pass }),
      headers: { "Content-Type": "application/json" }
    });
    const body = await res.json();
    if (res.ok) {
      document.cookie = `admin_token=${body.token}; path=/; max-age=${60*60*8}`;
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg-soft">
      <form onSubmit={submit} className="bg-warm-stone-secondary p-10 rounded-xl shadow w-full max-w-md border border-warm-stone-border">
        <h2 className="text-2xl font-black mb-4">Admin Login</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="mb-3 w-full p-3 border rounded" />
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="password" className="mb-3 w-full p-3 border rounded" />
        <Button type="submit" loading={loading} className="w-full">Sign in</Button>
      </form>
    </div>
  );
}
