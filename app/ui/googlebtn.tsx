"use client";
import {signIn} from "next-auth/react";

export default function GoogleBtn() {
  const handleclick = () => {
    signIn("google", {callbackUrl: "/example"});
  };

  return (
        <button onClick={handleclick} className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.493,4.657-5.373,8-11.303,8C12.972,36,4,27.028,4,16S12.972,4,24,4c3.657,0,7.071,1.293,9.707,3.707l6.904-6.904C34.971,2.171,29.657,0,24,0C10.745,0,0,10.745,0,24s10.745,24,24,24c13.255,0,24-10.745,24-24C48,22.659,47.971,21.417,43.611,20.083z"/>
          </svg>
          Sign in with Google
        </button>
    )
  }