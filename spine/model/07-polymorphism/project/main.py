# roastery-etl: turns the shop's daily order files into a report.

from pathlib import Path

from pipeline.extract import iter_rows
from pipeline.load import load_warehouse, write_report, write_summary
from pipeline.transform import summarise
from pipeline.validate import Orders

RAW = Path("data/raw")
OUT = Path("data/out")


def main() -> None:
    """Extract, transform, load: the whole job, in order."""
    orders = Orders.from_rows(iter_rows(sorted(RAW.glob("orders-*.csv"))))
    summary = summarise(orders)
    write_report(summary["daily"], OUT / "daily_report.csv")
    write_summary(summary, orders.rejected, OUT / "summary.json")
    count, cents = load_warehouse(orders, OUT / "warehouse.db")
    print("October:", summary["total"], "| priced:", count, end=" ")
    print("| rejected:", len(orders.rejected))
    print("wrote daily_report.csv, summary.json and warehouse.db")


if __name__ == "__main__":
    main()
