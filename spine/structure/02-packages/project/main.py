# roastery-etl: turns the shop's daily order files into a report.

from pipeline.extract import month_rows
from pipeline.load import OUT, connect, load, records, write_csv_atomic
from pipeline.transform import daily_summaries, priced


def main():
    """Extract, transform, load: October's files in, three outputs out."""
    rejected = []
    rows = list(priced(month_rows(rejected)))
    daily = daily_summaries(rows)
    loaded = load(connect(), records(rows))
    header = ["date", "orders", "bags", "revenue", "top_product"]
    days = [[d, s["orders"], s["bags"], s["revenue"], s["top"]]
            for d, s in daily.items()]
    write_csv_atomic(OUT / "daily_report.csv", [header, *days])
    reasons = [["file", "order", "reason"], *rejected]
    write_csv_atomic(OUT / "rejected.csv", reasons)
    revenue = sum(s["revenue"] for s in daily.values())
    print(f"extract:   {len(rows):,} rows read, {len(rejected)} rejected")
    print(f"transform: {len(daily)} days, ${revenue:,.2f} revenue")
    print(f"load:      {loaded:,} rows in warehouse.db, two CSV files")


main()
