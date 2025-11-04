---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Human Approval Playbook

This guide equips reviewers with the knowledge to approve or redirect the workflow at critical checkpoints.

## Reviewer Role Summary

- Guardrails brand, tone, and strategic alignment that AI alone cannot guarantee
- Provide actionable feedback when rejecting ideas, outlines, or drafts
- Confirm when a step is ready so the orchestrator can move forward without rework

## Approval Gates in the Workflow

1. **Step 4 - Idea Approval** in `tasks/human-approval-gate.task.xml`
   - Input Bundle: Debate results (`03-ideas-debate.yaml`) with score, rationale, and keyword plan
   - Reviewer Task: Select winning concept(s) and capture guidance for next steps
   - Rejection Path: Workflow loops back to Step 3 to generate alternate concepts

2. **Step 6 - Outline Approval** in `tasks/human-outline-approval-gate.task.xml`
   - Input Bundle: Proposed outline (`05-outline-debate.yaml`) annotated with SEO placement and narrative beats
   - Reviewer Task: Approve structure, rearrange sections if needed, flag missing coverage
   - Rejection Path: Returns to Step 5 for debate refinement

3. **Step 8 - Final Draft Approval** triggered via `tasks/human-approval-gate.task.xml`
   - Input Bundle: SEO-optimized draft (`08-seo-optimized.md`) plus publishing package YAML
   - Reviewer Task: Check tone, SEO alignment, compliance, and readiness for publishing
   - Rejection Path: Sends workflow back to Step 8 or Step 7 depending on issue scope

## Approval Interface Tips

- Provide concrete feedback in the prompt-provided field; the state manager records it under `human_approvals`
- State entries are timestamped; include explicit instructions so operators can track revisions
- If you approve but want optional changes, document them in the comment so the operator can follow up

## Common Decision Criteria

| Gate | Approve When | Reject When |
| ---- | ------------ | ----------- |
| Step 4 | Clear angle, aligns with campaign goals, differentiates from competitors | Ideas conflict with brand voice or lack audience relevance |
| Step 6 | Outline balances storytelling, SEO placement, and reader flow | Critical sections missing, weak transitions, overemphasis on keywords |
| Step 8 | Draft reads natively, fulfills requirements, SEO checklist passes | Tone mismatch, factual errors, SEO rules violated, missing reviewer adjustments |

## When Things Go Wrong

- State corruption during approval -> Use backup restore from `state.yaml.backup`
- Reviewer unavailable -> Operator can pause workflow; state preserves current step indefinitely
- Feedback misapplied -> Re-run the gate with `*jump-to-step` and update notes; the latest decision overwrites prior entry while keeping history in the session folder

## Best Practices for Reviewers

1. Skim the analysis reports before approving ideas to understand the strategic context
2. When rejecting, specify whether the team should tweak context files or re-run debates as-is
3. Keep a shared checklist (tone, compliance, CTA) so every reviewer applies consistent standards
4. Confirm the project ID in the prompt to ensure notes land in the correct session
5. Encourage operators to share final artifacts (`09-final-publishable.yaml`) for archival before closing the project

## Related Documentation

- Operator quick start -> `quick-start.md`
- State handling procedures -> `state-management.md`
- Full workflow walkthrough -> `workflow-lifecycle.md`
