from pydantic_settings import BaseSettings
from pydantic import AnyUrl, Field

class Settings(BaseSettings):
    APP_NAME: str = "PlateFlow Backend"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = Field(default="sqlite:///./app.db")
    YOLO_MODEL_PATH: str = "license.pt"  
    OCR_ENGINE: str = "easyocr" 
    LOG_LEVEL: str = "INFO"
    CORS_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
