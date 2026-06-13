import { StrictMode } from "react";
import "./style.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { ClerkProvider } from "@clerk/react";
import { createRoot } from "react-dom/client";
import Login from "./Login";
import Kuis from "./Kuis";
import Score from "./score"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

function RootLayout() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      forceRedirectUrl="/kuis" 
      signUpForceRedirectUrl="/kuis"
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kuis" element={<Kuis />} />
        <Route path="/score" element={<Score />}></Route>
      </Routes>
    </ClerkProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RootLayout />
    </BrowserRouter>
  </StrictMode>,
);
