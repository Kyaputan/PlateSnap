# PlateFlow Backend

FastAPI + SQLAlchemy backend with a YOLO + OCR pipeline for license plate recognition.

## Quickstart

```bash
python -m venv .venv && . .venv/bin/activate  # or use conda
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

POST an image to `/api/v1/plates/detect` with form field `file`.
