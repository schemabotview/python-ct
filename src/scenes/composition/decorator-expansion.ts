import type { Scene } from '@graphlearning/flow'

// §3 — a decorator and the plain assignment it stands for, then stacking order and a parameterised
// decorator. The tag example is used for order because @shout/@exclaim give the same answer either way
// and so cannot show the difference.
export const decoratorExpansion: Scene = {
  id: 'decorator-expansion',
  title: '@decorator is a function call',
  flow: 'TB',
  nodes: [
    {
      id: 'basic',
      kind: 'code',
      filename: 'decorators.py',
      label: `def log_calls(fn):
    def wrapper(*args, **kwargs):
        print("calling", fn.__name__, args)
        result = fn(*args, **kwargs)
        print("returned", result)
        return result
    return wrapper

@log_calls                         # the same as: line_total = log_calls(line_total)
def line_total(qty, price):
    return qty * price
line_total(3, 4.5)                 # calling line_total (3, 4.5) / returned 13.5`,
    },
    {
      id: 'stack',
      kind: 'code',
      filename: 'stacking.py',
      label: `def tag(name):                     # a decorator FACTORY: tag("b") returns the decorator
    def deco(fn):
        def wrapper(): return f"<{name}>{fn()}</{name}>"
        return wrapper
    return deco

@tag("b")                          # applied last, so it is the outer layer
@tag("i")                          # applied first
def hi(): return "hi"
hi()                               # '<b><i>hi</i></b>'  (swap the two: '<i><b>hi</b></i>')`,
    },
  ],
  edges: [{ source: 'basic', target: 'stack', label: 'stacking and parameters' }],
}
