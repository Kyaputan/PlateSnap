# PlateSnap
PlateFlow is a real-time license plate recognition pipeline. It ingests frames from a camera (RTSP/USB/video), detects plates with YOLO, crops via xyxy coordinates, performs OCR, and posts results to a FastAPI service for persistence. The stored record is intentionally minimal and integration-friendly
