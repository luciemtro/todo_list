"use client";

import { useState } from "react";
import { registerUser } from "@/actions/authAction";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState<{
    name?: string[];
    email?: string[];
    password?: string[];
    global?: string;
  } | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const response = await registerUser(formData);

    if (response.error) {
      setError(response.error);
    } else {
      setSuccess(response.success);
      router.push("/login");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      {success && <p className="text-green-600">{success}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          className="border p-2 rounded"
        />
        {error?.name && <p className="text-red-500">{error.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        {error?.email && <p className="text-red-500">{error.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="border p-2 rounded"
        />
        {error?.password && <p className="text-red-500">{error.password}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
}
