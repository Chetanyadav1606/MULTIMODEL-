from typing import Dict, List
from .base import Agent

# Optional external tools; if unavailable, we fall back to lightweight hints
try:
    from tools.web_search import ddg_titles  # type: ignore
except Exception:
    def ddg_titles(query: str, limit: int = 5) -> List[str]:
        return [f"(hint) Search result for: {query} [{i+1}]" for i in range(limit)]

try:
    from tools.hn_tool import hn_search  # type: ignore
except Exception:
    def hn_search(query: str, limit: int = 5) -> List[str]:
        return [f"(HN) Possibly related thread: {query} #{i+1}" for i in range(limit)]


def _safe_hn_search(query: str, limit: int) -> List[str]:
    """
    Call hn_search robustly regardless of its signature.
    Tries positional, then keyword 'n', then falls back to slicing.
    Never raises — always returns a list.
    """
    try:
        # Some implementations: hn_search(query, limit)
        return hn_search(query, limit)  # type: ignore[misc]
    except TypeError:
        try:
            # Others: hn_search(query, n=limit)
            return hn_search(query, n=limit)  # type: ignore[misc, call-arg]
        except TypeError:
            try:
                # Others: hn_search(query) only
                res = hn_search(query)  # type: ignore[misc]
                return (res or [])[:limit] if isinstance(res, list) else []
            except Exception:
                return []


market_researcher = Agent(
    role="Market Researcher",
    goal="Research the market trends and potential",
    backstory="Expert in analyzing industries and opportunities."
)

def node(state: Dict) -> Dict:
    idea: str = state.get("idea", "")
    mode: str = state.get("mode", "fast")
    limit = 5 if (mode or "").lower() == "fast" else 12

    titles = ddg_titles(idea, limit=limit) or []
    hn = _safe_hn_search(idea, limit) or []

    context = "\n".join(["DuckDuckGo snippets:"] + titles + ["", "HN discussions:"] + hn)

    task = (
        f"Analyze market size and momentum for: {idea}. "
        f"Estimate directional TAM/SAM/SOM and name top growth drivers and demand signals."
    )

    text = market_researcher.run(task=task, context=context, mode=mode)
    state["market"] = text
    return state
