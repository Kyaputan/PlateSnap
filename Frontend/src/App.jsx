// src/App.jsx
import { useState } from "react";
import Card from "./components/Card";
import Field from "./components/Fieldcard";
import Navbar from "./components/Nav";

const COLORS = {
  primary: "#B9375D", // แบรนด์/หัวข้อ/ปุ่ม
  accent:  "#D25D5D", // hover/เน้น
  surface: "#E7D3D3", // เส้น/ขอบ/แผ่ว
  muted:   "#EEEEEE", // พื้นหลังบางส่วน
  gray:    "#737373", // เทา
};

export default function App() {
  const [plate, setPlate] = useState("");
  const [province, setProvince] = useState("");

  const canSave = plate.trim() !== "" && province.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ plate, province });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Card title="เพิ่มทะเบียน">
          <form onSubmit={handleSubmit} className="w-full">
            <Field
              label="หมายเลขทะเบียน"
              placeholder="กรอกหมายเลขทะเบียน"
              value={plate}
              onChange={setPlate}
            />
            <Field
              label="จังหวัด"
              placeholder="กรอกจังหวัด"
              value={province}
              onChange={setProvince}
            />

            <div className="grid grid-cols-[140px_1fr] items-center">
              <span />
              <button
                type="submit"
                disabled={!canSave}
                className="mt-2 inline-flex items-center justify-center rounded-lg px-5 py-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: canSave ? COLORS.primary : COLORS.surface,
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  if (canSave) e.currentTarget.style.backgroundColor = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  if (canSave) e.currentTarget.style.backgroundColor = COLORS.primary;
                }}
              >
                บันทึก
              </button>
            </div>
          </form>
        </Card>
      </main>

      <div style={{ backgroundColor: COLORS.muted }} className="h-[2px] w-full" />
    </div>
  );
}