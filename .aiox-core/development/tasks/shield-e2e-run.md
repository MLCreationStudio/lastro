# Task: Shield E2E Run

**Task ID:** shield-e2e-run
**Version:** 1.0
**Purpose:** Execute and validate End-to-End user journeys using the browser tool
**Orchestrator:** @shield
**Mode:** Browser Automation

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | Entry point for the E2E test |
| `scenario` | string | Yes | User story or scenario to validate |

## Steps

1. **Step 1: Scenario Mapping**
   - Action: Break down the `scenario` into discrete browser steps (click, type, navigate, assert).
   - Output: action_plan

2. **Step 2: Execution**
   - Action: Use the `browser` tool to execute the `action_plan` step-by-step.
   - Output: execution_logs + screenshots

3. **Step 3: Assertion**
   - Action: Verify that the final state matches expected outcome (e.g., "Success toast visible").
   - Output: pass_fail_decision

4. **Step 4: Reporting**
   - Action: Summarize findings with evidence in `e2e_report.md`.
   - Output: e2e_report.md

## Veto Conditions

- If any step in a CRITICAL flow fails (e.g., Login, Checkout) → **VETO**: System is unstable.

## Completion Criteria

- All steps in scenario executed.
- Visual evidence (screenshots) captured for failures.
- Final report generated.
