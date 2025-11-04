---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Workflow Lifecycle Guide

This step-by-step walkthrough explains how the `seo-article-rewriting` workflow runs from kickoff to final publishing.

## Step 0 - Project Setup

- `master-orchestrator` requests source URL, rewrite goals, language cues, and reviewer contact
- `tasks/generate-project-id.task.xml` suggests a project slug and builds the session folder
- `tasks/state-manager.task.xml` writes `state.yaml` with initial metadata and empty outputs
- Outcome: Session directory ready with `state.yaml` and log of requested inputs

## Step 1 - Fetch & Normalize Content

- Agent: `content-fetcher`
- Task: `tasks/fetch-and-save-content.task.xml`
- Actions: Crawl source URL, convert HTML to Markdown, strip ads, record source metadata
- Output: `01-raw-content.md`

## Step 2 - Dual Analysis Pass

- Agents: `content-analyzer`, `market-insight-agent`
- Tasks: `tasks/analyze-content.task.xml`, `tasks/preliminary-market-research.task.xml`
- Actions: Extract semantic cores, sentiment, structure, emergent trends, competitive data
- Outputs: `02-analysis-report.yaml`, `02-market-insight.yaml`

## Step 3 - Ideas Debate

- Agents: `content-analyzer`, `market-insight-agent`, `seo-specialist`, `adaptive-writer`, `debate-moderator`
- Task: `tasks/ideas-debate.task.xml`
- Actions: Score and debate candidate angles using brand context and blacklist rules
- Output: `03-ideas-debate.yaml`

## Step 4 - Human Approval (Ideas)

- Task: `tasks/human-approval-gate.task.xml`
- Actions: Present top-ranked ideas, capture decision and reviewer notes
- Outputs: `04-approved-ideas.yaml`, updated `human_approvals` array in state
- Branching: Reject -> loop back to Step 3, Approve -> proceed to outline debate

## Step 5 - Outline Debate

- Agents: Debate cohort plus `debate-moderator`
- Task: `tasks/outline-debate.task.xml`
- Actions: Transform approved ideas into structural outline with heading-level SEO strategy
- Output: `05-outline-debate.yaml`

## Step 6 - Human Approval (Outline)

- Task: `tasks/human-outline-approval-gate.task.xml`
- Actions: Collect reviewer sign-off on section order, emphasis, and narrative beats
- Outputs: `06-final-outline.yaml`, updated `human_approvals`
- Branching: Reject -> refines Step 5, Approve -> triggers drafting phase

## Step 7 - Draft Generation

- Agent: `adaptive-writer`
- Task: `tasks/adaptive-writing.task.xml`
- Actions: Write full Vietnamese draft aligning with persona, tone, and cultural lexicon
- Output: `07-first-draft.md`

## Step 8 - SEO Optimization & Final Approval

- Agent: `seo-specialist`
- Task: `tasks/seo-optimization.task.xml`
- Actions: Adjust headings, keyword density, metadata, link prompts, schema suggestions
- Human Gate: `tasks/human-approval-gate.task.xml` for final draft review
- Outputs: `08-seo-optimized.md`, `09-final-publishable.yaml`

## Step 9 - QA & Publishing Prep

- Agent: `qa-editor`, `publishing-formatter`
- Task: `tasks/quality-assurance-and-formatting.task.xml`
- Actions: Grammar pass, consistency checks, formatting for CMS handoff, YAML packaging
- Output: `09-final-publishable.yaml` (updated with QA results and publishing metadata)

## Resume Logic

- `state-manager` records `current_step` after each completion
- Use `*jump-to-step` to revisit any step; workflow reloads artifacts from `state.yaml`
- Human approvals stored in chronological order; re-running gates appends updated decisions

## Where to Look for Artifacts

- Source files and context: `workflows/seo-article-rewriting/context_files`
- Step outputs: `{sessions_folder}/{project_id}/`
- Final deliverables: `{output_folder}/seo-article-<date>.md` and `09-final-publishable.yaml`

## Related References

- Quick launch instructions -> `quick-start.md`
- State system deep dive -> `state-management.md`
- Reviewer playbooks -> `human-approval.md`
- Task and agent catalogs -> `../tasks/README.md`, `../agents/AGENTS-CATALOG.md`
