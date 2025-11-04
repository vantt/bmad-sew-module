---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Operator Quick Start

Use this guide when you just need to run the SEO article rewriting workflow from scratch.

## Prerequisites Checklist

- Installed SEW module via BMAD installer; config lives at `bmad/sew/config.yaml`
- Agents compiled (`node build-agents.js`) and deployed to Claude Code (`node install-to-claude.js`) if working inside the IDE
- Source article URL, rewrite requirements, and any brand notes ready for the intake step
- Human reviewer identified and reachable for outline and final approvals

## Launch the Master Orchestrator

1. Open Claude Code (or your BMAD agent runner)
2. Invoke the agent trigger: `master-orchestrator`
3. Use `*help` to view menu commands
4. Start a new rewrite session with `*rewrite-seo-article`

## Session Initialization Flow

1. Choose **Start New Project** or **Resume Existing Project**
2. Provide the source URL and requirements (tone, target audience, mandatory keywords)
3. Confirm or override the auto-generated project ID
4. Review the session folder path printed to the console

## Human Reviewer Touchpoints

- **Step 4 - Idea Approval**: You will receive curated idea bundles; approve or reject with feedback
- **Step 6 - Outline Approval**: Evaluate debate-generated outline sections; approve once ready
- **Step 8 - Final Draft & SEO**: Approve the SEO-optimized draft and publishing package

Use the human reviewer’s feedback fields to keep decisions inside the state file.

## Essential Commands During a Session

- `*show-state` -> Prints current step, recent outputs, and session location
- `*open-output <step-number>` -> Displays the artifact for the requested step
- `*jump-to-step <step-number>` -> Re-run a specific step after adjustments
- `*list-sessions` -> Lists existing project IDs for quick resumption

## Output Artifacts

- Final deliverable: `{output_folder}/seo-article-<date>.md`
- Workflow breadcrumbs: `{sessions_folder}/{project_id}/` containing `01-raw-content.md` through `09-final-publishable.yaml`

## Troubleshooting Fast Path

- Missing context files -> Verify `workflows/seo-article-rewriting/context_files`
- Workflow halted at approval -> Collect reviewer decision, then use `*jump-to-step` if you must re-run prior steps
- Agent menu mismatch -> Rebuild agents and reinstall to Claude Code (`node build-agents.js` + `node install-to-claude.js`)
- Config drift -> Re-run BMAD installer or sync `bmad/sew/config.yaml` from source repository

## Next Guides to Consult

- Detailed step walkthrough -> `workflow-lifecycle.md`
- State storage and recovery -> `state-management.md`
- Human approval playbooks -> `human-approval.md`
