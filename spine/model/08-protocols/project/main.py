# roastery-etl: turns the shop's daily order files into a report.

from pathlib import Path

from pipeline.extract import CsvDays
from pipeline.load import CsvReport, JsonSummary, load_warehouse
from pipeline.ports import Result, Sink, Source
from pipeline.transform import summarise
from pipeline.validate import Orders

RAW = Path("data/raw")
OUT = Path("data/out")


def main() -> None:
    """Extract, transform, load: the whole job, in order."""
    source: Source = CsvDays(RAW)
    sinks: list[Sink] = [
        CsvReport(OUT / "daily_report.csv"), JsonSummary(OUT / "summary.json"),
    ]
    orders = Orders.from_rows(source.rows())
    result = Result(orders, summarise(orders))
    for sink in sinks:
        sink.write(result)
    count, cents = load_warehouse(orders, OUT / "warehouse.db")
    print("October:", result.summary["total"], "| priced:", count, end=" ")
    print("| rejected:", len(orders.rejected))
    print("wrote daily_report.csv, summary.json and warehouse.db")


if __name__ == "__main__":
    main()
