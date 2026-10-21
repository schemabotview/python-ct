"""The whole job: extract, transform and load one month."""

import logging

from pipeline.extract import month_rows
from pipeline.load import OUT, connect, load, records, write_csv_atomic
from pipeline.transform import daily_summaries, drop_duplicates, priced

log = logging.getLogger(__name__)


class NoData(Exception):
    """There are no order files for the month asked for."""


def run(month: str) -> int:
    """Process one month; return how many rows were rejected."""
    rejected: list[tuple[str, str, str]] = []
    rows = drop_duplicates(priced(month_rows(rejected, month)))
    if not rows:
        raise NoData(f"no orders for {month}")
    daily = daily_summaries(rows)
    loaded = load(connect(), records(rows), month)
    header = ["date", "orders", "bags", "revenue", "top_product"]
    days = [[d, s["orders"], s["bags"], s["revenue"], s["top"]]
            for d, s in daily.items()]
    write_csv_atomic(OUT / f"daily_report-{month}.csv", [header, *days])
    reasons = [["file", "order", "reason"], *rejected]
    write_csv_atomic(OUT / f"rejected-{month}.csv", reasons)
    revenue = sum(s["revenue"] for s in daily.values())
    log.info("%s: %s rows, %d rejected", month, f"{len(rows):,}", len(rejected))
    log.info("%s: %d days, $%s revenue", month, len(daily), f"{revenue:,.2f}")
    log.info("%s: %s rows in warehouse.db", month, f"{loaded:,}")
    return len(rejected)
