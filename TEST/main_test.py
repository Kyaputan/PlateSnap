import cv2  
import os, time
from ultralytics import YOLO

model = YOLO("./model/guard.onnx")
parsed = []
results = model.predict("./video/20250815_131147.mp4", conf=0.7, save=True)

def parse_results(results, margin: int = 10):
    parsed = []
    names = results.names
    h, w = results.orig_shape
    for box in results.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        cls_id = int(box.cls[0])
        cls_name = names[cls_id]
        x1 = max(0, x1 - margin)
        y1 = max(0, y1 - margin)
        x2 = min(w - 1, x2 + margin)
        y2 = min(h - 1, y2 + margin)
        parsed.append({"bbox": (x1, y1, x2, y2),"class": cls_name})
    return parsed


parsed = parse_results(results)
print(parsed)