import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <section className="w-full max-w-3xl text-center space-y-6">
        <img src="/logo.png" alt="PlateSnap" className="mx-auto h-14 w-auto" />

        <h1
          className="text-3xl font-semibold"
          style={{ color: "var(--brand, #B9375D)" }}
        >
          PlateSnap — Home
        </h1>

        <p className="text-gray-600">
          หน้านี้เอาไว้เทสการทำงานของ Router และธีมสี
          ถ้ากดปุ่มด้านล่างแล้วไปหน้า Plate Manager ได้ แปลว่าโอเคแล้ว ✅
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/plates"
            className="rounded-xl px-4 py-2 text-white"
            style={{ background: "var(--brand, #B9375D)" }}
          >
            ไปที่ Plate Manager
          </Link>

          <Link
            to="/"
            className="rounded-xl px-4 py-2 border"
            style={{ borderColor: "var(--surface, #E7D3D3)" }}
          >
            รีเฟรชหน้านี้
          </Link>
        </div>

        {/* กล่องสรุปเล็กๆ สำหรับเทสสไตล์ */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className="rounded-2xl border p-4 text-left"
            style={{ borderColor: "var(--surface, #E7D3D3)" }}
          >
            <div className="text-sm text-gray-500">Status</div>
            <div className="text-lg font-medium">OK</div>
          </div>

          <div
            className="rounded-2xl border p-4 text-left"
            style={{ borderColor: "var(--surface, #E7D3D3)" }}
          >
            <div className="text-sm text-gray-500">Plates</div>
            <div className="text-lg font-medium">0 records</div>
          </div>

          <div
            className="rounded-2xl border p-4 text-left"
            style={{ borderColor: "var(--surface, #E7D3D3)" }}
          >
            <div className="text-sm text-gray-500">Version</div>
            <div className="text-lg font-medium">dev</div>
          </div>
        </div>
      </section>
    </div>
  );
}
