from typing import Any, Dict
import numpy as np
try:
    from ultralytics import YOLO
except Exception: 
    YOLO = None 
    
class Detector:
    def __init__(self, weights: str):
        if YOLO is None:
            raise RuntimeError("ultralytics (YOLO) not installed. `pip install ultralytics`")
        self.model = YOLO(weights)
        self.target_names = set([ "license-plate", "plate", "License_Plate" , "0" , "license_plate"])

    def detect_plate(self, image_bgr: np.ndarray) -> Dict[str, Any] | None:
        results = self.model.predict(image_bgr, verbose=False)
        if not results or len(results[0].boxes) == 0:
            return None
        names = results[0].names
        for i, b in enumerate(results[0].boxes):
            cls_id = int(b.cls[0])
            cls_name = names.get(cls_id, str(cls_id)).lower()
            if cls_name in self.target_names:
                x1, y1, x2, y2 = map(int, b.xyxy[0].tolist())
                return {"bbox": (x1, y1, x2, y2)}
        return None
