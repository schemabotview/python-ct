"""Decorators: wrap a function to add behaviour without editing it."""

import functools
import logging
import time
from collections.abc import Callable

logger = logging.getLogger(__name__)


def timed[**P, R](function: Callable[P, R]) -> Callable[P, R]:
    """Log how long each call to function takes."""

    @functools.wraps(function)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        start = time.perf_counter()
        try:
            return function(*args, **kwargs)
        finally:
            seconds = time.perf_counter() - start
            logger.info("%s took %.2fs", function.__qualname__, seconds)

    return wrapper


def retry[**P, R](
    error: type[Exception], attempts: int = 3
) -> Callable[[Callable[P, R]], Callable[P, R]]:
    """Call again when error is raised, up to attempts calls in all."""

    def decorate(function: Callable[P, R]) -> Callable[P, R]:
        @functools.wraps(function)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            for attempt in range(1, attempts):
                try:
                    return function(*args, **kwargs)
                except error as failure:
                    logger.warning("%s failed (%s), try %d of %d",
                                   function.__qualname__, failure, attempt,
                                   attempts)
            return function(*args, **kwargs)

        return wrapper

    return decorate
