# Compatibility shim for prior imports: from config.setting import Config
# Prefer importing from app.core.config in new code.
from app.core.config import Settings as Config, settings  # noqa: F401
