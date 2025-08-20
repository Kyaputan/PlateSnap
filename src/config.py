from zoneinfo import ZoneInfo

#==== detection.py ==== 
WEIGHTS_DIR = "./model"
MODEL_NAME = "guard.onnx"
MODEL_CONF = 0.7

#==== main.py ==== 
VIDEO_PATH = "./video"
VIDEO_NAME = "/20250815_131147.mp4"
INFER = 15
RTSP = "0"
MARGIN = 10

#==== logic.py ==== 
SNAPSHOT_DIR = "./snapshots"  
PHONE_HOLD_SECONDS = 4
CROP_FRAME = [0.5,0.2]

#==== util.py ==== 
TZ = ZoneInfo("Asia/Bangkok")

def debug_config() -> None:
    print(f"[INFO] SNAPSHOT_DIR: {SNAPSHOT_DIR}")
    print(f"[INFO] VIDEO_NAME: {VIDEO_PATH + VIDEO_NAME}")
    print(f"[INFO] INFER: {INFER}")
    value = "" if RTSP is None else str(RTSP).strip()
    if value == "0":
        print("[INFO] RTSP: Webcam")
    elif value.lower().startswith("rtsp"):
        print(f"[INFO] RTSP: {value}")
    else:
        print("#" * 50)
        print(f"[ERROR] Invalid RTSP value: {RTSP} (expected 0 or rtsp://...)")
        print("#" * 50)
    print(f"[INFO] MARGIN: {MARGIN}")
    print(f"[INFO] PHONE_HOLD_SECONDS: {PHONE_HOLD_SECONDS}")
    print(f"[INFO] CROP_FRAME: {CROP_FRAME}")
    print(f"[INFO] Timezone: {TZ}")

if __name__ == "__main__":
    debug_config()