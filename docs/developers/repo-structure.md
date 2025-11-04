---
last-redoc-date: 2025-11-04
---

[Back to README](../../README.md) | [Up to Docs Index](../index.md)


# Repository Structure Strategy

Guidance for maintaining SEW as a standalone module while leveraging the BMAD workspace.

## Objectives

- Keep SEW source code under version control in its own repository
- Use `bmadv6` as the execution workspace without pushing to the BMAD core repo
- Provide repeatable sync between source repo, installed module, and installer snapshot

## Recommended Layout

```
bmadv6-workspace/
  bmadv6/                # BMAD core checkout (read-only for SEW team)
    bmad/sew/            # Installed module (junction or checkout of SEW repo)
    src/modules/sew/     # Snapshot used by BMAD installer
sew-module/              # Primary SEW git repository (submodule or sibling)
```

## Linking Options

| Approach | Pros | Cons |
| -------- | ---- | ---- |
| Junction/Symlink | Simple local setup, mirrors live changes | Windows/macOS specific steps |
| Git Submodule | Exact commit tracking inside `bmadv6` | Requires `git submodule update` discipline |
| Git Subtree | Single repo view for consumers | Merge operations more complex |

## Sync Script Template

```powershell
# sync-to-src.ps1
$source = "bmad/sew/"
$dest   = "src/modules/sew/"
robocopy $source $dest /E /MIR /XD sessions docs\drafts
```

- Exclude runtime folders such as `sessions/` or temporary drafts
- Run after completing development to refresh installer snapshot

## Workflow

1. Clone both `bmadv6` and `sew-module`
2. Link `bmad/sew` to the SEW repo (junction/submodule)
3. Develop inside linked directory
4. Run sync script before `npm run bmad:install`
5. Commit changes in `sew-module`

## Deployment Notes

- Installer picks up files from `src/modules/sew` only
- Keep `_module-installer/install-config.yaml` updated with module metadata
- Distribute releases by tagging the SEW repository and sharing installer instructions

## Related References

- Build pipeline -> `build-pipeline.md`
- Day-to-day workflow -> `development-workflow.md`
