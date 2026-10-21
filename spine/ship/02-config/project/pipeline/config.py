"""Settings from the environment: where the data lives, and secrets."""

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    raw: Path
    out: Path
    shop_token: str | None  # a secret: read from the environment, never code

    def __repr__(self) -> str:
        token = "set" if self.shop_token else "not set"
        return f"Settings(raw={self.raw}, out={self.out}, shop_token={token})"


def load_settings() -> Settings:
    return Settings(
        raw=Path(os.environ.get("ROASTERY_RAW", "data/raw")),
        out=Path(os.environ.get("ROASTERY_OUT", "data/out")),
        shop_token=os.environ.get("ROASTERY_SHOP_TOKEN"),
    )
