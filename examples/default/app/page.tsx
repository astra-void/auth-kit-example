'use client';

import { logout, useSession } from "@astra-void/auth-kit/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Email/Password Auth Example</h1>
      <h2>
        <Link className='text-blue-500 hover:underline focus:text-blue-700 text-xl font-semibold' href="https://auth-kit-documentation.vercel.app/">
          Full Documentation
        </Link>
      </h2>
      <span className="text-sm text-gray-500">Status: {session.status}</span>
      <span>Current session: {session.user ? session.user.id : "Not logged in"}</span>
      {session.user ? (
        <div>
          <button 
            className="bg-indigo-500 text-white p-2 mx-4 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ): (
        <div>
          <button 
            className="bg-indigo-500 text-white p-2 mx-4 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
          <button 
            className="bg-indigo-500 text-white p-2 mx-4 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => router.push('/register')}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}
