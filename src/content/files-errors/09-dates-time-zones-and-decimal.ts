import type { Section } from '../types'

// The Decimal default rounding (half-even) is stated because it surprises people who expect school rounding. Time-zone data may need the tzdata package on some systems, which the narration mentions.
export const datesTimeZonesAndDecimal: Section = {
  id: 'dates-time-zones-and-decimal',
  title: "Dates, time zones, Decimal, and domain-appropriate representations",
  scene: 'time-and-money',
  focus: 'code',
  slide: `## Dates, time zones, and Decimal

### Dates and times
- \`date\` is a calendar day; \`datetime\` adds a time
- A **naive** datetime has no zone; an **aware** one has
- Mixing them raises a \`TypeError\`
- Store and compare in **UTC**; convert to local only to display

### Parsing
- \`fromisoformat\` reads ISO text such as \`2026-10-12T09:30:00+00:00\`
- \`strptime\` reads other layouts: say whether it is day-first

### Decimal
- \`Decimal("4.50")\` is exact: build it from a **string**
- \`Decimal(0.1)\` keeps the float's error
- The default rounding is **half-even**: choose a mode for money`,
  narration:
    "Two kinds of value look simple and are not: times and money. Start with time. A date is a calendar day. A datetime adds a time of day. The crucial distinction is between naive and aware. A naive datetime has no time zone, so nine thirty means nothing definite: nine thirty where? An aware datetime carries its zone. In the card, we create nine thirty in New York in October, then convert it to UTC and get thirteen thirty, because New York was four hours behind UTC at that date. Comparing a naive datetime with an aware one raises a TypeError, which is Python refusing to guess. The table shows how timestamp text is interpreted. Without an offset, the text is naive. Adding plus zero zero colon zero zero marks it as UTC, and minus four hours marks New York time, and thirteen thirty UTC is the same instant as nine thirty at minus four. The rule of thumb is to store and compare times in UTC, and convert to local time only to show someone. On some systems, the zone database may need installing separately. Now money. Floats cannot represent most decimal fractions exactly, as zero point one plus zero point two reminded us. The decimal module can. Build a Decimal from a string, never from a float, because Decimal of the float zero point one faithfully copies the float's error, a long tail of digits. With strings, four point five zero times three is exactly thirteen point five zero. One more subtlety: Decimal's default rounding is half-even, which rounds a tie to the nearest even digit, so choose a rounding mode explicitly when money is involved. Next, one complete flow using everything in this chapter.",
}
