import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  useAuth,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  SignOutButton,
} from "@clerk/react";
import { useEffect } from "react";

function score() {
  useEffect(() => {
    localStorage.removeItem("soal_terakhir");
    localStorage.removeItem("score_terakhir");
    localStorage.removeItem("timer_terakhir");
  }, []);

  const location = useLocation();
  const totalSkor =
    location.state?.score ?? localStorage.getItem("score_terakhir");
  let comment = "";
  let stiker = "";
  function jejep() {
    if (totalSkor <= 60) {
      comment = "Ente yakin ini nilai?";
      stiker = "0.png";
    } else if (totalSkor <= 80) {
      comment = "Dinyatakan Lulus Oleh Frank";
      stiker = "4.png";
    } else {
      comment = "Papah bangga sama kamu nak!";
      stiker = "6.png";
    }
    return { comment, stiker };
  }
  const ijep = jejep();

  return (
    <div
      style={{ backgroundImage: "url('/bg.webp')" }}
      className=" bg-center scale  h-screen  flex flex-col items-center justify-center"
    >
      <div className="h-1/2 flex justify-center mx-auto">
        <img
          src={ijep.stiker}
          alt=""
          className="h-230 w-full object-contain "
        />
      </div>
      <div className="h-1/3 relative w-fit mx-auto p-10 lg:p-20">
        <div className="absolute inset-0 bg-black/40  backdrop-blur-sm rounded-3xl"></div>
        <div className="text-lg lg:text-2xl font-bold text-center relative z-10 ">
          <div className="flex flex-col gap-2 text-xl lg:text-5xl text-white font-mono">
            <div>NILAI KAMU {totalSkor}</div>
            <div>{ijep.comment}</div>
          </div>
        </div>
      </div>
      <SignOutButton>
        <button className=" mt-5 bg-green-900 p-5 rounded-xl text-2xl text-white font-mono font-bold cursor-pointer hover:bg-green-800 hover:scale-105">
          Sign Out
        </button>
      </SignOutButton>

      <div className="text-xl font bold text-amber-50"></div>
    </div>
  );
}
export default score;
