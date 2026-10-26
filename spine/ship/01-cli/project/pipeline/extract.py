"""Extract: read the shop's day files, one row at a time."""

import asyncio
import csv
import logging
from collections.abc import Iterable, Iterator
from pathlib import Path

logger = logging.getLogger(__name__)


def read_text(path: Path) -> str:
    """A day file's text: UTF-8, or Latin-1 from the shop's old till."""
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        logger.warning("%s is not UTF-8: read as Latin-1", path.name)
        return path.read_text(encoding="latin-1")


def iter_rows(paths: Iterable[Path]) -> Iterator[dict[str, str]]:
    """Every row of every day file, one at a time: never a month in memory."""
    for path in paths:
        yield from csv.DictReader(read_text(path).splitlines())


class CsvDays:
    """A folder of the shop's day files, as a source of rows."""

    def __init__(self, folder: Path, month: str = "*") -> None:
        self.folder, self.month = folder, month

    def paths(self) -> list[Path]:
        return sorted(self.folder.glob(f"orders-{self.month}-*.csv"))

    def rows(self) -> Iterator[dict[str, str]]:
        return iter_rows(self.paths())


class ApiSource:
    """Day files from the shop's orders API, all requested at once."""

    def __init__(self, host: str, port: int, days: list[str]) -> None:
        self.host, self.port, self.days = host, port, days

    async def fetch(self, day: str) -> str:
        """One day's CSV over HTTP; awaits while the server answers."""
        reader, writer = await asyncio.open_connection(self.host, self.port)
        writer.write(f"GET /orders/{day} HTTP/1.0\r\n\r\n".encode())
        response = await reader.read()
        writer.close()
        await writer.wait_closed()
        return response.split(b"\r\n\r\n", 1)[1].decode("utf-8")

    async def fetch_all(self) -> list[str]:
        return await asyncio.gather(*(self.fetch(day) for day in self.days))

    def rows(self) -> Iterator[dict[str, str]]:
        for text in asyncio.run(self.fetch_all()):
            yield from csv.DictReader(text.splitlines())
