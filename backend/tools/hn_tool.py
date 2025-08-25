import requests

def hn_search(query: str, max_results=5):
    url = f"http://hn.algolia.com/api/v1/search?query={query}"
    resp = requests.get(url).json()
    hits = resp.get("hits", [])
    return [h.get("title") for h in hits[:max_results] if h.get("title")]
