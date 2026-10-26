"""Extract: read the shop's day files, one row at a time."""

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

    def __init__(self, folder: Path) -> None:
        self.folder = folder

    def rows(self) -> Iterator[dict[str, str]]:
        return iter_rows(sorted(self.folder.glob("orders-*.csv")))
