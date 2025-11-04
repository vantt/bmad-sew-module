---
last-redoc-date: 2025-11-04
status: production-ready
version: 2.0.0
created: 2025-10-31
owner: FGCare
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Product Requirements: SEO Article Rewriting System

## Vision

Deliver a production-grade SEO localization platform that transforms source articles into Vietnamese-first experiences while protecting strategic intent, cultural tone, and measurable search performance.

## Problem Overview

- Manual rewrites consume scarce analyst and editor hours
- Pure AI rewrites miss brand nuance, cultural cues, and compliance
- Late-stage rework is expensive when drafts fail SEO or stakeholder checks

## Goals and KPIs

- 95%+ successful resume rate for in-progress projects
- <1% state corruption incidents thanks to automated backups
- Two human approval gates to guarantee brand alignment
- End-to-end turnaround target: under 2 hours for a single long-form rewrite once inputs are ready

## Solution Summary

A nine-step, multi-agent workflow orchestrated by `master-orchestrator` that combines automated research, debate-driven ideation, adaptive drafting, SEO optimization, and human review checkpoints. Every step persists artefacts to session folders so operators can pause, resume, or branch safely.

## System Architecture

### Workflow

- `workflows/seo-article-rewriting` drives the full lifecycle from intake to publishing package
- Each step saves an artefact (`01-raw-content.md` through `09-final-publishable.yaml`)
- State managed by `tasks/state-manager.task.xml` with deep-merge updates and backup files

### Agents

| Agent | Role Highlights |
| ----- | --------------- |
| master-orchestrator | Operator command hub, session state liaison |
| content-fetcher | Crawls source URL, normalizes HTML to Markdown |
| content-analyzer | Extracts core ideas, sentiment, structure |
| market-insight-agent | Surfaces trends, competitor positioning |
| debate-moderator | Coordinates idea and outline debates |
| adaptive-writer | Generates Vietnamese draft aligned to persona |
| seo-specialist | Optimizes headings, keywords, metadata, schema |
| qa-editor | Runs quality checks and compliance reviews |
| publishing-formatter | Packages final outputs for CMS handoff |

Full capabilities documented in `../agents/AGENTS-CATALOG.md`.

### Context Resources

- Session-specific knowledge base at `workflows/seo-article-rewriting/context_files`
- Includes brand guidelines, mission, personas, cultural lexicon, competitor insights, and SEO blacklist
- Agents consume these files during debates, drafting, and QA to maintain consistency

### Key Tasks

- `generate-project-id.task.xml`: Unique slug generation with collision checks
- `fetch-and-save-content.task.xml`: Content acquisition and Markdown conversion
- `analyze-content.task.xml` and `preliminary-market-research.task.xml`: Dual analytical pass
- `ideas-debate.task.xml` and `outline-debate.task.xml`: Argumentation engines for ideation and structure
- `human-approval-gate.task.xml` / `human-outline-approval-gate.task.xml`: Reviewer checkpoints
- `adaptive-writing.task.xml`, `seo-optimization.task.xml`, `quality-assurance-and-formatting.task.xml`: Drafting, optimization, QA, and packaging

## User Roles

- **Operator**: Runs the orchestrator, coordinates inputs, manages state
- **Human Reviewer**: Approves ideas, outline, and final draft with recorded decisions
- **Developer**: Extends agents, workflows, or tasks, maintains installer and build scripts
- **Stakeholder**: Tracks roadmap and validates scope using this document and linked references

## Experience Flow (Step Highlights)

1. Intake: Collect URL, requirements, reviewer details, initialize state
2. Fetch: Normalize source article and capture metadata
3. Analyze: Produce both content and market reports
4. Debate Ideas: Multilateral scoring with context enforcement
5. Approval Gate 1: Human selection of winning angles
6. Debate Outline: Generate structured plan with SEO placements
7. Approval Gate 2: Human validation of outline beats
8. Draft & Optimize: Adaptive writing then SEO refinement with optional rework loop
9. QA & Package: Style, compliance, and publish-ready YAML output

Resume support allows jumping to any step while reusing previous artefacts.

## State Management Snapshot

- Session folders: `{sessions_folder}/{project_id}`
- Files: `state.yaml`, `state.yaml.backup`, and step artefacts 01-09
- `state.yaml` structure covers project metadata, workflow progress, output pointers, and reviewer decisions
- Backups enable one-command recovery if corruption occurs

## Dependencies and Integrations

- BMAD config at `bmad/sew/config.yaml` defines language, user name, and output paths
- Claude Code deployment uses `build-agents.js` and `install-to-claude.js` for rapid iteration
- Installer script syncs module snapshot from `src/modules/sew`

## Risks and Mitigations

- **Reviewer Bottleneck**: Documented playbooks and notifications reduce idle time
- **Context Drift**: Centralized context files and SEO blacklist guard against tone or compliance issues
- **State Loss**: Automatic backups plus manual `*backup-session` command
- **Agent Regression**: Developers follow `docs/developers/build-pipeline.md` before distributing changes

## Roadmap Notes

- Current release: v2.0.0 with full state management and nine-agent roster
- Next iterations consider multilingual expansion, additional approval templates, and analytics dashboards
- Tasks `ideas-debate` and `outline-debate` prepared for catalog-driven prompt tuning

## Source References

- Operator guides: `../operators/`
- Developer procedures: `../developers/`
- Workflow README: `../../workflows/seo-article-rewriting/README.md`
- Module overview: `../overview/module-overview.md`
