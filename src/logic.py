import cv2
from config import  ALERT_CLASSES, SNAPSHOT_DIR, PHONE_HOLD_SECONDS , CROP_FRAME
import os, time
from typing import List, Dict, Tuple
from router import notify_violation

def draw_person_status(frame, results):
    alerts = 0
    normals = 0
    has_alert = False

    color_map = {
        "Normal": (0, 255, 0),
        "Phone":  (0, 0, 255)}

    for i, r in enumerate(results):
        x1, y1, x2, y2 = r["bbox"]
        cls_name = r["class"]

        color = color_map.get(cls_name, (255, 255, 255))
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        cv2.putText(frame, f"Person {i+1}: {cls_name}",
                    (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

        if cls_name.lower() == "phone":
            alerts += 1
            has_alert = True
        else:
            normals += 1

    cv2.putText(frame, f"Alert: {alerts}",  (10, 30),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255 if alerts > 0 else 0), 2)
    cv2.putText(frame, f"Normal: {normals}", (10, 60),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
    return has_alert

def _iou(a: Tuple[int,int,int,int], b: Tuple[int,int,int,int]) -> float:
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    inter_x1 = max(ax1, bx1); inter_y1 = max(ay1, by1)
    inter_x2 = min(ax2, bx2); inter_y2 = min(ay2, by2)
    iw = max(0, inter_x2 - inter_x1); ih = max(0, inter_y2 - inter_y1)
    inter = iw * ih
    if inter == 0: return 0.0
    a_area = max(0, ax2 - ax1) * max(0, ay2 - ay1)
    b_area = max(0, bx2 - bx1) * max(0, by2 - by1)
    union = a_area + b_area - inter
    return inter / union if union > 0 else 0.0

