import { Navigate, useLocation, useNavigate } from "react-router-dom";

function score() {
  const location = useLocation();
  const scoreUser = location.state?.score;
  let comment = "";
  let stiker = "";
  function jejep() {
    if (scoreUser <= 60) {
      comment = "Ente yakin ini nilai?";
      stiker = "0.png";
    } else if (scoreUser <= 80) {
      comment = "Dinyatakan Lulus Oleh Frank";
      stiker = "4.png";
    } else {
      comment = "Mahasiswa Teladan";
      stiker = "6.png";
    }
    return { comment, stiker };
  }
  const ijep = jejep();

  return (
    <div style={{ backgroundImage: "url('/bg.png')" }} className=" bg-center scale  h-screen  flex flex-col items-center justify-center">
      <div className="h-1/2 flex justify-center mx-auto">
        <img src={ijep.stiker} alt="" className="h-230 w-full object-contain animate-[float_3s_ease-in-out_infinite] [@keyframes_float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}]" />
      </div>
      <div className="w-full h-1/3 relative w-fit mx-auto p-10 lg:p-20">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl"></div>
        <div className="text-lg lg:text-2xl font-bold text-center relative z-10 ">
          <div className="flex flex-col gap-2 text-xl lg:text-5xl">
            <div>NILAI KAMU {scoreUser}</div>
            <div>{ijep.comment}</div>
          </div>
        </div>
      </div>

      <div className="text-xl font bold text-amber-50"></div>
    </div>
  );
}
export default score;
