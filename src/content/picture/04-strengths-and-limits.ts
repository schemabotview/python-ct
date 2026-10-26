import type { Section } from '../types'

export const strengthsAndLimits: Section = {
  id: 'strengths-and-limits',
  title: 'Strengths and limits',
  scene: 'picture-strengths',
  narration:
    "Every language makes trade offs, and Python's are worth knowing before you rely on it. The script in the editor adds up a million numbers in two ways and times both. The first is a loop written in Python: start at zero, and add each number in turn. The second calls the built in function, sum. Both give the same answer. The terminal, and the chart on the right, show how long each took, and on this machine, sum was about five times faster. Your numbers will differ, because timings depend on the machine and on what else it is doing, but the gap will be there. The reason is the shape of the whole language. sum is written in C, and it runs at the speed of C. The loop runs in the Python virtual machine, which you will meet in a few minutes, one small instruction at a time, and every one of those instructions has a cost. The table turns that into a rule of thumb. Python is fast to write and to read, and that is usually the expensive part of software. Calling code written in C is fast, and much of Python's power comes from exactly that: the standard library, and libraries like NumPy. Waiting on files and networks is fine, because the waiting dominates. A tight loop in pure Python code is slow. And on the default build, threads doing CPU work run one at a time, for a reason we will measure in course eleven. None of this means you should guess. The professional habit, which we will practise later, is to measure first and change only what the measurement points at. Next, what we are going to build.",
}
