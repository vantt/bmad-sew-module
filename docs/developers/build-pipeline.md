---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Build Pipeline Reference

Understand when to use custom SEW scripts versus the standard BMAD installer.

## Overview

SEW supplies two local helper scripts for rapid iteration alongside the official `npm run bmad:install` workflow. Choose the path that fits your development stage.

## Script Matrix

| Command | Type | Scope | Typical Duration | Primary Use |
| ------- | ---- | ----- | ---------------- | ----------- |
| `node build-agents.js` | Custom | `bmad/sew/agents` | ~2s | Compile `.agent.yaml` sources to `.md` during active editing |
| `node install-to-claude.js` | Custom | Copies agents/workflows/tasks to `.claude/commands` | ~1s | Refresh Claude Code commands for immediate testing |
| `npm run bmad:install` | Official CLI | Installs selected module(s) from `src/modules` to `bmad` and `.claude` | ~25s | Clean install, regression checks, release packaging |

## Recommended Workflow

1. **Daily Development**
   - Edit agents/workflows under `bmad/sew`
   - Run `node build-agents.js`
   - Run `node install-to-claude.js`
   - Test in Claude Code
2. **Pre-Release Validation**
   - Sync changes to `src/modules/sew`
   - Execute `npm run bmad:install`
   - Verify prompts, installers, and manifest updates

## Decision Guide

- Use custom scripts when iterating quickly and staying within the SEW module
- Use the BMAD installer for first-time installs, cross-module regression, or when sharing updates with the wider team
- Always rerun the installer before publishing to confirm the module still provisions correctly from `src/modules/sew`

## Troubleshooting

- Missing commands in Claude Code -> Rerun both custom scripts to copy fresh assets
- Installer fails -> Ensure `src/modules/sew/_module-installer/install-config.yaml` has correct module code and rerun with elevated permissions
- Stale agent build -> Delete corresponding `.md` then rerun `build-agents.js`

## Related References

- Developer workflow -> `development-workflow.md`
- Repo sync strategy -> `repo-structure.md`
