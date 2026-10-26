"""retry: a flaky call is tried again, and a dead one still fails."""

import pytest

from pipeline.decorators import retry


def test_retry_calls_again_until_it_works():
    calls = []

    @retry(OSError, attempts=3)
    def flaky():
        calls.append("call")
        if len(calls) < 3:
            raise OSError("busy")
        return "done"

    assert flaky() == "done"
    assert len(calls) == 3


def test_retry_gives_up_after_its_attempts():
    @retry(OSError, attempts=2)
    def broken():
        raise OSError("down")

    with pytest.raises(OSError, match="down"):
        broken()
