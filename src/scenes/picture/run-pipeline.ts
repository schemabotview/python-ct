import type { Item, SceneModel } from '@graphlearning/graphl-flow'

// §6 — what happens when you type `python main.py`: CPython's pipeline, each stage with a way to
// look at it (python -m tokenize / ast / dis are standard-library command lines).
const stage = (id: string, title: string, sub: string, icon: string, bullets: string[]): Item => ({ type: 'item', id, title, sub, icon, bullets })

// Each stage's bullets are what 3.15.1 really produces for a one-line main.py, print("hi"):
// python -m tokenize, python -m ast and python -m dis, run on that file.
export const runPipeline: SceneModel = {
  title: 'python main.py',
  sub: 'what CPython does between the Enter key and the first line of output — shown for print("hi")',
  nodes: [
    {
      type: 'group', id: 'stages', title: 'Inside the interpreter', icon: 'python', tone: 'ingest', dir: 'row', children: [
        stage('source', 'Source', 'main.py, as text', 'file', ['print("hi")']),
        stage('tokens', 'Tokens', 'the tokenizer', 'search', ["NAME 'print'", "OP '('", 'STRING \'"hi"\'', "OP ')'"]),
        stage('tree', 'Syntax tree', 'the parser', 'workflow', ['Expr', 'Call', "Name 'print'", "Constant 'hi'"]),
        stage('bytecode', 'Bytecode', 'the compiler', 'code', ['LOAD_NAME print', 'LOAD_CONST \'hi\'', 'CALL 1', 'POP_TOP']),
        stage('vm', 'Virtual machine', 'the interpreter loop', 'cpu', ['runs them', 'one at a time']),
        stage('output', 'Output', 'what your code does', 'screen', ['hi']),
      ],
    },
    {
      type: 'group', id: 'errors', title: 'Where an error comes from', sub: 'the stage that finds it decides what has already happened', tone: 'consume', dir: 'row', children: [
        { type: 'item', id: 'e-syntax', title: 'SyntaxError', sub: 'the parser — before any line runs', icon: 'bell' },
        { type: 'item', id: 'e-name', title: 'NameError, TypeError, ZeroDivisionError', sub: 'the virtual machine — when the line runs', icon: 'bell' },
      ],
    },
    {
      type: 'group', id: 'look', title: 'Look at each stage yourself', sub: 'all of it ships with Python', tone: 'store', dir: 'row', children: [
        { type: 'item', id: 'l-tokens', title: 'python -m tokenize main.py', sub: 'the tokens', icon: 'terminal' },
        { type: 'item', id: 'l-ast', title: 'python -m ast main.py', sub: 'the syntax tree', icon: 'terminal' },
        { type: 'item', id: 'l-dis', title: 'python -m dis main.py', sub: 'the bytecode', icon: 'terminal' },
        { type: 'item', id: 'l-cache', title: '__pycache__/*.pyc', sub: 'bytecode, saved for imports', icon: 'folder' },
      ],
    },
  ],
  edges: [
    { from: 'source', to: 'tokens' },
    { from: 'tokens', to: 'tree' },
    { from: 'tree', to: 'bytecode' },
    { from: 'bytecode', to: 'vm' },
    { from: 'vm', to: 'output' },
  ],
}
