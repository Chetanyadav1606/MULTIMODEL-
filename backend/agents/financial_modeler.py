from typing import Dict
from .base import Agent

financial_modeler = Agent(
    role="Financial Modeler",
    goal="Build financial projections for the idea",
    backstory="Experienced startup finance consultant."
)

def node(state: Dict) -> Dict:
    idea: str = state.get("idea", "")
    mode: str = state.get("mode", "fast")
    market = state.get("market", "")
    competitors = state.get("competitors", "")
    context = f"{market}\n\n{competitors}"

    task = (
        "Draft 3-year directional model with assumptions: target customer, pricing, CAC, channels, "
        "Y1–Y3 revenue/COGS/gross margin, OPEX buckets, break-even path, top risks. "
        "Show a small table and a sensitivity note."
    )

    text = financial_modeler.run(task=task, context=context, mode=mode)
    state["financials"] = text
    return state
