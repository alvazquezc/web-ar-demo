# Repository Guidelines

This repository hosts Codex agent exercises and supporting utilities. Keep contributions focused, well-documented, and easy for other agents to execute within the sandboxed environment.

## Project Structure & Module Organization

Place runtime code in `src/` with packages grouped by feature (for example, `src/schedulers/round_robin.py`). Store reusable prompt material in `prompts/`, leaving the canonical scenario in `prompt.txt` untouched unless you intend to update it for every exercise. Add automated checks under `tests/` and fixtures or mock assets inside `tests/fixtures/`. Any helper scripts should live in `scripts/`, and generated artifacts must stay out of version control.

## Build, Test, and Development Commands

Install dependencies with `python -m pip install -r requirements.txt`. Run formatter and static checks together via `make lint`, which wraps `black src tests` and `ruff check src tests`. Execute unit coverage with `pytest tests --maxfail=1 --disable-warnings`. When reproducing a scenario locally, use `python -m src.runner --prompt prompts/example.yaml`. Document any new entry point scripts at the top of `scripts/README.md`.

## Coding Style & Naming Conventions

Target Python 3.11, 4-space indentation, and `utf-8` encoded files. Use descriptive module names (`async_agent.py`), PascalCase for classes, snake_case for functions and variables, and ALL_CAPS for constants. Prefer type-annotated signatures and dataclasses for structured data. Run `black` and `ruff` before committing; configuration is anchored in `pyproject.toml`. Keep functions under ~40 lines and favor early returns when they improve readability.

## Testing Guidelines

Write tests with `pytest`, mirroring the module path (`tests/schedulers/test_round_robin.py`). Cover edge cases such as empty queues and sandbox permission errors. Aim for ≥90% branch coverage; inspect gaps with `pytest --cov=src --cov-report=term-missing`. Include regression fixtures whenever a bug fix references a previous prompt failure, and use descriptive test names like `test_runner_rejects_network_calls_by_default`.

## Commit & Pull Request Guidelines

Follow Conventional Commit semantics (`feat: add async scheduler`). Reference issue or prompt IDs in the footer (`Refs: prompt-042`). Each PR must include: purpose summary, testing evidence (command output or reasoning), and notes on sandbox or approval requirements. Request review from another agent when behavior changes or new prompts are introduced, and add screenshots or transcripts for UX-affecting work.

## Agent-Specific Tips

Verify every command against sandbox rules before recommending it to users, and provide escalation justifications inline when approvals are needed. Record any deviations from the default workflow in `AGENTS.md` so the next agent inherits exact operating context.
