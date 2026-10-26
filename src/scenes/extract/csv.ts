import type { SceneModel } from '@graphlearning/graphl-flow'
import { ideFrame, lineOf } from '../ide'
import { dataTree, DAYS_1_3 } from './tree'
import code from '../../../spine/extract/04-csv/project/main.py?raw'
import session from '../../../spine/extract/04-csv/session.txt?raw'

// §4 — CSV: csv.DictReader honours the quotes; 'smith, kim' is the session's, and ORD-1012 is now
// rejected for its real reason (unknown product BRA-500).
export const extractCsv: SceneModel = ideFrame({
  tree: dataTree(DAYS_1_3),
  editor: { file: 'main.py', code, highlight: [lineOf(code, 'import csv'), lineOf(code, 'csv.DictReader')], show: [[1, 4], [lineOf(code, 'def read_day'), lineOf(code, 'return orders')], [lineOf(code, 'grand_total, rejected'), lineOf(code, 'print(day, len(lines)')]] },
  session,
  side: [
    {
      type: 'group', id: 'split', title: 'ORD-1012,2026-10-03,"smith, kim",BRA-500,4', icon: 'search', tone: 'ingest', dir: 'row', children: [
        { type: 'table', id: 'naive', title: 'split(","): 6 pieces', tone: 'consume', rows: [['ORD-1012'], ['2026-10-03'], ['"smith'], [' kim"'], ['BRA-500'], ['4']] },
        { type: 'table', id: 'csvr', title: 'csv: 5 fields', tone: 'store', rows: [['id', 'ORD-1012'], ['date', '2026-10-03'], ['customer', 'smith, kim'], ['sku', 'BRA-500'], ['quantity', '4']] },
      ],
    },
    { type: 'table', id: 'asked', title: 'Asked in the REPL', tone: 'store', columns: ['typed', 'answer'], rows: [['DAYS["2026-10-03"][-1]["customer"]', "'smith, kim'"]] },
    { type: 'table', id: 'now', title: 'ORD-1012 now fails honestly', tone: 'consume', rows: [['rejected ORD-1012: unknown product BRA-500']] },
    { type: 'item', id: 'cs-cap', title: 'What to remember', icon: 'memory', tone: 'ingest', bullets: ['never parse CSV with split', 'DictReader: one dict per row, keyed by the header'] },
    {
      type: 'table', id: 'rules', title: "CSV's quoting rules", tone: 'ingest', columns: ['a value with', 'is written'], rows: [
        ['a comma', 'inside "double quotes"'], ['a double quote', 'with the quote doubled: ""'], ['a line break', 'inside quotes, on two lines'],
      ],
    },
  ],
  edges: [{ from: 'naive', to: 'csvr', label: 'csv instead' }],
})
