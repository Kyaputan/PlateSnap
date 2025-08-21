// กล่องกล้องพร้อม Placeholder รอสตรีม
export default function CameraCard({
    title = "Camera Real-Time",
    camera = "1",
    streamUrl = null, // ใส่ URL ทีหลัง เช่น http://127.0.0.1:8000/stream
  }) {
    return (
      <section className="mx-auto w-full max-w-3xl">
        <div
          className="rounded-3xl p-6 md:p-8 text-white shadow-[0_10px_24px_rgba(0,0,0,0.15)]"
          style={{ backgroundColor: "#7A334C" }} // maroon เข้ม
        >
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-white/80 mt-1">Camera : {camera}</p>
  
          <div className="mt-4 rounded-xl bg-white p-2">
            <div
              className="relative aspect-video rounded-md overflow-hidden border bg-white"
              style={{ borderColor: "#E7D3D3" }}
            >
              {/* พื้นที่ภาพ: ใส่สตรีมเมื่อพร้อม */}
              {streamUrl ? (
                <img src={streamUrl} alt="Camera stream" className="w-full h-full object-contain" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-500">
                  <div className="animate-pulse text-sm">Waiting for stream…</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
  