# roastery-etl: turns the shop's daily order files into a report.

from pathlib import Path

from pipeline.extract import CsvDays
from pipeline.load import CsvReport, JsonSummary, SqliteWarehouse
from pipeline.run import Pipeline

RAW = Path("data/raw")
OUT = Path("data/out")


def main() -> None:
    """Build the pipeline from its parts, and run it."""
    with SqliteWarehouse(OUT / "warehouse.db") as warehouse:
        pipeline = Pipeline(CsvDays(RAW), [
            CsvReport(OUT / "daily_report.csv"),
            JsonSummary(OUT / "summary.json"), warehouse,
        ])
        result = pipeline.run()
        count, cents = warehouse.totals()
    print("October:", result.summary["total"], "| priced:", count, end=" ")
    print("| rejected:", len(result.orders.rejected))
    print("wrote daily_report.csv, summary.json and warehouse.db")


if __name__ == "__main__":
    main()
