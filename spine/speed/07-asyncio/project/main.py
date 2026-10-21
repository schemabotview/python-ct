# roastery-etl: turns the shop's daily order files into a report.

import logging

from pipeline.extract import month_rows
from pipeline.load import OUT, connect, load, records, write_csv_atomic
from pipeline.transform import daily_summaries, drop_duplicates, priced

log = logging.getLogger("roastery-etl")
FORMAT = "%(levelname)-7s %(message)s"


def main():
    """Extract, transform, load: October's files in, three outputs out."""
    logging.basicConfig(level=logging.INFO, format=FORMAT)
    rejected = []
    rows = drop_duplicates(priced(month_rows(rejected)))
    daily = daily_summaries(rows)
    loaded = load(connect(), records(rows))
    header = ["date", "orders", "bags", "revenue", "top_product"]
    days = [
        [d, s["orders"], s["bags"], s["revenue"], s["top"]]
        for d, s in daily.items()
    ]
    write_csv_atomic(OUT / "daily_report.csv", [header, *days])
    reasons = [["file", "order", "reason"], *rejected]
    write_csv_atomic(OUT / "rejected.csv", reasons)
    revenue = sum(s["revenue"] for s in daily.values())
    log.info("extract: %s rows read", f"{len(rows):,}")
    if rejected:
        log.warning("%d rejected: see data/out/rejected.csv", len(rejected))
    log.info("transform: %d days, $%s revenue", len(daily), f"{revenue:,.2f}")
    log.info("load: %s rows in warehouse.db", f"{loaded:,}")


if __name__ == "__main__":
    main()
