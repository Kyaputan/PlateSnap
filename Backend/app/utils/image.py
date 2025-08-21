import cv2
import numpy as np

def read_image_from_bytes(b: bytes) -> np.ndarray:
    np_arr = np.frombuffer(b, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Invalid image bytes")
    return img

def crop_xyxy(img: np.ndarray, bbox):
    x1, y1, x2, y2 = bbox
    h, w = img.shape[:2]
    x1 = max(0, min(x1, w - 1))
    y1 = max(0, min(y1, h - 1))
    x2 = max(0, min(x2, w - 1))
    y2 = max(0, min(y2, h - 1))
    return img[y1:y2, x1:x2]
