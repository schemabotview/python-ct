"""The command line: a bad month is refused, a missing month fails."""

import pytest

from pipeline.cli import main, month


def test_a_month_must_be_written_yyyy_mm():
    assert month("2026-10") == "2026-10"
    with pytest.raises(Exception, match="is not YYYY-MM"):
        month("october")


def test_a_month_with_no_files_exits_1(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    assert main(["run", "--month", "2026-11"]) == 1
