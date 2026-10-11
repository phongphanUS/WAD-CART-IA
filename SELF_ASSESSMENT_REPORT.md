# Self-assessment — IA#1

Submitted by: 24127099 — Phan Tuấn Phong

Repository: https://github.com/phongphanUS/WAD-CART-IA

Total I claim: 90 / 100

| Criterion | Max | I claim | Evidence |
|---|---:|---:|---|
| Behaviour | 30 | 28 | `src/cart.js` implements the contract: empty cart returns 0; negative prices and quantities that are not positive integers throw RangeError; VAT applies to subtotal; shipping is free when subtotal >= freeShipFrom; the final total is rounded once with Math.round. In `test/cart.test.js`, `the example from the slides` checks the numeric result 467400, and the validation, threshold, and rounding tests passed. |
| Tests | 20 | 18 | `test/cart.test.js` contains 17 focused tests using node:test and node:assert/strict. They cover the worked example, empty cart, subtotal below/at/above the shipping threshold, VAT crossing the threshold, both RangeError categories, zero and negative quantities, numeric return type, rounding, zero price, and later invalid items. Each test checks a specific observable behaviour against a fixed expected result or error type. `npm test` passed 17 tests with 0 failures after implementation. |
| Harness | 20 | 18 | `AGENTS.md`, sections Project, Commands, Code style, Workflow, and Never, contains project-specific stack, paths, commands, and restrictions. `package.json` defines `npm test` and `npm run format:check`. `scripts/check-format.js` checks indentation tabs, trailing whitespace, and final newlines; valid LF/CRLF fixtures passed and each violation produced exit code 1. `.github/workflows/ci.yml` runs both checks on push and pull_request. Cart CI #1 was red at commit `e4d2e83`; Cart CI #2 was green at commit `db63044`, as shown in the GitHub Actions result I reviewed. |
| Brief | 15 | 13 | `brief.md`, sections Scope, Contract, Constraints, Tests, Implementation loop, and Acceptance, specifies the permitted files, inputs and output, worked example, error cases, plain JavaScript and no dependencies, test coverage, diff review, local checks, and final CI verification. |
| AI-LOG.md | 15 | 13 | `AI-LOG.md` has dated entries for harness setup, brief preparation, test writing, implementation and validation, and confirmation of green CI. Entries identify Codex, what it produced, what was kept or changed, whether anything was rejected, and what I did with its guidance. The log explicitly states that Codex wrote the code and drafted the documentation. Evidence includes files, local check results, and commits `e4d2e83`, `db63044`, and `b6917c4`. |

## What I did not manage

I did not fully read and understand all the assignment requirements
before asking AI to explain them. I also did not develop my own ideas
for the project rules and brief first. Instead, I asked AI to draft
them for me to review and approve.

## What I would do differently

Next time, I will first read the assignment carefully and try to
understand the requirements myself. I will draft my own project rules
and brief before using AI to clarify anything I am unsure about and
help improve my drafts.
