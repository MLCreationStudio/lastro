# Task: Shield Security Audit

**Task ID:** shield-security-audit
**Version:** 1.0
**Purpose:** Comprehensive security review focusing on OWASP Top 10 and dependency vulnerabilities
**Orchestrator:** @shield
**Mode:** Security Analysis

## Steps

1. **Step 1: Dependency Check**
   - Action: Run `npm audit` or equivalent to find known vulnerabilities in packages.
   - Output: dependency_report

2. **Step 2: Static Analysis**
   - Action: Use `coderabbit` or `grep_search` to find common OWASP patterns (XSS, SQLi, Insecure Direct Object References).
   - Output: vulnerability_list

3. **Step 3: Configuration Review**
   - Action: Inspect `.env.example`, `supabase/` policies, and firewall configs.
   - Output: config_audit

4. **Step 4: Final Assessment**
   - Action: Grade the project security and provide a remediation roadmap.
   - Output: security_audit_report.md

## Veto Conditions

- If any CRITICAL CVE is found with no mitigation plan → **VETO**: Security risk too high.

## Completion Criteria

- Dependency audit complete.
- Static analysis of core modules complete.
- Audit report with severity ratings generated.
