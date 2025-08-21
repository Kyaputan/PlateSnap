function Navbar() {
    return (
      <header
        className="
          sticky top-0 z-10 bg-white relative
          shadow-[0_8px_22px_rgba(0,0,0,0.06)]
          after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0
          after:h-[2px] after:bg-[linear-gradient(90deg,transparent,#E7D3D3,transparent)]
        "
      >
        <div className="w-full px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo + Brand */}
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="PlateSnap" className="h-9 w-auto" />
              <span className="font-semibold text-lg" style={{ color: "#B9375D" }}>
                PlateSnap
              </span>
            </div>
  
            {/* Menu (ชิดโลโก้) */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a
                href="#"
                className="
                  relative text-[#737373] hover:text-[#B9375D] transition-colors
                  after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0
                  after:bg-[#B9375D] after:transition-all hover:after:w-full
                "
              >
                Home
              </a>
  
              {/* ใส่ data-active ถ้าอยากให้ขีดเส้นใต้ค้างหน้า Plate Manager */}
              <a
                href="#"
                data-active="true"
                className="
                  relative text-[#737373] hover:text-[#B9375D] transition-colors
                  after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0
                  after:bg-[#B9375D] after:transition-all hover:after:w-full
                  data-[active=true]:text-[#B9375D]
                  data-[active=true]:after:w-full
                "
              >
                Plate Manager
              </a>
            </nav>
          </div>
  
          {/* User + Login (ยังไม่ทำงาน) */}
          <div className="flex items-center gap-3">
            <span className="text-xs md:text-sm">
              User : <span style={{ color: "#B9375D" }}>Manager</span>
            </span>
            <button
              type="button"
              className="px-3 py-1 rounded-full border text-sm"
              style={{
                borderColor: "#D25D5D",
                color: "#D25D5D",
                backgroundColor: "white",
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </header>
    );
  }
  
  export default Navbar;
  