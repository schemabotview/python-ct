import type { SceneModel } from '@graphlearning/graphl-flow'

// §1 — what Python is, and where it runs. The five properties, then the places it is used, each with
// tools a learner will meet; CPython named as the implementation this course runs (3.15.1).
export const landscape: SceneModel = {
  title: 'Python',
  sub: 'a general-purpose programming language — one language, from a first script to production',
  nodes: [
    {
      type: 'group', id: 'what', title: 'What kind of language it is', icon: 'python', tone: 'ingest', dir: 'row', children: [
        { type: 'item', id: 'high', title: 'High-level', sub: 'you say what to do, not how the machine does it', icon: 'layers', stack: true },
        { type: 'item', id: 'interp', title: 'Interpreted', sub: 'run by an interpreter, with no separate build step', icon: 'cpu', stack: true },
        { type: 'item', id: 'dynamic', title: 'Dynamically typed', sub: 'a name can refer to any kind of object', icon: 'boxes', stack: true },
        { type: 'item', id: 'gc', title: 'Memory-managed', sub: 'objects are freed when nothing uses them', icon: 'memory', stack: true },
        { type: 'item', id: 'batteries', title: 'Batteries included', sub: 'a large standard library comes with it', icon: 'package', stack: true },
      ],
    },
    {
      type: 'group', id: 'where', title: 'Where it runs', sub: 'the same language, in very different jobs', tone: 'store', dir: 'grid', cols: 3, children: [
        { type: 'item', id: 'web', title: 'Web back ends', icon: 'globe', bullets: ['Django', 'Flask', 'FastAPI'] },
        { type: 'item', id: 'data', title: 'Data analysis', icon: 'pandas', bullets: ['pandas', 'NumPy', 'Jupyter notebooks'] },
        { type: 'item', id: 'ml', title: 'Machine learning', icon: 'brain', bullets: ['PyTorch', 'scikit-learn'] },
        { type: 'item', id: 'auto', title: 'Automation', icon: 'terminal', bullets: ['scripts', 'command-line tools', 'Ansible'] },
        { type: 'item', id: 'pipes', title: 'Data pipelines', icon: 'airflow', bullets: ['Airflow', 'PySpark', 'this course'] },
        { type: 'item', id: 'science', title: 'Science and teaching', icon: 'jupyter', bullets: ['SciPy', 'first programming courses'] },
      ],
    },
    {
      type: 'group', id: 'impl', title: 'Which Python', tone: 'source', dir: 'row', children: [
        { type: 'item', id: 'cpython', title: 'CPython', sub: 'the reference implementation, written in C — the one this course runs, 3.15.1', icon: 'python' },
        { type: 'item', id: 'others', title: 'Others exist', sub: 'PyPy, MicroPython — the same language, run differently', icon: 'boxes' },
      ],
    },
  ],
  edges: [{ from: 'what', to: 'where' }],
}
