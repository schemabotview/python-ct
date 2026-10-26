"""python -m pipeline: the same command as roastery-etl."""

import sys

from .cli import main

sys.exit(main())
