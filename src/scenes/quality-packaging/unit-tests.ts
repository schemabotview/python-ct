import type { Scene } from '@graphlearning/flow'

// §1 — tests for the pricing code, and the failing report a real regression produced. The bug (pct
// treated as a fraction, so 10 became 1 - 10) gave Decimal('-180.00'), found by DiscountTests. The
// timing line is omitted from the report because it varies on every run.
export const unitTests: Scene = {
  id: 'unit-tests',
  title: 'A test states what must stay true',
  flow: 'TB',
  nodes: [
    {
      id: 'tests',
      kind: 'code',
      filename: 'tests/test_calc.py',
      label: `class LineTotalTests(unittest.TestCase):
    def test_typical(self):
        self.assertEqual(line_total(3, "4.50"), Decimal("13.50"))
    def test_zero_quantity(self):                 # a boundary
        self.assertEqual(line_total(0, "4.50"), Decimal("0.00"))
    def test_negative_quantity_rejected(self):    # a failure case
        with self.assertRaises(ValueError):
            line_total(-1, "4.50")

class DiscountTests(unittest.TestCase):           # a regression test
    def test_ten_percent(self):
        self.assertEqual(discount(Decimal("20.00"), Decimal("10")), Decimal("18.00"))`,
    },
    {
      id: 'report',
      kind: 'code',
      filename: 'python -m unittest discover -s tests -t .',
      label: `F.....
FAIL: test_ten_percent (tests.test_calc.DiscountTests.test_ten_percent)
AssertionError: Decimal('-180.00') != Decimal('18.00')
FAILED (failures=1)         # after fixing discount(): ...... OK`,
    },
  ],
  edges: [{ source: 'tests', target: 'report', label: 'run, read, fix' }],
}
