import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold underline">PlateSnap</h1>
        <img src={reactLogo} className="logo m-3" alt="React logo" />
        <img src={viteLogo} className="logo m-3" alt="Vite logo" />
      </div>
    </>
  );
}

export default App;
