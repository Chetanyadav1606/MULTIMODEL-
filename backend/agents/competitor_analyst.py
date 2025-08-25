from typing import Dict, List
from .base import Agent

try:
    from tools.web_search import ddg_titles  # type: ignore
except Exception:
    def ddg_titles(query: str, limit: int = 5) -> List[str]:
        return [f"(hint) Search result for: {query} [{i+1}]" for i in range(limit)]

competitor_analyst = Agent(
    role="Competitor Analyst",
    goal="Identify competitors and compare strengths/weaknesses",
    backstory="Specialist in competitor mapping."
)

def node(state: Dict) -> Dict:
    idea: str = state.get("idea", "")
    mode: str = state.get("mode", "fast")
    prior = state.get("market", "")

    hints = ddg_titles(f"{idea} competitors", limit=12 if (mode or "").lower() == "deep" else 5)
    context = f"{prior}\n\nHints:\n- " + "\n- ".join(hints)

    task = (
        "Map competitor categories; list 6–10 named competitors. "
        "Summarize strengths/weaknesses, pricing posture, and moats. "
        "Call out white-space opportunities."
    )

    text = competitor_analyst.run(task=task, context=context, mode=mode)
    state["competitors"] = text
    return state
