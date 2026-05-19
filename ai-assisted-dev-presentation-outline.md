# Modern AI-Assisted Development

Working draft for an interactive presentation and live demo.

## 1) Presentation Goal

Show how AI can make software teams faster and more reliable when used with clear process, boundaries, and verification. Demonstrate this through a small live build using Spec-Driven Development with OpenSpec.

## 2) Target Audience And Outcomes

By the end, the audience should:

- Understand the main opportunities and risks in AI-driven development.
- Leave with practical habits for using AI efficiently and sustainably.
- See a concrete workflow for AI-assisted Spec-Driven Development.
- Understand what OpenSpec solves in day-to-day engineering work.

## 3) Suggested Agenda (45-60 min)

1. Why this matters now (5 min)
2. AI-driven development: opportunities vs challenges (10 min)
3. Practical guidelines for efficient and sustainable AI usage (10-12 min)
4. What is Spec-Driven Development, and why it helps (8-10 min)
5. Live OpenSpec demo: implement a small feature end-to-end (15-20 min)
6. Q&A + key takeaways (5 min)

## 4) Core Narrative Arc

Use this storyline to keep the presentation cohesive:

1. AI increases output, but unmanaged output creates chaos.
2. Teams need guardrails, not just better prompts.
3. As implementation gets faster, the bottleneck shifts to testing, validation, and review — and those must get faster too.
4. Specs create shared intent; AI accelerates execution against that intent.
5. OpenSpec makes this loop concrete: propose -> align -> implement -> verify.

## 5) Challenges And Opportunities To Cover

## Opportunities

- Faster prototyping and implementation throughput.
- Better onboarding via AI-assisted code and architecture explanation.
- Wider leverage for smaller teams (design, coding, docs, tests).
- Lower friction for repetitive tasks (refactors, migrations, boilerplate).

## Challenges

- Hallucinated requirements and silent assumption drift.
- Quality debt from unverified generated code.
- Context loss across long tasks and multiple sessions.
- Over-reliance that weakens engineering judgment.
- Security/compliance risks when prompts or outputs are not controlled.
- A new bottleneck: code is produced quickly, but tests, review, and CI stay slow — and accumulated "verification debt" hides defects.
- "Fox guarding the henhouse" risk: the same AI session/agent that wrote the code also approves it, with no independent check.

## 6) Practical Guidelines And Tips

## Workflow Guidelines

- Start from intent, not code: define goal, constraints, acceptance criteria.
- Break work into small verifiable steps.
- Ask AI for alternatives and trade-offs before implementation.
- Require explicit assumptions in every non-trivial AI response.

## Quality And Reliability

- Treat AI output as untrusted until tests and checks pass.
- Verify behavior, not only syntax or lint status.
- Keep a red/green loop visible (failing test -> implementation -> passing test).
- Preserve human ownership of architecture and final decisions.

## Fast Verification Loops (And Separation Of Concerns)

Key point for agenda item 3 — **after** opportunities/challenges, **before** Spec-Driven Development:

- Faster execution requires equally faster testing, validation, and review; otherwise AI only moves the bottleneck.
- Partially separate the work stages — do not let the same agent/session write, verify, and approve alone:
  - Tests derived from specs/acceptance criteria (before or separately from implementation).
  - Automated CI/checks as an independent gate.
  - Human review focused on intent and scope (not just style).
  - A separate agent/model/session for review when possible.
- Specs and acceptance criteria are the basis for independent verification: "Does this meet the requirements?" — not "Does the code look reasonable?"

## Example Review And Verification Tools (Some Provide Separation)

Example tools — not an endorsement of a specific vendor, but to show you can build separate verification layers:

| Layer                         | Example tool / mechanism                               | What it provides                                              |
| ----------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| **Foundation — rules/skills** | `rules` / `skills` in Cursor (or similar IDE)          | Enforcement **inside every session**, before all other layers |
| Pre-PR (IDE)                  | **Cursor** — Find Issues / Review before push          | Local scan before code leaves the machine                     |
| On the PR (GitHub)            | **Bugbot**, **GitHub Copilot** code review             | Automated review on the diff, in PR context                   |
| External/additional review    | **CodeRabbit**, **Greptile**, **Sourcery**, and others | A review agent separate from the author — "not the same fox"  |
| Classic gate                  | CI, lint, tests                                        | Objective verification that does not depend on AI             |

### Foundation Layer: Rules And Skills (Earliest)

This layer runs **in every agent session**, before push or PR — and prevents unnecessary back-and-forth:

1. **Unit tests for every new functionality** — a rule/skill that requires: new logic = new unit tests.
2. **Build + lint + tests after every change** — a rule/skill that requires the agent to run all three at the end of each step, and fix failures before continuing.

Why it matters:

- Catches regressions **immediately**, not after push or review.
- Shortens loops — less "it doesn't work" / "try again" / "you forgot a test."
- This is soft separation: the agent **writes**, then runs an **objective gate** (build/lint/test) that does not depend on "looks good to me."

Example rule wording:

