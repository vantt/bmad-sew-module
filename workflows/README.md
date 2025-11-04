[Back to Module README](../README.md)

---
last-redoc-date: 2025-11-04
---

# Workflows Overview

The SEW module currently ships one production workflow: `seo-article-rewriting/`. It manages intake, context gathering, debate-driven ideation, adaptive drafting, human approvals, SEO optimization, and QA while persisting state at each step.

| Workflow | Description | Primary Outputs |
| -------- | ----------- | ---------------- |
| `seo-article-rewriting` | Multi-agent rewrite pipeline with debate loops, state recovery, and dual approval gates | `{output_folder}/seo-article-<date>.md`, `{sessions_folder}/{project_id}/09-final-publishable.yaml` |

Each workflow folder contains `workflow.yaml`, `instructions.md`, `template.md` (if applicable), `checklist.md`, and `README.md`. Follow this structure when adding new workflows so the documentation set and validation tooling remain consistent.

## Related Documentation

- Lifecycle guide: `../docs/operators/workflow-lifecycle.md`
- State management reference: `../docs/operators/state-management.md`
- Workflow design guidelines: `../docs/developers/workflow-design.md`
- Product requirements: `../docs/strategy/prd-seo-rewriting-project.md`
