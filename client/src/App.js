import { BrowserRouter, Routes, Route } from "react-router-dom";

import Compiler from "./Components/Compiler";
import MyTabel from "./Components/Tabel";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Compiler />} />
          <Route path="/activity" element={<MyTabel />} />
        </Routes>
      </BrowserRouter>
      ;
    </div>
  );
}

export default App;
