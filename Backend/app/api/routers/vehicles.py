from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.api.deps import get_db
from app.schemas.license import InsertPlate, PlateOut
from app.models.vehicle import Vehicle

router = APIRouter(prefix="/vehicles", tags=["vehicles"])

@router.post("", response_model=PlateOut, status_code=status.HTTP_201_CREATED)
async def insert_plate(plate: InsertPlate, db: Session = Depends(get_db)):
    lic = plate.license.strip()
    prov = plate.province.strip()

    if not lic or not prov:
        raise HTTPException(status_code=400, detail="license/province must not be empty")

    v = Vehicle(license=lic, province=prov, allowed=True)
    try:
        db.add(v)
        db.commit()
        db.refresh(v)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="This plate already exists")
    return PlateOut(license=v.license, province=v.province, allowed=v.allowed)
