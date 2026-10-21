"""The roastery-etl command."""

import argparse
import logging
from datetime import datetime
from importlib.metadata import version

from pipeline.extract import month_to_process
from pipeline.run import NoData, run

log = logging.getLogger("roastery-etl")
FORMAT = "%(levelname)-7s %(message)s"


def month(text: str) -> str:
    try:
        return datetime.strptime(text, "%Y-%m").strftime("%Y-%m")
    except ValueError:
        raise argparse.ArgumentTypeError(f"{text!r} is not a month (YYYY-MM)")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="roastery-etl")
    parser.add_argument("--version", action="version",
                        version=f"%(prog)s {version('roastery-etl')}")
    commands = parser.add_subparsers(dest="command", required=True)
    run_cmd = commands.add_parser("run", help="process one month of orders")
    run_cmd.add_argument("--month", type=month, metavar="YYYY-MM",
                         help="the month to process (default: last month)")
    args = parser.parse_args(argv)
    logging.basicConfig(level=logging.INFO, format=FORMAT)
    try:
        run(args.month or month_to_process())
    except NoData as error:
        log.error("%s", error)
        return 1
    return 0
