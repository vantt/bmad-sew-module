---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Operator Command Reference

Quick lookup for the commands available while running the SEW master orchestrator.

## Core Session Commands

| Command | Usage |
| ------- | ----- |
| `*help` | Display numbered menu of all available commands |
| `*rewrite-seo-article` | Launch the SEO article rewriting workflow |
| `*resume-project` | Resume a previously saved session by project ID |
| `*list-sessions` | Show all session folders stored in `{sessions_folder}` |
| `*show-state` | Print current step, latest outputs, and timestamps |
| `*open-output <step>` | View a specific step artifact inside the agent session |
| `*jump-to-step <step>` | Re-run a given step using existing state context |
| `*abort-session` | Gracefully stop the workflow, preserving current state |

## Reviewer Collaboration Commands

| Command | Usage |
| ------- | ----- |
| `*notify-reviewer` | Send summary of pending approval gate to designated reviewer |
| `*capture-feedback` | Record reviewer notes after an external discussion |
| `*replay-approval <step>` | Re-run the human approval gate for a given step |

## State Management Helpers

| Command | Usage |
| ------- | ----- |
| `*export-state` | Copy `state.yaml` to a user-selected path for audit |
| `*import-state` | Load an externally supplied `state.yaml` into current session |
| `*backup-session` | Create an on-demand backup of the session folder |

## Troubleshooting Tools

| Command | Usage |
| ------- | ----- |
| `*validate-context` | Verify that required context files exist and are readable |
| `*refresh-agents` | Rebuild agents (if supported) and reload menus |
| `*open-log` | Display recent log events for the orchestrator |
| `*report-issue` | Summarize current state, step outputs, and errors for developers |

## Suggested Daily Flow for Operators

1. Start with `*list-sessions` to confirm whether you are creating or resuming work
2. Launch `*rewrite-seo-article` and follow orchestrator prompts
3. After each approval gate, use `*show-state` to confirm progress before proceeding
4. If rework is required, employ `*jump-to-step` or `*replay-approval <step>` as appropriate
5. Wrap the day by running `*backup-session` to snapshot state externally

## Related References

- Quick start guide -> `quick-start.md`
- State management procedures -> `state-management.md`
- Human approval playbook -> `human-approval.md`
- Workflow lifecycle -> `workflow-lifecycle.md`
