// src/pages/Home.jsx
export default function Home() {
    // ใส่ URL สตรีมเมื่อพร้อม เช่น "http://127.0.0.1:8000/stream"
    const streamUrl = null;
  
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <section className="mx-auto w-full max-w-3xl">
          {/* การ์ดครอบกล้อง */}
          <div
            className="rounded-3xl p-6 md:p-8 text-white shadow-[0_10px_24px_rgba(0,0,0,0.15)]"
            style={{ backgroundColor: "#7A334C" }}
          >
            <h2 className="text-2xl font-semibold">Camera Real-Time</h2>
            <p className="mt-1 text-white/80">Camera : 1</p>
  
            {/* เฟรมกล้อง (ไม่มีข้อความในกล้อง) */}
            <div className="mt-4 rounded-xl bg-white p-2">
              <div
                className="relative aspect-video rounded-lg overflow-hidden border bg-[#F7F7F7]"
                style={{ borderColor: "#E7D3D3" }}
              >
                {streamUrl ? (
                  // เปลี่ยนเป็น <video> ได้ถ้าเป็น HLS/MP4
                  <img
                    src={streamUrl}
                    alt=""
                    className="w-full h-full object-contain select-none"
                  />
                ) : (
                  // ว่างเปล่า (ไม่มีข้อความ)
                  <div className="w-full h-full" />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  