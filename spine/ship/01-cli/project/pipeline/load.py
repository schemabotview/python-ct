"""Load: the report, the summary and the warehouse, each safe to re-run."""

import csv
import datetime as dt
import io
import json
import sqlite3
from pathlib import Path
from types import TracebackType
from typing import Self

from .errors import PipelineError
from .model import Money
from .ports import Result
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
    summary: Summary,
    rejected: list[PipelineError],
    generated: dt.datetime,
    month: str,
    path: Path,
) -> None:
    """The month as JSON for other programs: money as strings, exactly."""
    revenue = {sku: str(amount) for sku, amount in summary["revenue"].items()}
    data = {
        "month": month,
        "generated": generated.isoformat(timespec="seconds"),
        "total": str(summary["total"]),
        "rejected": len(rejected),
        "revenue": revenue,
    }
    write_atomic(path, json.dumps(data, indent=2) + "\n")


class CsvReport:
    """The daily report, as a sink."""

    def __init__(self, path: Path) -> None:
        self.path = path

    def write(self, result: Result) -> None:
        write_report(result.summary["daily"], self.path)


class JsonSummary:
    """The JSON summary of one month, as a sink."""

    def __init__(self, path: Path, month: str) -> None:
        self.path, self.month = path, month

    def write(self, result: Result) -> None:
        write_summary(
            result.summary,
            result.orders.rejected,
            result.generated,
            self.month,
            self.path,
        )


SCHEMA = """CREATE TABLE IF NOT EXISTS order_lines (
    id TEXT PRIMARY KEY, date TEXT, customer TEXT, sku TEXT,
    quantity INTEGER, total_cents INTEGER)"""
INSERT = "INSERT INTO order_lines VALUES (?, ?, ?, ?, ?, ?)"
TOTALS = "SELECT COUNT(*), SUM(total_cents) FROM order_lines"
UPSERT = (
    INSERT
    + """ ON CONFLICT(id) DO UPDATE SET date = excluded.date,
    customer = excluded.customer, sku = excluded.sku,
    quantity = excluded.quantity, total_cents = excluded.total_cents"""
)


class SqliteWarehouse:
    """The warehouse as a sink: one run is one transaction, or nothing."""

    def __init__(self, path: Path) -> None:
        self.path = path

    def __enter__(self) -> Self:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.conn = sqlite3.connect(self.path)
        self.conn.execute(SCHEMA)
        return self

    def __exit__(
        self,
        kind: type[BaseException] | None,
        error: BaseException | None,
        traceback: TracebackType | None,
    ) -> None:
        """Commit if the block finished, roll back if it raised; then close."""
        if kind is None:
            self.conn.commit()
        else:
            self.conn.rollback()
        self.conn.close()

    def write(self, result: Result) -> None:
        self.conn.executemany(
            UPSERT,
            [
                (
                    line.id,
                    line.date,
                    line.customer,
                    line.product.sku,
                    line.quantity,
                    line.total.cents,
                )
                for line in result.orders
            ],
        )

    def totals(self) -> tuple[int, int]:
        return self.conn.execute(TOTALS).fetchone()
