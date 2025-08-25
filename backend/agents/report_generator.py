from typing import Dict
from .base import Agent

report_generator = Agent(
    role="Report Generator",
    goal="Summarize findings into a clear report",
    backstory="Professional business strategist."
)

def node(state: Dict) -> Dict:
    idea: str = state.get("idea", "")
    mode: str = state.get("mode", "fast")
    market = state.get("market", "")
    competitors = state.get("competitors", "")
    financials = state.get("financials", "")

    context = f"""Idea: {idea}

--- Market ---
{market}

--- Competitors ---
{competitors}

--- Financials ---
{financials}
"""

    task = (
        "Produce a structured validation report with sections: Executive Summary, "
        "Market Outlook, Competitive Landscape, Business & Financial Outlook, "
        "Risks & Mitigations, Final Verdict (High/Medium/Low) with a 2–3 sentence justification. "
        "Include a 5-step next-actions roadmap."
    )

    text = report_generator.run(task=task, context=context, mode=mode)
    state["report"] = text
    return state
