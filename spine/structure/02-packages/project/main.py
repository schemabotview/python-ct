# roastery-etl: turns the shop's daily order files into a report.

from pathlib import Path

from pipeline.extract import iter_rows
from pipeline.load import load_warehouse, write_report, write_summary
from pipeline.transform import priced_lines, summarise

RAW = Path("data/raw")
OUT = Path("data/out")


def main():
    """Extract, transform, load: the whole job, in order."""
    paths = sorted(RAW.glob("orders-*.csv"))
    rejected = []
    lines = list(priced_lines(iter_rows(paths), rejected))
    summary = summarise(lines)
    write_report(summary["daily"], OUT / "daily_report.csv")
    write_summary(summary, rejected, OUT / "summary.json")
    count, cents = load_warehouse(lines, OUT / "warehouse.db")
    print("October:", summary["total"], "| priced:", count, end=" ")
    print("| rejected:", len(rejected))
    print("wrote daily_report.csv, summary.json and warehouse.db")


main()
