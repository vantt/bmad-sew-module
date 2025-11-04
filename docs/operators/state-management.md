---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# State Management Reference

This guide explains how SEW tracks progress, saves outputs, and resumes long-running rewrite sessions.

## Why State Exists

- Preserve every decision, output, and reviewer note across the nine workflow steps
- Allow operators to pause, resume, or branch without losing intermediate artifacts
- Provide auditability for stakeholders and developers inspecting a project history

## State File Anatomy (`state.yaml`)

```yaml
project:
  id: seo-20251103-143022-cach-hoc-tieng-anh
  title: 'Chien luoc SEO 2025'
  created_date: '2025-11-03T14:30:22Z'
  last_updated: '2025-11-03T15:45:10Z'
  source_url: 'https://example.com/article'
workflow:
  status: in_progress
  current_step: 5
  completed_steps: [1, 2, 3, 4]
  total_steps: 9
variables:
  raw_content: 'sessions/.../01-raw-content.md'
  analysis_report: 'sessions/.../02-analysis-report.yaml'
human_approvals:
  - step: 4
    decision: approved
    timestamp: '2025-11-03T15:20:30Z'
    feedback: 'Focus on Gen Z tone'
```

### Sections

- `project`: Immutable metadata about the engagement, including the generated ID and source URL
- `workflow`: Execution status; `current_step` tracks the next action when resuming
- `variables`: Map of step outputs so later steps can load artifacts without reprocessing
- `human_approvals`: Chronological record of reviewer decisions at checkpoint steps

## Sessions Folder Layout

```
sessions/
  seo-20251103-143022-cach-hoc-tieng-anh/
    state.yaml
    state.yaml.backup
    01-raw-content.md
    02-analysis-report.yaml
    02-market-insight.yaml
    03-ideas-debate.yaml
    04-approved-ideas.yaml
    05-outline-debate.yaml
    06-final-outline.yaml
    07-first-draft.md
    08-seo-optimized.md
    09-final-publishable.yaml
```

- Each file matches a workflow step and contains the raw content generated at that point
- Backup file (`state.yaml.backup`) gives you one-click recovery if the state is corrupted
- Keep the folder intact when sharing or archiving; downstream scripts expect this structure

## Core Tasks Powering State

- `tasks/generate-project-id.task.xml`: Creates unique IDs, supports auto slugging from titles or custom input, ensures no collision with existing folders
- `tasks/state-manager.task.xml`: Handles `init`, `update`, `load`, and `list` actions, merges dictionaries deeply, and writes both primary and backup files
- `tasks/human-outline-approval-gate.task.xml` and `tasks/human-approval-gate.task.xml`: Log reviewer decisions and propagate responses back into state

## Operator Best Practices

1. Use `*list-sessions` before starting to avoid duplicate IDs
2. Let the orchestrator auto-generate IDs unless you have a naming policy
3. Use the in-agent commands (`*show-state`, `*open-output`, `*jump-to-step`) instead of editing state files manually
4. After reviewer feedback, capture it through the approval gate prompts to keep the history consistent
5. If a step fails, inspect the latest artifact, adjust context or instructions, then rerun with `*jump-to-step`

## Recovery Playbook

- **Scenario: State file corrupted**
  - Rename the broken `state.yaml`
  - Copy `state.yaml.backup` to `state.yaml`
  - Relaunch the workflow and choose Resume
- **Scenario: Need to clone a project**
  - Duplicate the entire session folder, give it a new ID, and update `project.id` before resuming
- **Scenario: Wrong reviewer decision**
  - Use `*jump-to-step` to rerun the gate; the new decision overwrites the previous entry while preserving the audit trail

## Configuration Hooks

- `{sessions_folder}` from `config.yaml` controls where the tree is stored
- `{output_folder}` defines where the final SEO article lands; state references this path when recording final deliverables
- Language, user name, and other config values populate state entries and are read by agents for consistent communication

## Related Guides

- Quick operations checklist -> `quick-start.md`
- Full workflow walkthrough -> `workflow-lifecycle.md`
- Approval procedures -> `human-approval.md`
