import { signIn } from "next-auth/react";
import React from "react"

export const NotSignedIn = () => (
    <div className="flex h-screen w-full justify-center">
      <div className="mt-5">
        <button 
          className="bg-blue-500 font-bold rounded-full py-2 px-4" 
          onClick={() => signIn()}
        >Sign in
        </button>
      </div>
    </div>
  ); 