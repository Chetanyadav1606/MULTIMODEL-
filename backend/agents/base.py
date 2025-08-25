import os
from typing import Optional, Tuple

# Try to load dotenv if present, but don't hard-require it
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

# --- Gemini setup with graceful fallback ---
def _get_genai() -> Tuple[Optional[object], Optional[str]]:
    """
    Returns (genai_module_or_None, model_name_or_None).
    Honors GOOGLE_API_KEY and optional GEMINI_MODEL env override.
    """
    try:
        import google.generativeai as genai  # type: ignore
    except Exception:
        return None, None

    key = (os.getenv("GOOGLE_API_KEY") or "").strip()
    if not key:
        return None, None

    model_name = (os.getenv("GEMINI_MODEL") or "gemini-2.5-flash").strip()
    try:
        genai.configure(api_key=key)
        return genai, model_name
    except Exception:
        return None, None

def llm_complete(prompt: str) -> str:
    """Primary LLM call that returns model text or a fake response if unconfigured."""
    genai, model_name = _get_genai()
    if genai is None:
        return f"[FAKE GEMINI RESPONSE] {prompt[:120]}..."
    try:
        model = genai.GenerativeModel(model_name)  # type: ignore[attr-defined]
        resp = model.generate_content(prompt)
        return getattr(resp, "text", "") or "(empty response)"
    except Exception as e:
        return f"[LLM error: {e}]"

# Backwards-compat alias
def call_gemini(prompt: str) -> str:
    return llm_complete(prompt)

class Agent:
    """Role-based agent with fast/deep modes and guardrails."""
    def __init__(self, role: str, goal: str, backstory: str):
        self.role = role
        self.goal = goal
        self.backstory = backstory

    def run(self, task: str, context: str = "", mode: str = "fast") -> str:
        detail = (
            "Be brief (6–8 bullet points max)."
            if (mode or "").lower() == "fast"
            else "Be thorough. Use subheadings, numbered lists, and include 6–10 evidence bullets with sources/links when available."
        )
        prompt = f"""You are {self.role}.
Goal: {self.goal}
Backstory: {self.backstory}

Task: {task}

Context:
{context}

Output requirements:
- {detail}
- Avoid speculation; clearly mark assumptions.
- End with a short 'Next actions' checklist."""
        return llm_complete(prompt)
