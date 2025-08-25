# validator.py
from typing import TypedDict, Literal, Dict, Any, Callable
from langgraph.graph import StateGraph, END

# --- Import agent callables with graceful fallbacks ---------------------------
# Each agent module may export either a function named after the file
# (e.g., market_researcher(state)) OR only `node(state)`.
# We normalize to *_node callables below.

def _import_agent_callable(module_name: str, func_name: str) -> Callable[[Dict[str, Any]], Dict[str, Any]]:
    """
    Import an agent callable. Prefer a function like `market_researcher`.
    If not found, fall back to module.node.
    """
    # Try: from agents.market_researcher import market_researcher
    try:
        mod = __import__(f"agents.{module_name}", fromlist=[func_name])
        fn = getattr(mod, func_name)
        if callable(fn):
            return fn
    except Exception:
        pass

    # Fallback: from agents import market_researcher as mod; use mod.node
    try:
        mod = __import__(f"agents.{module_name}", fromlist=["node"])
        fn = getattr(mod, "node")
        if callable(fn):
            return fn
    except Exception as e:
        raise ImportError(f"Could not import callable for agents.{module_name}: {e}")

    raise ImportError(f"agents.{module_name} does not expose `{func_name}` or `node`")

market_node      = _import_agent_callable("market_researcher",     "market_researcher")
competitor_node  = _import_agent_callable("competitor_analyst",    "competitor_analyst")
finance_node     = _import_agent_callable("financial_modeler",     "financial_modeler")
report_node      = _import_agent_callable("report_generator",      "report_generator")


# --- State definition ---------------------------------------------------------
Mode = Literal["fast", "deep"]

class ResearchState(TypedDict):
    idea: str
    mode: Mode               # "fast" | "deep"
    market: str
    competitors: str
    financials: str
    report: str


# --- Build the workflow graph -------------------------------------------------
def _build_graph():
    workflow = StateGraph(ResearchState)

    # Add nodes (each returns a partial dict to merge into state)
    workflow.add_node("market",     market_node)
    workflow.add_node("competitor", competitor_node)
    workflow.add_node("finance",    finance_node)
    workflow.add_node("report",     report_node)

    # Edges
    workflow.add_edge("market", "competitor")
    workflow.add_edge("competitor", "finance")
    workflow.add_edge("finance", "report")
    workflow.add_edge("report", END)

    # Entry point
    workflow.set_entry_point("market")

    return workflow.compile()

_app = _build_graph()


# --- Public API ---------------------------------------------------------------
def run_validation(idea: str, mode: str = "fast") -> Dict[str, Any]:
    """
    Runs the full multi-agent workflow for the given idea and returns the final state.
    The returned dict contains keys defined in ResearchState.
    """
    mode_clean: Mode = "deep" if str(mode).lower() == "deep" else "fast"

    initial_state: ResearchState = {
        "idea": idea,
        "mode": mode_clean,
        "market": "",
        "competitors": "",
        "financials": "",
        "report": "",
    }

    # Invoke the compiled graph and return its final state
    return _app.invoke(initial_state)
