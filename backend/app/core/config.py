"""
IntelliMatch AI — Core Application Configuration
Centralizes environment variables, CORS settings, database connection URLs, and API metadata.
"""
import os
from typing import List
from dotenv import load_dotenv

load_dotenv()


class Settings:
    PROJECT_NAME: str = "IntelliMatch AI — Career & Roadmap Intelligence API"
    VERSION: str = "2.0.0"
    DESCRIPTION: str = (
        "Production REST API serving the 5 Core Software IT Domains, "
        "Career Role Explorer, Inside the Profession, 4-Stage Skill Progression, "
        "Role Comparison, and Role-Specific Roadmaps."
    )
    API_V1_STR: str = "/api/v1"

    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

    # Database URL: defaults to local SQLite if unset
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./intellimatch.db")

    # CORS Allowed Origins
    @property
    def ALLOWED_ORIGINS(self) -> List[str]:
        frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
        custom_origins = os.getenv("ALLOWED_ORIGINS", "")
        origins = [
            frontend_origin,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:4173",
            "http://127.0.0.1:4173",
        ]
        if custom_origins:
            for o in custom_origins.split(","):
                stripped = o.strip()
                if stripped and stripped not in origins:
                    origins.append(stripped)
        # If in development, also allow wildcard for local testing convenience
        if self.ENVIRONMENT == "development" and "*" not in origins:
            origins.append("*")
        return origins


settings = Settings()
