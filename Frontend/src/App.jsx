import Navbar from "./components/Nav";
import Home from "./pages/Home";
import Manager from "./pages/Manager";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plates" element={<Manager />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
