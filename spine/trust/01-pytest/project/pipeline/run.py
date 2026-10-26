"""The pipeline itself: a source and its sinks, composed, not inherited."""

from dataclasses import dataclass

from .ports import Result, Sink, Source
from .transform import summarise
from .validate import Orders


@dataclass
class Pipeline:
    """Rows from one source, summarised, then written to every sink."""

    source: Source
    sinks: list[Sink]

    def run(self) -> Result:
        orders = Orders.from_rows(self.source.rows())
        result = Result(orders, summarise(orders))
        for sink in self.sinks:
            sink.write(result)
        return result
