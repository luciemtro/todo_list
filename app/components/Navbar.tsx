import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Ma To-Do List</h1>
        {session ? (
          <div className="flex items-center gap-4">
            <p className="text-white">Bienvenue, {session.user?.name}</p>
            <SignOutButton />
          </div>
        ) : (
          <a href="/login" className="text-blue-400">
            Se connecter
          </a>
        )}
      </div>
    </nav>
  );
}
