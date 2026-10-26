import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom, lastLine } from '../ide'
import { codeTree, PACKAGE } from '../structure/tree'
import code from '../../../spine/model/08-protocols/project/pipeline/ports.py?raw'
import session from '../../../spine/model/08-protocols/session.txt?raw'

// §8 — protocols and an ABC: Source and Sink match by shape (no base class); DiscountRule becomes an ABC.
// mypy's result and the TypeError are the session's.
export const modelProtocols: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'pipeline/model.py', 'pipeline/errors.py', 'pipeline/ports.py', 'main.py', 'pyproject.toml'], { active: 'pipeline/ports.py', fresh: ['pipeline/ports.py'] }),
  editor: { file: 'pipeline/ports.py', code, highlight: [...linesFrom(code, 'class Source(Protocol)', 'def rows(self)'), ...linesFrom(code, 'class Sink(Protocol)', 'def write(self')], show: [[lineOf(code, '@dataclass'), lastLine(code)]] },
  session,
  side: [
    {
      type: 'group', id: 'shape', title: 'Matched by shape: no base class', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'source', title: 'Source (a Protocol)', sub: 'rows() → Iterator[Row]', icon: 'code' },
        { type: 'item', id: 'days', title: 'CsvDays', sub: 'has rows(): it is a Source', icon: 'file' },
        { type: 'item', id: 'sink', title: 'Sink (a Protocol)', sub: 'write(result) → None', icon: 'code' },
        { type: 'item', id: 'sinks', title: 'CsvReport, JsonSummary', sub: 'have write(): they are Sinks', icon: 'table' },
      ],
    },
    {
      type: 'table', id: 'abc', title: 'DiscountRule(ABC): the base must be filled in', tone: 'store', columns: ['typed', 'answer'], rows: [
        ['mypy', 'Success: 9 source files'], { cells: ['DiscountRule()', "TypeError: can't instantiate abstract class"], tone: 'consume' },
      ],
    },
    { type: 'item', id: 'pt-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a Protocol: has the methods, so it fits', 'an ABC: must inherit, and fill in every abstract method'] },
  ],
  edges: [{ from: 'days', to: 'source', label: 'matches', dashed: true }, { from: 'sinks', to: 'sink', label: 'match', dashed: true }],
})
