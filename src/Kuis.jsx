import { useState, useEffect } from "react";
import "./style.css";
import "./score.jsx";
import { Navigate, useNavigate } from "react-router-dom";

function Kuis() {
  const [hasilData, setHasilData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexSoal, setIndexSoal] = useState(0);
  const [tombol, setTombol] = useState(false);
  const [urutanOpsi, setUrutanOpsi] = useState([]);
  const [jawabanUser, setJawabanUser] = useState([]);
  const [totalNiai, setTotalNilai] = useState(0);
  const [mulaiKuis, setMulaiKuis] = useState(false);
  const [waktu, SetWaktu] = useState();
  const navigate = useNavigate();

  function ranInt() {
    const scale = [0, 1, 2, 3];
    const hasilAcak = [];
    for (let i = 0; i < 4; i++) {
      const potong = Math.floor(Math.random() * scale.length);
      const hasilPotong = scale.splice(potong, 1)[0];
      hasilAcak.push(hasilPotong);
      setUrutanOpsi(hasilAcak);
    }
    return setUrutanOpsi;
  }

  useEffect(() => {
    async function fetchApi() {
      // const respons = await fetch(
      //   "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple&encode=url3986",
      // );
      const respons = await fetch("soal.json");

      const data = await respons.json();
      setHasilData(data.results);

      ranInt();
      setLoading(false);
    }
    fetchApi();
  }, []);

  // useEffect(() => {
  //   console.log(totalNiai);
  //   console.log(
  //     decodeURIComponent("jawaban : " + hasilData[indexSoal]?.correct_answer),
  //   );
  //   console.log("index : " + indexSoal);
  // });

  function randColor() {
    const color = [
      "bg-[#D23B7B]",
      "bg-[#831C91]",
      "bg-[#462C7D]",
      "bg-[#212326]",
    ];
    const rc = Math.floor(Math.random() * color.length);
    const randColor = color[rc];
    return randColor;
  }

  function nextSoal() {
    if (indexSoal < 9) setIndexSoal(indexSoal + 1);
  }

  function prevSoal() {
    if (indexSoal > 0) setIndexSoal(indexSoal - 1);
  }

  let SoalAktif = hasilData[indexSoal];
  let OpsiAktif = SoalAktif
    ? [SoalAktif.correct_answer, ...SoalAktif.incorrect_answers]
    : [];

  function selesai() {
    if (jawabanUser.length === 10) {
      setTimeout(() => {
        navigate("/score", { state: { score: totalNiai } });
      }, 500);
    }
  }
  function timeOut() {
    setTotalNilai((x) => {
      setTimeout(() => {
        navigate("/score", { state: { score: x } });
      }, 500);
      return x;
    });
  }

  function jawabDanNiali(e) {
    const tangkapJawaban = decodeURIComponent(OpsiAktif[urutanOpsi[e]]);
    const kunciJawaban = SoalAktif?.correct_answer;

    setJawabanUser([
      ...jawabanUser,
      {
        nomor: indexSoal,
        jawaban: decodeURIComponent(OpsiAktif[urutanOpsi[e]]),
      },
    ]);

    let score = 0;
    console.log("tangkap jawaban:" + tangkapJawaban);
    if (tangkapJawaban === kunciJawaban) {
      setTotalNilai((score) => score + 10);
    }

    return totalNiai;
  }
  let comment = "";
  let stiker = "";
  function jejep() {
    if (totalNiai <= 10) {
      stiker = "0.png";
    } else if (totalNiai <= 20) {
      stiker = "1.png";
    } else if (totalNiai <= 30) {
      stiker = "2.png";
    } else if (totalNiai <= 40) {
      stiker = "3.png";
    } else if (totalNiai <= 60) {
      stiker = "4.png";
    } else if (totalNiai <= 80) {
      stiker = "5.png";
    } else {
      stiker = "6.png";
    }
    return { comment, stiker };
  }
  const ijep = jejep();

  useEffect(() => {
    let s = 1;
    let mesinTimer;
    function timer() {
      const menit = Math.floor(s / 60);
      const detik = Math.floor(s % 60);
      if (s <= 120) {
        // console.log(s++);
        // console.log(menit + ":" + detik);
        s++;
      } else {
        clearInterval(mesinTimer);
        timeOut();
      }
      SetWaktu(menit + ":" + detik);
    }

    mesinTimer = setInterval(() => {
      timer();
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-[#212326] flex items-center justify-center text-white text-2xl font-bold font-mono animate-pulse">
        Kuis Dadakan, Dead or Alive?
      </div>
    );
  }
  if (!mulaiKuis) {
    return (
      <div className="relative  h-screen flex flex-col justify-center items-center gap-6 text-center px-4 ">
        <div className="absolute inset-0 bg-gray-900 bg-center h-screen flex flex-col justify-center items-center gap-6 text-center px-4 animate-pulse [animation-duration:3000ms]"></div>

        <div className="max-w-xl bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl">
          <h1 className="text-3xl font-black text-pink-500 tracking-widest mb-4">
            WARNING!!!
          </h1>

          <div className="text-amber-50 font-medium text-lg space-y-3 font-mono">
            <p>
              "Mr.Frank.. Begitu orang menyebutnya. Disebutkan di sebuah legenda
              bahwa beliau sudah membuat puluhan Mahasiswa LP"
            </p>
            <p>
              "Mendengar langkah kakinya saja bisa membuat kamu keringat dingin,
              hawa keberadaannya dapat dirasakan dalam radius 2KM"
            </p>
            <p>
              "Mr.Frank siap menghancurkan pagi cerahmu dengan Kuis dadakanya,
              apakah kamu siap menghadapi situasi HIDUP/MATI ini?"
            </p>
          </div>

          <button
            onClick={() => setMulaiKuis(true)}
            className="mt-8 px-8 py-4 bg-[#831C91] hover:bg-[#D23B7B] hover:scale-105 transition-all text-white font-black text-xl rounded-2xl shadow-lg tracking-wider"
          >
            MULAI!
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ backgroundImage: "url('/bg.png')" }} className=" bg-center scale  h-screen overflow-y-hidden">
      <div className="m-20 absolute top-0 left-0 font-bold text-3xl text-green-900">
        SCORE : {totalNiai}
      </div>
      <div className="m-20 absolute top-0 right-0 font-bold text-3xl text-green-900">
        {waktu}
      </div>

      <div className="h-1/2 flex justify-center mx-auto">
        <img src={ijep.stiker} alt="" className="h-230 w-full object-contain" />
      </div>
      <div className="max-w-sm  lg:max-w-fit relative w-fit mx-auto p-10 lg:p-20">
        <div></div>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl"></div>
        <div className="mb-10 text-sm lg:text-2xl font-bold text-center relative z-10 text-shadow-sm p-2 rounded-md underline underline-offset-2">
          {decodeURIComponent(SoalAktif?.question)}
        </div>
        {selesai()};
        <div className="flex flex-col lg:flex-row gap-2 max-w-sm lg:max-w-fit mx-auto relative z-10">
          <button
            onClick={() => {
              jawabDanNiali(0);
              {
                nextSoal();
              }
              {
                indexSoal != 9 ? ranInt() : null;
              }
            }}
            className={`p-5 bg-green-900 text-white rounded-xls font-bold text-sm lg:text-xl hover:bg-green-700 drop-shadow-md drop-shadow-black`}
          >
            {decodeURIComponent(OpsiAktif[urutanOpsi[0]])}
          </button>
          <br />
          <button
            onClick={() => {
              jawabDanNiali(1);
              {
                nextSoal();
              }
              {
                indexSoal != 9 ? ranInt() : null;
              }
            }}
            className={`p-5 bg-green-900 text-white rounded-xls font-bold text-sm lg:text-xl hover:bg-green-700 drop-shadow-md drop-shadow-black`}
          >
            {decodeURIComponent(OpsiAktif[urutanOpsi[1]])}
          </button>
          <br />
          <button
            onClick={() => {
              jawabDanNiali(2);
              {
                nextSoal();
              }
              {
                indexSoal != 9 ? ranInt() : null;
              }
            }}
            className={`p-5 bg-green-900 text-white rounded-xls font-bold text-sm lg:text-xl hover:bg-green-700 drop-shadow-md drop-shadow-black`}
          >
            {decodeURIComponent(OpsiAktif[urutanOpsi[2]])}
          </button>
          <br />
          <button
            onClick={() => {
              jawabDanNiali(3);
              {
                nextSoal();
              }
              {
                indexSoal != 9 ? ranInt() : null;
              }
            }}
            className={`p-5 bg-green-900 text-white rounded-xls font-bold text-sm lg:text-xl hover:bg-green-700 drop-shadow-md drop-shadow-black`}
          >
            {decodeURIComponent(OpsiAktif[urutanOpsi[3]])}
          </button>
        </div>
      </div>
      <div className="hidden pointer-events-none absolute opacity-0 w-1 h-1 overflow-hidden">
        <img src="0.png" alt="preload" />
        <img src="6.png" alt="preload" />
        <img src="10.png" alt="preload" />
        <img src="bgini.webp" alt="preload" />
      </div>
    </div>
  );
}
export default Kuis;
