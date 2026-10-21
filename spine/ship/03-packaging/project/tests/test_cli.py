import pytest

from pipeline.cli import main


def test_a_bad_month_is_a_usage_error():
    with pytest.raises(SystemExit) as stop:
        main(["run", "--month", "2026-13"])
    assert stop.value.code == 2


def test_a_month_with_no_files_fails_with_exit_code_1():
    assert main(["run", "--month", "2026-11"]) == 1
