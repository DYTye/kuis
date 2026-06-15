import { useState, useEffect } from "react";
import "./score.jsx";
import { Navigate, useNavigate } from "react-router-dom";

function Kuis() {
  const [hasilData, setHasilData] = useState([]);
  const [maintenance, setMaintenance] = useState(false);
  const [splash, setSplash] = useState(false);
  const [loading, setLoading] = useState(true);
  const [indexSoal, setIndexSoal] = useState(() => {
    const savedIndex = localStorage.getItem("soal_terakhir");

    return savedIndex ? Number(savedIndex) : 0;
  });
  const [tombol, setTombol] = useState(false);
  const [urutanOpsi, setUrutanOpsi] = useState([]);
  const [jawabanUser, setJawabanUser] = useState([]);
  const [totalNiai, setTotalNilai] = useState(() => {
    const savedScore = localStorage.getItem("score_terakhir");

    return savedScore ? Number(savedScore) : 0;
  });
  const [mulaiKuis, setMulaiKuis] = useState(false);
  const [waktu, SetWaktu] = useState(() => {
    const savedTimer = localStorage.getItem("timer_terakhir");

    return savedTimer ? Number(savedTimer) : 0;
  });
  const navigate = useNavigate();

  function ranInt() {
    const scale = [0, 1, 2, 3];
    const hasilAcak = [];
    for (let i = 0; i < 4; i++) {
      const potong = Math.floor(Math.random() * scale.length);
      const hasilPotong = scale.splice(potong, 1)[0];
      hasilAcak.push(hasilPotong);
    }
    setUrutanOpsi(hasilAcak);
  }
  function salahjawab() {
    setSplash(true);
    setTimeout(() => {
      setSplash(false);
    }, 100);
  }

  useEffect(() => {
    async function fetchApi() {
      try {
        const respons = await fetch(
          "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple&encode=url3986",
        );

        // const respons = await fetch("soal.json");
        const data = await respons.json();
        if (data.results && data.results.length > 0) {
          setHasilData(data.results);
          ranInt();
        }
      } catch {
        setLoading(false);
        setMaintenance(true);
        return;
      }

      if (indexSoal > 0) {
        setMulaiKuis(true);
      }

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
    if (indexSoal < 9) {
      const nextIndex = indexSoal + 1;
      setIndexSoal(nextIndex);
      localStorage.setItem("soal_terakhir", nextIndex);
    }
  }

  let SoalAktif =
    hasilData && hasilData.length > 0 ? hasilData[indexSoal] : null;
  let OpsiAktif = SoalAktif
    ? [SoalAktif.correct_answer, ...SoalAktif.incorrect_answers]
    : [];

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
    const kunciJawaban = decodeURIComponent(SoalAktif?.correct_answer);

    setJawabanUser([
      ...jawabanUser,
      {
        nomor: indexSoal,
        jawaban: decodeURIComponent(OpsiAktif[urutanOpsi[e]]),
      },
    ]);

    let score = totalNiai;
    console.log("tangkap jawaban:" + tangkapJawaban);
    if (tangkapJawaban === kunciJawaban) {
      score = totalNiai + 10;
      setTotalNilai(score);
      localStorage.setItem("score_terakhir", score);
    } else {
      salahjawab();
    }

    if (indexSoal === 9) {
      setTimeout(() => {
        navigate("/score", { state: { score: score } });
      }, 500);
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
  let iterasi = 1;

  useEffect(() => {
    if (!mulaiKuis) return;
    let mesinTimer;
    let timer_terakhir;
    const savedDetik = localStorage.getItem("timer_terakhir");
    let s = savedDetik ? Number(savedDetik) : 0;
    function timer() {
      if (s <= 120) {
        // console.log(s++);
        // console.log(menit + ":" + detik);
        s++;
      } else {
        clearInterval(mesinTimer);
        timeOut();
      }
      timer_terakhir = s;
      localStorage.setItem("timer_terakhir", timer_terakhir);
      const menit = Math.floor(timer_terakhir / 60);
      const detik = Math.floor(timer_terakhir % 60);
      SetWaktu(menit + ":" + detik);
    }

    mesinTimer = setInterval(() => {
      timer();
    }, 1000);
    return () => {
      clearInterval(mesinTimer);
    };
  }, [mulaiKuis]);

  function startKuis() {
    setMulaiKuis(true);
  }

  if (loading) {
    return (
      <div>
        <div className="h-screen bg-[#212326] flex items-center justify-center text-white text-2xl font-bold font-mono animate-pulse">
          Kuis Dadakan, Dead or Alive?
          <div className="hidden pointer-events-none absolute opacity-0 w-1 h-1 overflow-hidden">
            <img src="0.png" alt="preload" />
            <img src="1.png" alt="preload" />
            <img src="2.png" alt="preload" />
            <img src="3.png" alt="preload" />
            <img src="4.png" alt="preload" />
            <img src="5.png" alt="preload" />
            <img src="6.png" alt="preload" />
            <img src="bg.webp" alt="preload" />
          </div>
        </div>
      </div>
    );
  }
  if (maintenance) {
    return (
      <div>
        <div className="h-screen bg-[#212326] flex items-center justify-center text-white text-2xl font-bold font-mono ">
          Server Maintenance
        </div>
      </div>
    );
  }

  if (loading || hasilData.length === 0 || urutanOpsi === 0) {
    return (
      <div>
        <div className="h-screen bg-[#212326] flex items-center justify-center text-white text-2xl font-bold font-mono ">
          Loading Data
        </div>
      </div>
    );
  }
  if (!mulaiKuis) {
    return (
      <div className="relative  h-screen flex flex-col justify-center items-center gap-6 text-center px-4 ">
        <div className="absolute inset-0 bg-gray-900 bg-center h-screen flex flex-col justify-center items-center gap-6 text-center px-4"></div>

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
            onClick={() => {
              startKuis();
            }}
            className="mt-8 px-8 py-4 bg-[#831C91] hover:bg-[#D23B7B] hover:scale-105 transition-all text-white font-black text-xl rounded-2xl shadow-lg tracking-wider"
          >
            MULAI!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: "url('/bg.webp')" }}
      className=" bg-center scale  h-screen overflow-y-hidden space-y-3 font-mono"
    >
      <div
        className={`fixed inset-0 z-50 pointer-events-none bg-red-500 transition-opacity duration-150 ${
          splash ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="m-20 absolute top-0 left-0 font-bold text-3xl text-[#565e51]">
        SCORE : {totalNiai}
      </div>
      <div className="m-20 absolute top-0 right-0 font-bold text-3xl text-[#565e51]">
        {waktu}
      </div>

      <div className="h-1/2 flex justify-center mx-auto">
        <img src={ijep.stiker} alt="" className="h-230 w-full object-contain" />
      </div>
      <div className="max-w-sm  lg:max-w-fit relative w-fit mx-auto p-10 lg:p-20">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl"></div>
        <div className="mb-10 text-sm lg:text-xl font-bold text-center relative z-10 text-shadow-sm p-2 rounded-md text-white">
          {indexSoal + 1}.{decodeURIComponent(SoalAktif?.question)}
        </div>
        <div className="flex flex-col lg:flex-row gap-2 max-w-sm lg:max-w-fit mx-auto relative z-10">
          <button
            onClick={() => {
              jawabDanNiali(0);

              nextSoal();

              indexSoal != 9 ? ranInt() : null;
            }}
            className={`p-5 bg-green-900 text-white rounded-xl font-bold text-sm lg:text-xl hover:bg-green-700 drop-shadow-md drop-shadow-black cursor-pointer hover:scale-105`}
          >
            {decodeURIComponent(OpsiAktif[urutanOpsi[0]])}
          </button>
          <br />
          <button
            onClick={() => {
              jawabDanNiali(1);

              nextSoal();

              indexSoal != 9 ? ranInt() : null;
            }}
            className={`p-5 bg-green-900 text-white rounded-xl font-bold text-sm lg:text-xl hover:bg-green-700 drop-shadow-md drop-shadow-black cursor-pointer hover:scale-105`}
          >
            {decodeURIComponent(OpsiAktif[urutanOpsi[1]])}
          </button>
          <br />
          <button
            onClick={() => {
              jawabDanNiali(2);

              nextSoal();

              indexSoal != 9 ? ranInt() : null;
            }}
            className={`p-5 bg-green-900 text-white rounded-xl font-bold text-sm lg:text-xl hover:bg-green-700 drop-shadow-md drop-shadow-black cursor-pointer hover:scale-105`}
          >
            {decodeURIComponent(OpsiAktif[urutanOpsi[2]])}
          </button>
          <br />
          <button
            onClick={() => {
              jawabDanNiali(3);

              nextSoal();

              indexSoal != 9 ? ranInt() : null;
            }}
            className={`p-5 bg-green-900 text-white rounded-xl font-bold text-sm lg:text-xl hover:bg-green-700 drop-shadow-md drop-shadow-black cursor-pointer hover:scale-105`}
          >
            {decodeURIComponent(OpsiAktif[urutanOpsi[3]])}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Kuis;
