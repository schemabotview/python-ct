"""The whole pipeline on made-up rows: no files, no database, no real clock."""

import datetime as dt

from pipeline.run import Pipeline

NOON = dt.datetime(2026, 10, 31, 12, 0, tzinfo=dt.UTC)


class FakeSource:
    """A Source that serves rows from a list."""

    def __init__(self, rows):
        self.given = rows

    def rows(self):
        return iter(self.given)


class ListSink:
    """A Sink that keeps every result it is handed."""

    def __init__(self):
        self.results = []

    def write(self, result):
        self.results.append(result)


def test_a_run_reaches_every_sink(good_row):
    refused = {**good_row, "id": "ORD-9002", "customer": ""}
    sink = ListSink()
    pipeline = Pipeline(FakeSource([good_row, refused]), [sink], lambda: NOON)
    result = pipeline.run()
    assert sink.results == [result]
    assert len(result.orders) == 1 and len(result.orders.rejected) == 1
    assert str(result.summary["total"]) == "58.90"
    assert result.generated == NOON
