import { useState } from "react";
import Card from "../components/Card";
import Field from "../components/Fieldcard";

const COLORS = {
  primary: "#B9375D",
  surface: "#E7D3D3"
};

export default function Manager() {
    const [plate, setPlate] = useState("");
    const [province, setProvince] = useState("");
  
    const canSave = plate.trim() !== "" && province.trim() !== "";
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ plate, province });
    };
  
    return (
      <div className="min-h-screen bg-white">
  
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
                <div className="col-span-2 flex justify-end">{/* left|center|end */}
                  <button
                    type="submit"
                    disabled={!canSave}
                    className="w-fit rounded-lg px-5 py-2 font-medium transition duration-150
                   active:opacity-40 active:scale-95 active:animate-pulse
                   disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: canSave ? "#B9375D" : "#E7D3D3", color: "white" }}
                  >
                    บันทึก
                  </button>
                </div>
              </div>
  
            </form>
          </Card>
        </main>
      </div>
    );
  }