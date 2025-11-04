[Back to Module README](../README.md)

---
last-redoc-date: 2025-11-04
---

# Tasks Snapshot

## State & Project Control

- `state-manager.task.xml` ? Initialize, update, load, and list session state files with automatic backups
- `generate-project-id.task.xml` ? Build unique project slugs and prevent collisions

## Intake & Research

- `fetch-and-save-content.task.xml` ? Crawl URL, convert HTML to Markdown, store metadata in the session folder
- `analyze-content.task.xml` ? Produce structural, tone, and keyword density analysis in YAML
- `preliminary-market-research.task.xml` ? Gather trend signals, competitor positioning, and user questions

## Debate & Approvals

- `ideas-debate.task.xml` ? Coordinate multi-agent argumentation over strategic angles
- `outline-debate.task.xml` ? Generate outlines with SEO placement guidance
- `human-approval-gate.task.xml` ? Capture reviewer decisions for ideas and final drafts
- `human-outline-approval-gate.task.xml` ? Capture reviewer decisions for outlines

## Drafting & Delivery

- `adaptive-writing.task.xml` ? Produce Vietnamese-first draft aligned with persona guidance
- `seo-optimization.task.xml` ? Adjust headings, keyword placement, metadata, and schema recommendations
- `quality-assurance-and-formatting.task.xml` ? Run QA checks and package outputs for publishing

## Related Documentation

- Workflow lifecycle: `../docs/operators/workflow-lifecycle.md`
- State management: `../docs/operators/state-management.md`
- Human approvals: `../docs/operators/human-approval.md`
