# roastery-etl: turns the shop's daily order files into a report.

import logging
import os
from pathlib import Path

from pipeline.extract import CsvDays
from pipeline.load import CsvReport, JsonSummary, SqliteWarehouse
from pipeline.run import Pipeline

logger = logging.getLogger(__name__)
RAW = Path("data/raw")
OUT = Path("data/out")


def main() -> None:
    """Build the pipeline from its parts, and run it."""
    logging.basicConfig(
        level=os.environ.get("LOG_LEVEL", "INFO"),
        format="%(levelname)s %(name)s: %(message)s",
    )
    with SqliteWarehouse(OUT / "warehouse.db") as warehouse:
        pipeline = Pipeline(
            CsvDays(RAW),
            [
                CsvReport(OUT / "daily_report.csv"),
                JsonSummary(OUT / "summary.json"),
                warehouse,
            ],
        )
        result = pipeline.run()
        count, _ = warehouse.totals()
    logger.info(
        "October: %s | priced: %d | rejected: %d",
        result.summary["total"],
        count,
        len(result.orders.rejected),
    )
    logger.info("wrote daily_report.csv, summary.json and warehouse.db")


if __name__ == "__main__":
    main()
