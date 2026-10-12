import type { Scene } from '@graphlearning/flow'

// §1 — a module and the file that imports it, with the effect of each import form shown as a comment,
// then the four forms side by side. The module-level print is deliberate: it makes "runs once, at the
// first import" visible rather than asserted.
export const importForms: Scene = {
  id: 'import-forms',
  title: 'Importing runs a module once',
  flow: 'TB',
  nodes: [
    {
      id: 'files',
      kind: 'code',
      filename: 'calc.py  and  main.py',
      label: `# calc.py
print("loading calc")          # runs once, at the first import
def line_total(qty, price):
    return qty * price

# main.py
import calc                    # prints: loading calc
import calc                    # nothing: cached in sys.modules
calc.line_total(3, 4.5)        # 13.5
from calc import line_total    # copies one name into this module`,
    },
    {
      id: 'forms',
      kind: 'table',
      label: 'Four import forms',
      headers: ['Form', 'Binds', 'Use it as'],
      values: [
        ['import calc', 'calc', 'calc.line_total(3, 4.5)'],
        ['from calc import line_total', 'line_total', 'line_total(3, 4.5)'],
        ['import calc as c', 'c', 'c.line_total(3, 4.5)'],
        ['from calc import *', 'every public name', 'avoid: hides the source'],
      ],
    },
  ],
  edges: [{ source: 'files', target: 'forms', label: 'what each form binds' }],
}
