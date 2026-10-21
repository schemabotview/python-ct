"""Decorators the pipeline wraps around its slow or unreliable steps."""

import functools
import logging
import time

log = logging.getLogger(__name__)
FORMAT = "%(levelname)-7s %(message)s"


def timed(func):
    """Log how long each call took."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            elapsed = time.perf_counter() - start
            log.info("%s took %.2f s", func.__name__, elapsed)
    return wrapper


def retry(times):
    """Call again on a network error, up to `times` attempts in all."""
    def decorate(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except ConnectionError as error:
                    if attempt == times:
                        raise
                    log.warning("%s: %s, retrying", func.__name__, error)
        return wrapper
    return decorate


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format=FORMAT)
    calls = []

    @retry(times=3)
    def fetch_orders():
        calls.append(1)
        if len(calls) < 3:
            raise ConnectionError("the shop's server timed out")
        return "orders-2026-10-31.csv"

    print(fetch_orders(), "after", len(calls), "calls")
    print(timed(sum)(range(20_000_000)), "|", fetch_orders.__name__)
