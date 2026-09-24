"""Fetch JSON from a public HTTP API.

Fill in the TODOs. Run:

    pytest week3/test_fetch_json.py -v

Then try:

    python week3/fetch_json.py
"""

from __future__ import annotations

import requests

# Free public API — returns {"ip": "x.x.x.x"}
IPIFY_URL = "https://api.ipify.org?format=json"


def fetch_json(url: str) -> dict:
    """GET a URL and return the response body as a dictionary.

    Steps:
    1. response = requests.get(url, timeout=10)
    2. response.raise_for_status()   # error if not 200-OK
    3. return response.json()
    """
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()


def get_public_ip(url: str = IPIFY_URL) -> str:
    """Return the "ip" field from the ipify JSON response."""
    data = fetch_json(url)
    return data["ip"]


def main() -> None:
    data = fetch_json(IPIFY_URL)
    print(data)
    print("public ip:", get_public_ip())


if __name__ == "__main__":
    main()
