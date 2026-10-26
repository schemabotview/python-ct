"""The pipeline's two seams: where rows come from, and where results go."""

import datetime as dt
from collections.abc import Iterator
from dataclasses import dataclass
from typing import Protocol

from .transform import Summary
from .validate import Orders, Row


@dataclass
class Result:
    """One run's output: the month's orders, their summary, and when."""

    orders: Orders
    summary: Summary
    generated: dt.datetime


class Source(Protocol):
    """Anything that can produce order rows."""

    def rows(self) -> Iterator[Row]: ...


class Sink(Protocol):
    """Anything that can take a run's result somewhere."""

    def write(self, result: Result) -> None: ...
