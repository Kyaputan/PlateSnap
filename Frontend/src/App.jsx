// src/App.jsx
import { useState } from "react";

// สีหลักรวบไว้ที่เดียว แก้ทีเดียวทั้งแอป
const COLORS = {
  primary: "#B9375D", // แบรนด์/หัวข้อ/ปุ่ม
  accent:  "#D25D5D", // hover/เน้น
  surface: "#E7D3D3", // เส้น/ขอบ/แผ่ว
  muted:   "#EEEEEE", // พื้นหลังบางส่วน
  gray:    "#737373", // เทา
};

// ---------- UI Building Blocks ----------
function Navbar() {
  // ====== ปรับสองค่านี้เพื่อย้ายเมนูตามใจ ======
  const MENU_ALIGN = "left";   // "left" | "center" | "right"
  const MENU_OFFSET_PX = 50;    // ตัวเลขบวก/ลบ ขยับละเอียดเป็น px
  // ============================================

  const alignClass =
    MENU_ALIGN === "center" ? "justify-center"
      : MENU_ALIGN === "right" ? "justify-end"
      : "justify-start";

  return (
    <header className="sticky top-0 z-10 bg-white border-b-4 border-soft">
      {/* Grid 3 คอลัมน์: [ซ้าย | กลาง | ขวา] */}
      <div className="w-full grid grid-cols-[auto_1fr_auto] items-center pl-2 pr-4 py-3 gap-2">
        {/* ซ้าย: โลโก้ + ชื่อ */}
        <div className="flex items-center">
          <img src="/logo.png" alt="PlateSnap" className="h-9 w-auto shrink-0" />
          <span className="ml-2 font-semibold text-lg text-primary">PlateSnap</span>
        </div>

        {/* กลาง: แทร็กสำหรับวางเมนู (ขยับได้อิสระ) */}
        <div className={`relative flex ${alignClass} col-start-2`}>
          <nav
            className="relative flex items-center gap-6 text-sm"
            style={{ left: MENU_OFFSET_PX }}
          >
            <a
              href="#"
              className="
                relative
                text-[#5d5d5d] hover:text-[#B9375D] transition-colors
                after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0
                after:bg-[#B9375D] after:transition-all hover:after:w-full
              "
            >
              Home
            </a>

            <a
              href="#"
              className="
                relative
                text-[#5d5d5d] hover:text-[#B9375D] transition-colors
                after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0
                after:bg-[#B9375D] after:transition-all hover:after:w-full
              "
            >
              Plate Manager
            </a>

          </nav>
        </div>

        {/* ขวา: User + Login */}
        <div className="flex items-center gap-3">
          <span className="text-xs md:text-sm">
            User : <span className="text-primary">Manager</span>
          </span>
          <button
            type="button"
            className="btn-outline px-3 py-1 rounded-full border text-sm border-accent text-accent bg-white hover:bg-soft transition"
          >
            Log in
          </button>
        </div>
      </div>
    </header>
  );
}


function PageCard({ title, children }) {
  return (
    <section className="mx-auto max-w-xl w-full">
      <h1 className="text-center text-2xl font-semibold mb-6"
          style={{ color: COLORS.primary }}>
        {title}
      </h1>

      <div className="rounded-2xl bg-white p-6 shadow-sm border"
           style={{ borderColor: COLORS.surface }}>
        {children}
      </div>
    </section>
  );
}

function Field({ label, placeholder, value, onChange }) {
  return (
    <label className="grid grid-cols-[140px_1fr] items-center gap-4 mb-4">
      <span className="text-gray-700">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-4 py-2 outline-none border bg-white focus:ring-2"
        // ใช้สีตามดีไซน์
        style={{
          borderColor: COLORS.surface,
          boxShadow: "inset 0 0 0 9999px rgba(0,0,0,0)", // กัน webkit เปลี่ยนสีพื้น
        }}
        onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
        onBlur={(e) => (e.target.style.borderColor = COLORS.surface)}
      />
    </label>
  );
}

// ---------- Page ----------
export default function App() {
  const [plate, setPlate] = useState("");
  const [province, setProvince] = useState("");

  const canSave = plate.trim() !== "" && province.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    // ยังไม่ต้องเชื่อม API: เตรียมค่าพร้อมส่ง
    console.log({ plate, province });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <PageCard title="เพิ่มทะเบียน">
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
              <span />{/* ช่องว่างให้ปุ่มตรงแนวอินพุต */}
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
        </PageCard>
      </main>
    </div>
  );
}
