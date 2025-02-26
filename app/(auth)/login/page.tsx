"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const { status, data: session } = useSession(); // ✅ On garde session pour vérifier après connexion
  const [error, setError] = useState<{
    global?: string;
    email?: string[];
    password?: string[];
  } | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("État de la session :", status, session); // ✅ Vérifie l'état de la session à chaque changement
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const response = await loginUser(formData);

    if (response?.error) {
      setError(response.error);
      return;
    }

    const signInResult = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    console.log("signInResult :", signInResult);

    // ✅ Si erreur "CredentialsSignin", on affiche un message plus clair
    if (signInResult?.error === "CredentialsSignin") {
      setError({ global: "Email ou mot de passe incorrect." });
      return;
    }

    setSuccess("Connexion réussie.");

    // ✅ Attendre et rafraîchir la session pour éviter `null`
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.refresh();

    setTimeout(() => {
      router.push("/");
    }, 1500);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      {success && <p className="text-green-600">{success}</p>}
      {error?.global && <p className="text-red-500">{error.global}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Se connecter
        </button>

        <Link href="/register">
          <p className="text-blue-500 text-center">
            Pas encore inscrit ? Créer un compte ici !
          </p>
        </Link>
      </form>
    </div>
  );
}
