[Back to Module README](../../README.md) | [Up to Workflows Overview](../README.md)

---
last-redoc-date: 2025-11-04
---

# Workflow: SEO Article Rewriting

## Overview

The flagship workflow orchestrates nine specialized agents to transform a source article into a Vietnamese-first, SEO-optimized deliverable. It combines automated analysis, debate-driven ideation, adaptive drafting, human approvals, and final QA. State is persisted after every step so operators can pause, resume, or branch without losing progress.

## How to Run

```bash
workflow bmad/sew/workflows/seo-article-rewriting/workflow.yaml
```

Alternatively trigger `*rewrite-seo-article` from the `master-orchestrator` agent menu. See `docs/operators/quick-start.md` for launch steps.

## Inputs

- Source article URL plus rewrite requirements gathered during Step 0 intake
- Context files in `context_files/` (brand guideline, mission, personas, cultural lexicon, competitor analysis, SEO blacklist)
- Module configuration from `bmad/sew/config.yaml` (language, output folders, reviewer contact)

## Outputs

- Final Markdown article: `{output_folder}/seo-article-<date>.md`
- Publishing package and QA summary: `{sessions_folder}/{project_id}/09-final-publishable.yaml`
- Intermediate artefacts: `{sessions_folder}/{project_id}/01-raw-content.md` through `08-seo-optimized.md`, plus `state.yaml` and `state.yaml.backup`

## Step Highlights

1. **Project Setup** ? Generate or resume project ID, initialize state
2. **Fetch Content** ? Normalize source article with `fetch-and-save-content`
3. **Dual Analysis** ? Produce content and market insight reports
4. **Ideas Debate** ? Multi-agent argumentation over strategic angles
5. **Human Approval** ? Reviewer selects winning ideas (`human-approval-gate`)
6. **Outline Debate** ? Build SEO-aware structure for the article
7. **Human Approval** ? Reviewer validates outline (`human-outline-approval-gate`)
8. **Draft & Optimize** ? Adaptive writing followed by SEO refinement
9. **QA & Package** ? Grammar checks, formatting, and publishing bundle creation

Resume support allows operators to re-run any step using stored artefacts and `*jump-to-step`.

## Human Review

Two approval stages capture reviewer decisions inside `state.yaml`:

- Step 4: Idea approval (`04-approved-ideas.yaml`)
- Step 6/8: Outline and final draft approvals (`06-final-outline.yaml`, `09-final-publishable.yaml`)

Guidance for reviewers lives in `docs/operators/human-approval.md`.

## Related Documentation

- Operator lifecycle: `docs/operators/workflow-lifecycle.md`
- State management: `docs/operators/state-management.md`
- System PRD: `docs/strategy/prd-seo-rewriting-project.md`
- Agent catalog: `../agents/AGENTS-CATALOG.md`
