"""Where does a run of the pipeline spend its time?"""

import cProfile
import pstats

from main import main

profiler = cProfile.Profile()
profiler.runcall(main)
profile = pstats.Stats(profiler).get_stats_profile().func_profiles
slowest = sorted(profile.items(), key=lambda item: -item[1].tottime)[:4]
for name, stat in slowest:
    where = f"{stat.file_name.rsplit('/', 1)[-1]}:{stat.line_number}"
    print(f"{stat.tottime:5.2f} s  {stat.ncalls:>9} calls  {name}  ({where})")
