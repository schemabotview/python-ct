import type { Section } from '../types'

export const whatPythonIs: Section = {
  id: 'what-python-is',
  title: 'What Python is, and where it runs',
  scene: 'picture-landscape',
  narration:
    'Python is a general purpose programming language, and before writing a line of it, it is worth knowing what kind of language it is, because the five words across the top of the screen explain most of what you will meet in this course. It is high level: you describe what you want done, and Python takes care of how the machine does it. It is interpreted: a program called the interpreter reads your code and runs it, with no separate build step in between. It is dynamically typed: a name can refer to any kind of object, and the kind is checked while the program runs. It manages memory for you, freeing objects as soon as nothing uses them. And it comes with batteries included, a large standard library that you get the moment you install it. Below that is where Python actually runs, and the range is the point. The same language serves web back ends, through frameworks like Django and FastAPI. It is the everyday tool of data analysis, with pandas and Jupyter notebooks. Most machine learning is written in it. It automates servers and chores, and it moves data between systems in pipelines, which is exactly what we will build. It is also, very often, the first language people learn. At the bottom is one more distinction worth knowing early. Python is a language, and CPython is the program that runs it: the reference implementation, written in C. Others exist, but CPython is what you get from python dot org, and everything in this course, every number and every error message, was produced on CPython three point fifteen point one. Next, where this language came from.',
}
