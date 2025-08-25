import requests
from bs4 import BeautifulSoup

def web_search(query: str, max_results=5):
    url = f"https://duckduckgo.com/html/?q={query}"
    resp = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(resp.text, "html.parser")
    results = []
    for a in soup.select(".result__a", limit=max_results):
        results.append(a.text)
    return results
