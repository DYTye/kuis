import "./style.css";
import {
  useAuth,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { useEffect } from "react";

function login() {
  const { isSignedIn } = useAuth(); 
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isSignedIn) {
      navigate("/kuis");
    }
  }, [isSignedIn, navigate]);
  return (
    <>
      <header>
        <div className="relative  h-screen flex flex-col justify-center items-center gap-6 text-center px-4 ">
          <div className="absolute inset-0 bg-gray-900 bg-center h-screen flex flex-col justify-center items-center gap-6 text-center px-4"></div>

          <div className="max-w-xl bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl">
            <div className="text-amber-50 font-medium text-lg space-y-3 font-mono">
              <h1 className="text-2xl font-bold text-white font-mono">
                Welcome To Sidang With Frank
              </h1>
              <Show when="signed-out">
                <div className="flex flex-col">
                  <SignInButton>
                    <button className="mt-8 px-8 py-4 bg-[#831C91] hover:bg-[#D23B7B] hover:scale-105 transition-all text-white font-black text-xl rounded-2xl shadow-lg tracking-wider">
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="mt-8 px-8 py-4 bg-[#831C91] hover:bg-[#D23B7B] hover:scale-105 transition-all text-white font-black text-xl rounded-2xl shadow-lg tracking-wider">
                      Register
                    </button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default login;
