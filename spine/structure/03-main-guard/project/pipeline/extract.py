"""Extract: read the shop's day files, one row at a time."""

import csv


def read_text(path):
    """A day file's text: UTF-8, or Latin-1 from the shop's old till."""
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        print(path.name, "is not UTF-8: read as Latin-1")
        return path.read_text(encoding="latin-1")


def iter_rows(paths):
    """Every row of every day file, one at a time: never a month in memory."""
    for path in paths:
        yield from csv.DictReader(read_text(path).splitlines())
