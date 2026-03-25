# Task: Shield Leak Scan

**Task ID:** shield-leak-scan
**Version:** 1.0
**Purpose:** Scan codebase, logs, and environment files for sensitive data (API keys, PII, secrets)
**Orchestrator:** @shield
**Mode:** Systematic Scan

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | string | No | Directory to scan (default: current) |
| `exclude` | list | No | Paths to exclude |

## Steps

1. **Step 1: Pattern Identification**
   - Action: Define regex patterns for AWS keys, Stripe keys, generic Bearer tokens, and email PII.
   - Output: pattern_list

2. **Step 2: Codebase Search**
   - Action: Execute `grep_search` across `path`, excluding `node_modules` and `.git`.
   - Output: match_results

3. **Step 3: Verification**
   - Action: Manually verify if matches are actual secrets or false positives (e.g., test keys).
   - Output: verified_leaks

4. **Step 4: Mitigation Recommendation**
   - Action: Generate a report with suggested fixes (rotation, moving to .env, redacting logs).
   - Output: leak_report.md

## Veto Conditions

- If any HIGH SEVERITY secret (verified) remains unaddressed → **VETO**: Cannot proceed with deployment.

## Completion Criteria

- All source files scanned.
- No new secrets detected in git diff.
- Leak report generated.
