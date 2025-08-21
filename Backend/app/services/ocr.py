from typing import Tuple
import numpy as np
import logging
import re
log = logging.getLogger("app.ocr")

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
        else:
            parts = text.split()
            license_txt = parts[0] if parts else ""
            province = parts[-1] if len(parts) > 1 else ""

        return license_txt, province
