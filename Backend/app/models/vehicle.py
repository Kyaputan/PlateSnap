from sqlalchemy import Column, Integer, String, Boolean, UniqueConstraint
from app.db.base import Base

class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(Integer, primary_key=True, index=True)
    license = Column(String(32), nullable=False)
    province = Column(String(64), nullable=False)
    allowed = Column(Boolean, default=False)

    __table_args__ = (UniqueConstraint("license", "province", name="uix_license_province"),)
