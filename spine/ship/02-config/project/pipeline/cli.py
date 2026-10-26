"""The command line: roastery-etl run --month 2026-10."""

import argparse
import datetime as dt
import logging
from collections.abc import Sequence
from pathlib import Path

from .config import load_config, merged
from .extract import CsvDays
from .load import CsvReport, JsonSummary, SqliteWarehouse
from .ports import Sink
from .run import Pipeline

logger = logging.getLogger(__name__)


def month(text: str) -> str:
    """An argparse type: a month written YYYY-MM, like 2026-10."""
    try:
        dt.datetime.strptime(text, "%Y-%m")
    except ValueError:
        raise argparse.ArgumentTypeError(f"{text!r} is not YYYY-MM") from None
    return text


def parser() -> argparse.ArgumentParser:
    cli = argparse.ArgumentParser(
        prog="roastery-etl", description="The roastery's monthly orders job."
    )
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument("--out", type=Path, help="where the outputs go")
    commands = cli.add_subparsers(dest="command", required=True)
    run = commands.add_parser(
        "run", parents=[common], help="price a month, write its outputs"
    )
    run.add_argument("--month", type=month, required=True, help="YYYY-MM")
    commands.add_parser("config", parents=[common], help="show the settings")
    return cli


def run(month: str, raw: Path, out: Path) -> int:
    """The whole job for one month; the exit code says how it went."""
    source = CsvDays(raw, month)
    if not source.paths():
        logger.error("no day files for %s in %s", month, raw)
        return 1
    with SqliteWarehouse(out / "warehouse.db") as warehouse:
        sinks: list[Sink] = [
            CsvReport(out / "daily_report.csv"),
            JsonSummary(out / "summary.json", month),
            warehouse,
        ]
        result = Pipeline(source, sinks).run()
        count, _ = warehouse.totals()
    logger.info(
        "%s: %s | priced: %d | rejected: %d",
        month,
        result.summary["total"],
        count,
        len(result.orders.rejected),
    )
    logger.info("wrote daily_report.csv, summary.json and warehouse.db")
    return 0


def main(argv: Sequence[str] | None = None) -> int:
    args = parser().parse_args(argv)
    config = load_config()
    if args.out:
        config = merged(config, {"out": args.out})
    if args.command == "config":
        print("\n".join(config.lines()))
        return 0
    logging.basicConfig(
        level=config.log_level, format="%(levelname)s %(name)s: %(message)s"
    )
    return run(args.month, config.raw, config.out)
