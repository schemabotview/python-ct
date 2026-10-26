"""Load: the report, the summary and the warehouse, each safe to re-run."""

import csv
import datetime as dt
import io
import json
import sqlite3
from collections.abc import Iterable
from pathlib import Path

from .errors import PipelineError
from .model import LineItem, Money
from .transform import Summary


def write_atomic(path: Path, text: str) -> None:
    """Write a whole file or nothing: a temp file, then one rename."""
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(text, encoding="utf-8")
    temp.replace(path)


def write_report(daily: dict[dt.date, Money], path: Path) -> None:
    """One row per day: the date and that day's revenue."""
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["date", "revenue"])
    for date, amount in daily.items():
        writer.writerow([date.isoformat(), amount])
    write_atomic(path, buffer.getvalue())


def write_summary(
    summary: Summary, rejected: list[PipelineError], path: Path
) -> None:
    """The month as JSON for other programs: money as strings, exactly."""
    revenue = {sku: str(amount) for sku, amount in summary["revenue"].items()}
    data = {
        "month": "2026-10",
        "total": str(summary["total"]),
        "rejected": len(rejected),
        "revenue": revenue,
    }
    write_atomic(path, json.dumps(data, indent=2) + "\n")


SCHEMA = """CREATE TABLE IF NOT EXISTS order_lines (
    id TEXT PRIMARY KEY, date TEXT, customer TEXT, sku TEXT,
    quantity INTEGER, total_cents INTEGER)"""
INSERT = "INSERT INTO order_lines VALUES (?, ?, ?, ?, ?, ?)"
TOTALS = "SELECT COUNT(*), SUM(total_cents) FROM order_lines"
UPSERT = INSERT + """ ON CONFLICT(id) DO UPDATE SET date = excluded.date,
    customer = excluded.customer, sku = excluded.sku,
    quantity = excluded.quantity, total_cents = excluded.total_cents"""


def load_warehouse(
    lines: Iterable[LineItem], path: Path
) -> tuple[int, int]:
    """Every priced line into SQLite, in one transaction, money in cents."""
    rows = [
        (line.id, line.date, line.customer, line.product.sku,
         line.quantity, line.total.cents)
        for line in lines
    ]
    with sqlite3.connect(path) as conn:
        conn.execute(SCHEMA)
        conn.executemany(UPSERT, rows)
        result = conn.execute(TOTALS).fetchone()
    conn.close()
    return result
