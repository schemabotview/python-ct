"""Load: the warehouse database and the CSV outputs, all safe to re-run."""

import csv
import sqlite3
from pathlib import Path

from pipeline.config import load_settings

OUT = load_settings().out
FIELDS = ("order_id", "date", "customer", "sku", "quantity")
INSERT = "INSERT INTO order_lines VALUES (?, ?, ?, ?, ?, ?)"


def records(rows):
    """Rows as database records, each total stored as exact text."""
    return [[row[f] for f in FIELDS] + [str(row["total"])] for row in rows]


def connect():
    OUT.mkdir(exist_ok=True)
    con = sqlite3.connect(OUT / "warehouse.db")
    con.executescript(Path("schema.sql").read_text(encoding="utf-8"))
    return con


def load(con, rows, month):
    """Replace the month, all or nothing: running it twice changes nothing."""
    with con:
        delete = "DELETE FROM order_lines WHERE date LIKE ?"
        con.execute(delete, (f"{month}-%",))
        con.executemany(INSERT, rows)
    return con.execute("SELECT COUNT(*) FROM order_lines").fetchone()[0]


def write_csv_atomic(path, rows):
    tmp = path.with_name(path.name + ".tmp")
    with tmp.open("w", newline="", encoding="utf-8") as f:
        csv.writer(f).writerows(rows)
    tmp.replace(path)  # atomic: readers see the old file or the new, never half
