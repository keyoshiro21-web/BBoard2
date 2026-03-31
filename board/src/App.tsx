import "./Styles/Styles.css";
import "./modal/styles/Style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./workSpace/MainSpaice";
import { WorkSpace } from "./workSpace/WorkSpace";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace/:id" element={<WorkSpace />} />
      </Routes>
    </BrowserRouter>
  );
}
