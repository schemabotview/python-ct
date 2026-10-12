import type { Scene } from '@graphlearning/flow'

// §2 — a three-way shipping decision and which branch each total takes. The two boundary rows (50 and
// 20) are there on purpose: >= is inclusive, and the first true test wins.
export const decisionBranches: Scene = {
  id: 'decision-branches',
  title: 'Only the first true branch runs',
  flow: 'TB',
  nodes: [
    {
      id: 'shipping',
      kind: 'code',
      filename: 'shipping.py',
      label: `total = 13.5
if total >= 50:
    shipping = 0.0
elif total >= 20:
    shipping = 2.5
else:
    shipping = 5.0
print(shipping)      # 5.0: only the else block ran`,
    },
    {
      id: 'branches',
      kind: 'table',
      label: 'Which branch runs for each total?',
      headers: ['total', 'first true test', 'shipping'],
      values: [
        ['60', 'total >= 50', '0.0'],
        ['50', 'total >= 50', '0.0'],
        ['25', 'total >= 20', '2.5'],
        ['20', 'total >= 20', '2.5'],
        ['13.5', 'none: else', '5.0'],
      ],
    },
  ],
  edges: [{ source: 'shipping', target: 'branches', label: 'trace each input' }],
}
