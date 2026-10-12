import type { Scene } from '@graphlearning/flow'

// §9 — one instant in two time zones, a naive/aware comparison that fails, and Decimal arithmetic from
// strings; then the timestamp-text table that says what each spelling means. 2026-10-12 is in New York's
// daylight time, so UTC-4 is the offset the output shows.
export const timeAndMoney: Scene = {
  id: 'time-and-money',
  title: 'Instants, zones, and exact money',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'time_money.py',
      label: `from datetime import datetime, timezone
from zoneinfo import ZoneInfo
from decimal import Decimal

ny = datetime(2026, 10, 12, 9, 30, tzinfo=ZoneInfo("America/New_York"))
ny.astimezone(timezone.utc)        # 2026-10-12 13:30:00+00:00
datetime(2026, 10, 12, 13, 30) < ny    # TypeError: naive versus aware

Decimal("4.50") * 3                # Decimal('13.50')
Decimal("0.1") + Decimal("0.2")    # Decimal('0.3')
Decimal(0.1)                       # the float's exact value`,
    },
    {
      id: 'stamps',
      kind: 'table',
      label: 'What each timestamp text means',
      headers: ['Text', 'Meaning'],
      values: [
        ['2026-10-12T09:30:00', 'naive: no zone, ambiguous'],
        ['2026-10-12T09:30:00+00:00', 'aware: 09:30 in UTC'],
        ['2026-10-12T09:30:00-04:00', 'aware: New York in October'],
        ['2026-10-12T13:30:00+00:00', 'same instant as the row above'],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'stamps', label: 'reading timestamp text' }],
}
