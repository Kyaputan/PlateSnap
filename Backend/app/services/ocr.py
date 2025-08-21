from typing import Tuple
import numpy as np
import logging
import re
from pythainlp.spell import correct
import difflib
log = logging.getLogger("app.ocr")

provinces_corrector = [
    "กรุงเทพมหานคร","กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น","จันทบุรี","ฉะเชิงเทรา","ชลบุรี","ชัยนาท",
    "ชัยภูมิ","ชุมพร","เชียงราย","เชียงใหม่","ตรัง","ตราด","ตาก","นครนายก","นครปฐม","นครพนม","นครราชสีมา","นครศรีธรรมราช",
    "นครสวรรค์","นนทบุรี","นราธิวาส","น่าน","บึงกาฬ","บุรีรัมย์","ปทุมธานี","ประจวบคีรีขันธ์","ปราจีนบุรี","ปัตตานี",
    "พระนครศรีอยุธยา","พังงา","พัทลุง","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","พะเยา","ภูเก็ต","มหาสารคาม",
    "มุกดาหาร","แม่ฮ่องสอน","ยโสธร","ยะลา","ร้อยเอ็ด","ระนอง","ระยอง","ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย",
    "ศรีสะเกษ","สกลนคร","สงขลา","สตูล","สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร","สระแก้ว","สระบุรี","สิงห์บุรี",
    "สุโขทัย","สุพรรณบุรี","สุราษฎร์ธานี","สุรินทร์","หนองคาย","หนองบัวลำภู","อ่างทอง","อุดรธานี","อุตรดิตถ์",
    "อุทัยธานี","อุบลราชธานี","อำนาจเจริญ"
]


def _normalize_text(s: str) -> str:
    s = s.replace("\n", " ").replace("\r", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s


class OCR:
    def __init__(self, engine: str = "easyocr"):
        self.engine = engine
        if engine == "easyocr":
            try:
                import easyocr  # type: ignore
                self.reader = easyocr.Reader(["en", "th"], gpu=False)
            except Exception as e:  # pragma: no cover
                raise RuntimeError("Install easyocr to use this engine: pip install easyocr") from e
        elif engine == "tesseract":
            try:
                import pytesseract  # type: ignore
                self.reader = pytesseract
            except Exception as e:  # pragma: no cover
                raise RuntimeError("Install tesseract & pytesseract to use this engine") from e
        else:
            raise ValueError("Unknown OCR engine")

    def read_plate(self, crop_bgr: np.ndarray) -> Tuple[str, str]:
        if self.engine == "easyocr":
            res = self.reader.readtext(crop_bgr, detail=0, paragraph=True)
            text = " ".join(res).strip()
        else:
            text = self.reader.image_to_string(crop_bgr, lang="tha+eng")
        text = _normalize_text(text)
        log.info(f"OCR raw: {text!r}")

        m = re.match(r"^([ก-ฮ]{1,2}\s?\d{1,4})\s+(.+)$", text)
        if m:
            license_txt = _normalize_text(m.group(1))
            province = _normalize_text(m.group(2))
            province_correct = correct(province)
            match = difflib.get_close_matches(province, provinces_corrector, n=1, cutoff=0.6)
            if match:
                province_correct = match[0]
        else:
            parts = text.split()
            license_txt = parts[0] if parts else ""
            province = parts[-1] if len(parts) > 1 else ""
            province_correct = correct(province)
            match = difflib.get_close_matches(province, provinces_corrector, n=1, cutoff=0.6)
            if match:
                province_correct = match[0]
        
        return license_txt, province_correct