- "When adding or changing behavior, add or update unit tests in the same change."
- "After every code change, run build, lint, and tests; fix failures before proceeding."

Talking point: each layer adds a **separate checkpoint** — rules/skills in every session, IDE before push, bot on PR, CI as final gate, and a human on intent and scope.

## Sustainability And Team Practices

- Standardize team workflows through ongoing use and refinement of `rules` and `skills`.
- Track defect sources: model issue, prompt issue, unclear spec, missing tests.
- Use AI where it compounds value, not everywhere by default.

## 7) AI-Assisted Spec-Driven Development (Talking Points)

Traditional pain points:

- Requirements stay implicit in chat or tickets.
- Different engineers interpret requests differently.
- Scope creep appears mid-implementation.
- Reviews focus on style, not intent alignment.

How Spec-Driven Development helps:

- Makes intent explicit and testable before coding.
- Aligns stakeholders on acceptance criteria.
- Reduces rework by catching ambiguity early.
- Creates a durable artifact connecting "why" to "what."

Where AI fits:

- Drafting proposal options and edge cases.
- Mapping specs to implementation tasks.
- Generating scaffolds/tests from approved specs.
- Updating docs and release notes from completed specs.

## 8) OpenSpec Live Demo Plan

Goal: show OpenSpec as an execution framework, not just documentation.

Demo script:

1. Introduce feature request in plain language.
2. Create/change proposal in OpenSpec format.
3. Refine requirements and acceptance criteria with audience input.
4. Convert spec into implementation tasks.
5. Implement a vertical slice with AI assistance.
6. Run checks/tests and validate acceptance criteria.
7. Show traceability from request -> spec -> code -> verification.

What to emphasize while live coding:

- Where AI helps (speed, option generation).
- Where human judgment is mandatory (scope, quality, trade-offs).
- How OpenSpec reduces "lost in chat history" and "what are we actually building?"

## 9) Simple App Idea For Demo

Proposed app: **Focus Buddy** (tiny task planning assistant)

Concept:

- User adds tasks with estimated effort.
- User sets available time for today.
- App proposes a focused plan (top tasks that fit time).
- User marks tasks done; app tracks completion streak.

Why this is good for the presentation:

- Easy domain that everyone understands quickly.
- Small enough for a live feature addition.
- Supports realistic requirements, edge cases, and acceptance criteria.
- Lets you show both frontend behavior and logic/testing.

## 10) What To Build Before The Meeting vs During

## Build Before Meeting (70-80% done)

- App shell and basic UI scaffold.
- Data model (task fields, status, estimated minutes, created date).
- Basic create/list/update flow already working.
- Minimal test setup and one existing test passing.
- OpenSpec baseline docs and one example completed change.

Reason: Avoid risky setup/debug time live. Keep demo focused on process quality.

## Build Live During Presentation (20-30%)

Feature to build live: **"Auto-plan my next focus session"**

Live scope:

- Add spec/change proposal in OpenSpec.
- Define acceptance criteria (e.g., chooses tasks within selected time budget).
- Implement planning logic for selecting tasks.
- Add/adjust UI control ("Generate Plan").
- Add 1-2 targeted tests for core logic and edge case.
- Run tests and demonstrate result with sample data.

This gives a full end-to-end story in limited time.

## 11) Timing Template For The Live Demo (15-20 min)

- 2 min: Feature request + constraints
- 4 min: Spec drafting and alignment
- 6-8 min: Implementation with AI
- 3-4 min: Tests and verification
- 2 min: Retrospective ("what OpenSpec solved")

## 12) Audience Interaction Ideas

- Let audience vote between two acceptance criteria variants.
- Ask audience to identify one edge case before coding.
- Pause after code generation: "What should we verify first?"
- End with a quick maturity checklist for their own teams.

## 13) Speaker Notes (Key Messages To Repeat)

- "AI speed without process creates expensive rework."
- "The faster you write, the faster you must verify — or you only moved the bottleneck."
- "Don't let the fox guard the henhouse: whoever wrote cannot be the only approver."
- "Specs are not bureaucracy; they are alignment tools."
- "The winning pattern is human intent + AI acceleration + strong verification."
- "OpenSpec keeps this loop visible and repeatable."

## 14) Risks And Mitigations For The Session

- Live demo breaks -> have a tagged checkpoint branch ready.
- Network/model delays -> pre-prepare short fallback clips/screenshots.
- Scope creep from audience suggestions -> keep a strict "parking lot."
- Tooling friction -> test full demo flow on same machine beforehand.

## 15) Prep Checklist

- Dry-run the full talk once with timer.
- Dry-run demo twice (normal + fallback plan).
- Confirm all commands/tools work locally.
- Preload sample data and one "bad case" for edge-case discussion.
- Keep one final slide with framework recap and links.

## 16) Open Questions For Iteration

1. Who is the primary audience (engineers only, or mixed product/engineering)?
2. Exact time limit (45, 60, or longer)?
3. Should the live demo be frontend-heavy, backend-heavy, or balanced?
4. Do you want to include governance/security guidance for enterprise teams?
5. Do you want a companion handout/checklist after the talk?
