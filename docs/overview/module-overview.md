---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# SEW Module Overview

SEW (SEO Expert Writer) is a BMAD module engineered to localize and elevate long-form content while protecting brand intent. The system combines nine specialized agents, a stateful flagship workflow, and human review checkpoints to deliver culturally tuned, search-optimized articles.

## Mission & Use Cases

- Deliver Vietnamese-first SEO articles derived from source content in any language
- Maintain brand consistency through debate-driven idea curation and mandatory human approvals
- Provide reusable infrastructure for content teams to iterate on outlines, drafts, and final deliverables

## Core Capabilities

- Multi-agent orchestration that spans research, debate, drafting, optimization, and QA
- Persistent state management with resumable sessions and step-level artifacts
- Configurable workflow gates empowering human reviewers to approve or redirect at critical moments
- Rich context ingestion via personas, guidelines, and cultural lexicons stored alongside the workflow
- Developer-friendly build pipeline with rapid agent compilation and Claude Code deployment scripts

## Primary Components

- **Agents**: Nine module agents covering orchestration, analysis, writing, SEO, QA, and publishing. See `../agents/AGENTS-CATALOG.md` for duties and menu access.
- **Workflow**: `workflows/seo-article-rewriting` encapsulates the full rewrite journey with state tracking and human review loops. Details live in `../operators/workflow-lifecycle.md`.
- **Tasks & Tools**: Task library handles state persistence, debates, optimization passes, and human approval gates. Quick summary in `../tasks/README.md`.
- **Context Files**: Domain references inside `workflows/seo-article-rewriting/context_files` keep debates aligned with brand, audience, and cultural tone.

## Audience Segments

- **Operators**: Content strategists and editors running end-to-end rewrites. Start with `../operators/quick-start.md`.
- **Reviewers**: Human approvers who validate ideas, outlines, drafts, and SEO passes. Procedural guardrails live in `../operators/human-approval.md`.
- **Developers**: Engineers extending agents, workflows, or tasks. Development procedures and repo strategy documented in `../developers/`.
- **Stakeholders**: Product owners validating scope and evolution. High-level roadmap captured in `../strategy/prd-seo-rewriting-project.md`.

## How to Navigate the Documentation Tree

1. **Quick Orientation** -> This overview + `../operators/quick-start.md`
2. **Run the Workflow** -> `../operators/workflow-lifecycle.md`
3. **Manage Approvals & State** -> `../operators/state-management.md` and `../operators/human-approval.md`
4. **Extend or Customize** -> `../developers/development-workflow.md`, `../developers/build-pipeline.md`, `../developers/workflow-design.md`
5. **Understand the Vision** -> `../strategy/prd-seo-rewriting-project.md`

## Module Health Snapshot

- Version 2.0.0 with production-ready state management
- Sessions stored under `{sessions_folder}` with nine canonical step outputs
- Output artifacts published to `{output_folder}` with SEO-ready Markdown and YAML exports
- Installer-driven config at `bmad/sew/config.yaml` keeps language, user name, and folder paths synchronized across agents and tasks
