"""Settings: defaults, then roastery.toml, then ROASTERY_* variables, then
flags. A secret never comes from the file: only from the environment."""

import os
import tomllib
from collections.abc import Mapping
from dataclasses import dataclass, fields
from pathlib import Path

ENV_ONLY = {"api_token"}


@dataclass(frozen=True)
class Config:
    raw: Path = Path("data/raw")
    out: Path = Path("data/out")
    log_level: str = "INFO"
    api_token: str = ""

    def lines(self) -> list[str]:
        """The settings as text, with any secret hidden."""
        shown = {f.name: str(getattr(self, f.name)) for f in fields(self)}
        shown["api_token"] = "(set)" if self.api_token else "(not set)"
        return [f"{name} = {value}" for name, value in shown.items()]


def merged(config: Config, values: Mapping[str, str | Path]) -> Config:
    """config, with any of the given settings replaced."""
    return Config(
        raw=Path(values.get("raw", config.raw)),
        out=Path(values.get("out", config.out)),
        log_level=str(values.get("log_level", config.log_level)),
        api_token=str(values.get("api_token", config.api_token)),
    )


def load_config(path: Path = Path("roastery.toml")) -> Config:
    config = Config()
    if path.exists():
        table = tomllib.loads(path.read_text(encoding="utf-8"))["roastery"]
        config = merged(
            config, {k: v for k, v in table.items() if k not in ENV_ONLY}
        )
    names = [f.name for f in fields(Config)]
    env = {
        name: os.environ[f"ROASTERY_{name.upper()}"]
        for name in names
        if f"ROASTERY_{name.upper()}" in os.environ
    }
    return merged(config, env)
