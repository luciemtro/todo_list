"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Déconnexion
    </button>
  );
}
