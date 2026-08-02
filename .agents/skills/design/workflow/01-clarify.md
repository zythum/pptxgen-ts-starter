# Workflow 01 — Clarify Requirements

## Contract

**Inputs:** user request, supplied materials, existing `.deck/` when editing.
**Decision:** choose execution mode and resolve only missing requirements.
**Output:** `.deck/brief.md` with `Status: confirmed`.
**Gate:** explicit approval, or explicit delegation recorded in the brief.
**Validation:** all seven fields are answered, unknown, or delegated — never
silently invented.
**Resume:** read the brief's mode, authority, delegation, and constraints.

## 1. Choose the mode

Use the mode table in `SKILL.md`:

- `new-interactive`
- `new-delegated`
- `existing-edit`
- `single-slide`
- `layout-only`

For an existing deck, read `.deck/` and relevant slide comments first. Do not
re-ask settled questions unless the request invalidates them.

## 2. Resolve the seven requirements

Ask only what the user has not already supplied. Combine missing questions into
one concise prompt when practical.

| #   | Requirement                | Why it matters                         |
| --- | -------------------------- | -------------------------------------- |
| 1   | Topic and one core message | Defines every page's purpose           |
| 2   | Audience and concern       | Sets language, proof, and density      |
| 3   | Purpose/context            | Selects narrative and CTA              |
| 4   | Duration or reading mode   | Derives page count and pace            |
| 5   | Style/brand preference     | Prevents visual rework                 |
| 6   | Existing materials         | Determines research and asset work     |
| 7   | Hard constraints           | Prevents fatal omissions or disclosure |

Never invent brand colors, legal claims, confidentiality rules, or required
sections. If style is open, propose one style with a rationale; it remains a
proposal until the applicable gate or delegation covers it.

## 3. Restate and handle the Gate

Restate in a compact block:

```text
Mode:        <mode>
Topic:       <core message>
Audience:    <audience + concern>
Purpose:     <context + outcome>
Duration:    <minutes/reading mode> → target <N> slides
Style:       <preference or proposal>
Materials:   <available/missing/confidential>
Constraints: <non-negotiables>
Delegation:  <scope or none>
```

### Interactive mode

Ask: “Is this brief correct? Anything to change?” Stop until approved.

### Delegated mode

Proceed only when the user explicitly authorized autonomous decisions. Record:

- the wording/scope of delegation;
- assumptions made under it;
- decisions that still require confirmation because they exceed that scope.

### Existing/single-slide mode

If the request fits the confirmed brief and spec, do not reopen the global
brief gate. Update only affected brief fields when the request changes them.

## 4. Write `.deck/brief.md`

After the gate condition is satisfied, overwrite the example with the schema in
`00-deck-workspace.md`. Use `Decision authority: user-delegated` only when the
delegation is explicit.

## Anti-patterns

- Asking all seven questions again when most were answered.
- Treating “make it professional” as approval of an arbitrary style.
- Proceeding from silence rather than approval or delegation.
- Rebuilding an existing deck without reading its planning files.
- Writing the brief before the gate and labeling it confirmed.
