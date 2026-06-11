import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Kuis from "./Kuis.jsx";
import Score from "./score.jsx";
// import Score from "./score.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/kuis" />} />
        <Route path="/kuis" element={<Kuis />}/>
        <Route path="score" element={<Score/>}/>
        {/* <Route path="/score" element={<Score />}/> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;