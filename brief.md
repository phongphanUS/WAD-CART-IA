# Brief — Implement cartTotal

## Goal
Implement cartTotal(items, options) according to README.md and the
session 2 assignment specification. Follow AGENTS.md.

## Scope
You may edit:
- src/cart.js
- test/cart.test.js

Do not change package.json, project rules, CI, the format checker,
or unrelated files during implementation.
If this brief needs clarification, propose the wording for my review
before updating brief.md. Record AI contributions separately in AI-LOG.md.

## Contract
- items is an array of objects: { name, price, qty }.
- options contains { vatRate, freeShipFrom, shipFee }.
- subtotal is the sum of price * qty for all items.
- VAT is subtotal * vatRate and does not apply to shipping.
- Shipping is 0 when subtotal >= freeShipFrom; otherwise it is shipFee.
  Compare the threshold against the subtotal before VAT.
- Return subtotal + VAT + shipping as a number, rounded once at the end
  to the nearest whole dong using Math.round.
- An empty cart returns 0, with no VAT or shipping.
- A negative price throws RangeError.
- A qty that is not a positive integer throws RangeError, including
  zero, negative values, and fractional values.

Worked example:
- Items: [{ name: 'Áo thun', price: 180000, qty: 2 },
  { name: 'Sổ tay', price: 45000, qty: 1 }].
- Options: { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }.
- Subtotal: 405000. VAT: 32400. Shipping: 30000.
- Expected result: 467400, with typeof result equal to 'number'.

## Constraints
- Plain JavaScript, ES modules, no dependencies.
- Preserve the named export and cartTotal(items, options) signature.
- Keep the implementation small and readable, following existing style.
- Do not return a formatted currency string.
- Do not invent validation rules or option defaults absent from the spec.
- Do not remove or weaken tests to obtain a pass.

## Tests
Use Node.js's built-in node:test runner with node:assert/strict,
as in the starter. Do not add external testing dependencies.

Preserve the starter example test and add focused tests for:
- Empty cart.
- Subtotal below the free-shipping threshold, including a case where
  VAT takes the total above the threshold but shipping still applies.
- Subtotal exactly at the threshold.
- Subtotal above the threshold.
- Negative price.
- Zero quantity.
- Negative quantity.
- Fractional quantity.
- Numeric return type.
- Rounding a fractional total to the nearest whole dong.

Each test must check a specific observable behaviour with an independently
calculated expected result. Tests must be able to fail if that rule breaks.

## Implementation loop
1. Read README.md, AGENTS.md, this brief, and the existing source and test.
   The starter test has already been observed failing locally and in CI.
2. Implement in small steps and show every changed diff with an explanation.
3. Pause for my review before running the changed code.
4. After my approval, run npm test and npm run format:check.
5. Report actual results and any unresolved issues.
6. If a failure exposes missing or ambiguous requirements, propose a brief
   clarification consistent with the assignment and repeat the loop.
   If the requirement is already explicit, fix the code against it.
7. Record what was kept, changed, rejected, and done by hand in AI-LOG.md
   while the work is fresh. Do not invent student contributions.

## Acceptance
- Every specified behaviour is covered and correct.
- npm test and npm run format:check both pass.
- The diff contains only the agreed changes.
- I have reviewed the diff and can explain the implementation and tests.
- After I approve the commit and push, verify that GitHub Actions passes
  both checks and retain the run link as evidence.
