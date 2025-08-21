from sqlalchemy.orm import Session
from app.core.config import settings
from app.services.detector import Detector
from app.services.ocr import OCR
from app.utils.image import crop_xyxy

class PlatePipeline:
    def __init__(self):
        self.detector = Detector(settings.YOLO_MODEL_PATH)
        self.ocr = OCR(settings.OCR_ENGINE)

    def process(self, img_bgr, db: Session):
        det = self.detector.detect_plate(img_bgr)
        if not det:
            return None
        crop = crop_xyxy(img_bgr, det["bbox"])
        license_txt, province = self.ocr.read_plate(crop)
        license_txt = (license_txt or "").strip()
        province = (province or "").strip()
        if not license_txt or not province:

            return {"license": license_txt, "province": province, "allowed": False}

        from app.models.vehicle import Vehicle
        q = db.query(Vehicle).filter(Vehicle.license == license_txt, Vehicle.province == province).first()
        allowed = bool(q.allowed) if q else False
        return {"license": license_txt, "province": province, "allowed": allowed}



