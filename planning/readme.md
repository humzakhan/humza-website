# Planning docs

Use this directory for any non-trivial implementation or design plan.

## Required files for a plan

Each planned workstream should live in its own subdirectory and include:

- `goal.md` — the outcome the agent is trying to achieve.
- `plan.md` — the execution path for reaching that outcome.

Example:

```text
planning/
  homepage-copy-refresh/
    goal.md
    plan.md
```

## `goal.md`

Purpose: define success before implementation starts.

Recommended content:

```md
# Goal

Update the homepage copy so it reflects the current product positioning.

## Success criteria

- The homepage mentions the correct product domains.
- Copy is clear on mobile and desktop.
- Build and typecheck pass.

## Out of scope

- Layout redesigns.
- New animations.
```

## `plan.md`

Purpose: list the smallest safe steps to reach the goal.

Recommended content:

```md
# Plan

1. Find the homepage copy component.
2. Make the requested copy changes only.
3. Run validation.
4. Commit the finished slice.

## Validation

- `pnpm run build`
- `pnpm run typecheck`
- `git diff --check`
```

## Agent guidance

When adding a plan:

1. Create a new subdirectory under `planning/` with a short kebab-case name.
2. Add both `goal.md` and `plan.md` before editing product code.
3. Treat the examples above as structure, not fixed content.
4. Keep the goal stable; update the plan as implementation details change.
5. If the work is tiny and no plan is needed, do not create empty planning docs.
