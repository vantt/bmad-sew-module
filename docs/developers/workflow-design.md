---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Workflow Design Guidelines

Practical checklist for authoring SEW workflows that comply with BMAD v6 conventions.

## Foundations

- Every workflow lives under `workflows/<name>/` with `workflow.yaml`, `instructions.md`, `template.md` (if document output), and `checklist.md`
- Execution powered by `{project-root}/bmad/core/tasks/workflow.xml`; never skip critical mandates or partial file reads
- Prefer intent-based instructions with clear goals, optional steps flagged explicitly

## Configuration (`workflow.yaml`)

- Set `installed_path`, `instructions`, `template`, and `validation` using `{project-root}` variables
- Mark `template: false` for action workflows to skip output file creation
- Document expected inputs via `recommended_inputs` when human operators must supply starting files

## Instruction Writing

- Begin with `<critical>` section restating engine requirements
- Organize steps in numeric order; use `goal` attributes to describe outcomes
- Leverage `<template-output>` for each document section and obey markdown spacing rules
- Include `<ask>` tags when human approval or data gathering is mandatory
- Use `<check if="condition">` blocks for guarded actions rather than inline logic

## State and Resumability

- Persist intermediate artefacts with explicit filenames stored in `state-manager`
- Reference `{sessions_folder}` and `{output_folder}` variables for consistency across agents and tasks
- When creating new workflows, reuse state task patterns from `seo-article-rewriting`

## Approval Patterns

- Human gates should call dedicated tasks (e.g., `human-approval-gate`, `human-outline-approval-gate`)
- Collect reviewer rationale and feed it back into state for auditing
- Provide re-run guidance so operators know how to recover from rejection loops

## Testing Checklist

- Validate using `tasks/validate-workflow.xml` against the checklist file
- Dry run workflow with mock context to confirm template outputs render correctly
- Ensure agent menus reference workflows via `run-workflow="{project-root}/..."`
- Add documentation updates in `docs/operators/` or `docs/developers/` when behavior changes

## References

- Existing implementation: `workflows/seo-article-rewriting`
- Operator lifecycle: `../operators/workflow-lifecycle.md`
- Approval procedures: `../operators/human-approval.md`
- Build and deployment steps: `build-pipeline.md`
