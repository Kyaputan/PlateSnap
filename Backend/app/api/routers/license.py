from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.license import PlateOut
from app.services.pipeline import PlatePipeline
from app.utils.image import read_image_from_bytes

router = APIRouter(prefix="/plates", tags=["plates"])
pipeline = None

@router.on_event("startup")
def _init_pipeline():
    global pipeline
    if pipeline is None:
        try:
            pipeline = PlatePipeline()
        except Exception as e:
            pipeline = e 

@router.post("/detect", response_model=PlateOut)
async def detect_plate(file: UploadFile = File(...), db: Session = Depends(get_db)):
    global pipeline
    if isinstance(pipeline, Exception):
        raise HTTPException(status_code=500, detail=str(pipeline))
    if pipeline is None:
        pipeline = PlatePipeline()
    content = await file.read()
    img = read_image_from_bytes(content)
    result = pipeline.process(img, db)
    if not result:
        raise HTTPException(status_code=404, detail="No plate detected")
    return PlateOut(**result)
