"""The pipeline itself: a source and its sinks, composed, not inherited."""

import datetime as dt
from collections.abc import Callable
from dataclasses import dataclass

from .decorators import timed
from .ports import Result, Sink, Source
from .transform import summarise
from .validate import Orders


def utc_now() -> dt.datetime:
    """The real clock: now, in UTC."""
    return dt.datetime.now(dt.UTC)


@dataclass
class Pipeline:
    """Rows from one source, summarised, then written to every sink."""

    source: Source
    sinks: list[Sink]
    clock: Callable[[], dt.datetime] = utc_now

    @timed
    def run(self) -> Result:
        orders = Orders.from_rows(self.source.rows())
        result = Result(orders, summarise(orders), self.clock())
        for sink in self.sinks:
            sink.write(result)
        return result
