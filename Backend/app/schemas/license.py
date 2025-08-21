from pydantic import BaseModel, Field

class InsertPlate(BaseModel):
    license: str = Field(..., min_length=1)
    province: str = Field(..., min_length=1)
    allowed: bool  

class PlateOut(BaseModel):
    license: str
    province: str
    allowed: bool = True
