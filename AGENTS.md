# Project rules — cartTotal

## Project
- Plain JavaScript running on Node.js with ES modules.
- Read README.md for the authoritative cartTotal specification.
- Implementation: src/cart.js.
- Tests: test/cart.test.js, using node:test and node:assert/strict.

## Commands
- Run npm test from the repository root.
- Run the configured format or lint check once it is added to package.json.
- Keep CI checks consistent with the local checks.

## Code style
- Follow the starter's style: 2-space indentation, single quotes,
  named exports, and no semicolons.
- Keep the implementation small and readable.
- Preserve the cartTotal(items, options) public signature.

## Workflow
- Confirm the starter test fails before making changes.
- Read the saved brief before implementing.
- Make small changes and show the diff for student review before execution.
- Test observable behaviour from the specification.
- Cover the example, empty cart, shipping threshold, invalid price,
  invalid quantity, numeric result, and rounding.
- Record actual AI contributions in AI-LOG.md while they are fresh.

## Never
- Never add dependencies.
- Never remove or weaken tests just to make them pass.
- Never change the specification to match the implementation.
- Never invent test results, CI results, or student-authored work.