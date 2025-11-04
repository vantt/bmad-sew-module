[Back to Module README](../README.md)

---
last-redoc-date: 2025-11-04
---

# Agents Overview

The SEW module uses nine agents organized into three functional tiers.

1. **Orchestration** ? `master-orchestrator.md` connects operators to workflows, state manager, and approval gates.
2. **Analysis & Preparation** ? `content-fetcher.md`, `content-analyzer.md`, `market-insight-agent.md`, `debate-moderator.md`, `qa-editor.md` transform the source article into vetted insights and review-ready outlines.
3. **Production & Delivery** ? `adaptive-writer.md`, `seo-specialist.md`, `publishing-formatter.md` craft the localized draft, optimize SEO, and package outputs for publishing.

Consult `AGENTS-CATALOG.md` for command summaries and quick access to each agent. Every agent loads `bmad/sew/config.yaml` on activation so language preferences, output folders, and session paths stay synchronized across the system.
