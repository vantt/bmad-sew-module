---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Development Workflow Guide

Use this playbook to extend SEW safely while keeping source, installed assets, and Claude Code in sync.

## Environment Layout

```
bmadv6/
  bmad/sew/                  # Installed module (active runtime)
  src/modules/sew/           # Source of truth for installer snapshots
  .claude/commands/bmad/sew/ # Claude Code runtime bundle
```

## Daily Loop

1. Work inside `bmad/sew` for rapid iteration
2. Rebuild agents with `node build-agents.js`
3. Push updates to Claude Code via `node install-to-claude.js`
4. Test commands/flows in Claude Code

## Publishing Loop

1. Copy changes to `src/modules/sew` (robocopy, rsync, or manual)
2. Run `npm run bmad:install`
3. Validate prompts, workflows, and installer Q&A
4. Commit and push the source repo (`src/modules/sew`) to the shared repository

## Branching Strategy

- Feature branches per change set (e.g., `feature/new-agent`)
- Keep `bmad/sew` clean by syncing from `src/modules/sew` after each release
- Document custom scripts inside the module for quick discovery

## Quality Checklist

- Agents compile with no validation errors
- Workflows include `workflow.yaml`, `instructions.md`, `template.md`, `checklist.md`
- Tasks run under `bmad/core/tasks/workflow.xml` without skipped mandates
- Documentation updated in `docs/` with new sections linked from README

## Troubleshooting

- Installer missing module -> Confirm module `code` in `_module-installer/install-config.yaml`
- Claude Code not refreshing -> Ensure `.claude/commands` path matches install script output
- Diverged source vs installed -> Re-run sync script and rebuild before committing

## Related References

- Build pipeline details -> `build-pipeline.md`
- Repository structure strategy -> `repo-structure.md`
- Workflow authoring guidance -> `workflow-design.md`
