import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf, linesFrom } from '../ide'
import { codeTree, PACKAGE } from './tree'
import code from '../../../spine/structure/04-type-hints/project/pipeline/transform.py?raw'
import session from '../../../spine/structure/04-type-hints/session.txt?raw'

// §4 — type hints: the pipeline's contracts written down. The annotations and the AttributeError (hints
// are not checked at run time) are the session's.
export const structureTypeHints: SceneModel = ideFrame({
  tree: codeTree([...PACKAGE, 'main.py'], { active: 'pipeline/transform.py' }),
  editor: { file: 'pipeline/transform.py', code, highlight: [...linesFrom(code, 'Summary = TypedDict', '})'), lineOf(code, 'def to_cents'), lineOf(code, 'def summarise')], show: [[lineOf(code, 'CENT = '), lineOf(code, '})')], [lineOf(code, 'def to_cents'), lineOf(code, 'return amount.quantize')], [lineOf(code, 'def summarise'), lineOf(code, 'totals: list')]] },
  session,
  side: [
    {
      type: 'group', id: 'box', title: 'summarise, as a typed box', icon: 'workflow', tone: 'ingest', children: [
        { type: 'item', id: 'in', title: 'lines: Iterable[Line]', sub: 'Line = dict[str, Any]', icon: 'file' },
        { type: 'item', id: 'out', title: '-> Summary', sub: 'a TypedDict: eight keys, each with its type', icon: 'table', tone: 'store' },
      ],
    },
    {
      type: 'table', id: 'hints', title: "The pipeline's contracts", tone: 'ingest', columns: ['function', 'in → out'], rows: [
        ['iter_rows', 'Iterable[Path] → Iterator[dict[str, str]]'], ['parse_row', 'Row → Line'], ['price_line', 'Line, Mapping → Decimal'],
        ['priced_lines', 'Iterable[Row], list → Iterator[Line]'], ['write_summary', 'Summary, list, Path → None'],
      ],
    },
    { type: 'table', id: 'runtime', title: 'Python records hints; it does not check them', tone: 'store', columns: ['typed', 'answer'], rows: [['to_cents.__annotations__', "{'amount': Decimal, 'return': Decimal}"], { cells: ['to_cents("9.95")', 'AttributeError: no quantize'], tone: 'consume' }] },
    { type: 'item', id: 'th-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['a hint is a contract: what goes in, what comes out', 'checked by tools, not by Python'] },
    { type: 'note', id: 'th-note', tone: 'ingest', text: 'Hints are for tools: an editor completes and flags with them, and a type checker reads them all. Python only stores them.' },
  ],
  edges: [{ from: 'in', to: 'out', label: 'summarise' }],
})
