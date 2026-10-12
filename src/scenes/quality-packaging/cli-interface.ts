import type { Scene } from '@graphlearning/flow'

// §7 — the reporting tool's command line with argparse, and what each kind of invocation produced.
// main(argv=None) takes the arguments as a parameter so a test can call main(["x.csv"]) directly.
export const cliInterface: Scene = {
  id: 'cli-interface',
  title: 'A command line, defined once',
  flow: 'TB',
  nodes: [
    {
      id: 'parser',
      kind: 'code',
      filename: 'orders_report/cli.py',
      label: `def build_parser():
    p = argparse.ArgumentParser(prog="orders-report", description="Total the orders in a CSV file.")
    p.add_argument("path", help="CSV file to read")
    p.add_argument("--tax", type=float, default=0.0)
    p.add_argument("--currency", choices=["USD", "EUR"], default="USD")
    p.add_argument("-v", "--verbose", action="store_true")
    return p

def main(argv=None):                     # argv=None means sys.argv[1:]
    args = build_parser().parse_args(argv)
    ...
    return 0                             # the process exit status`,
    },
    {
      id: 'runs',
      kind: 'table',
      label: 'What each invocation does',
      headers: ['Command', 'Result', 'Exit'],
      values: [
        ['orders-report orders.csv --tax 0.2 -v', 'runs with tax=0.2, verbose', '0'],
        ['orders-report orders.csv', 'defaults: tax=0.0, USD', '0'],
        ['orders-report', 'error: path is required', '2'],
        ['... --tax lots', "invalid float value: 'lots'", '2'],
        ['... --currency GBP', "invalid choice: 'GBP'", '2'],
      ],
    },
  ],
  edges: [{ source: 'parser', target: 'runs', label: 'invocations' }],
}
