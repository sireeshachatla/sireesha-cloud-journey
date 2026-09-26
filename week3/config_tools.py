"""Helpers for reading and checking JSON cloud configs.

Fill in each TODO. Run:

    pytest week3/test_config_tools.py -v
"""

from __future__ import annotations

import json
from pathlib import Path

REQUIRED_KEYS = ("project", "owner", "environment", "region")


def load_config(path: str | Path) -> dict:
    """Open a JSON file and return it as a Python dictionary.

    Example:
        load_config("week3/sample_config.json")
        -> {"project": "sireesha-cloud-journey", ...}
    """
    with open(path) as f:
        return json.load(f)


def find_missing_keys(config: dict, required: tuple[str, ...] = REQUIRED_KEYS) -> list[str]:
    """Return required keys that are missing from config, in order.

    Same idea as find_missing_tags from Week 2.
    """
    missing = []
    for key in required:
        if key not in config:
            missing.append(key)
    return missing


def get_region(config: dict) -> str:
    """Return config["region"].

    If "region" is missing, raise KeyError.
    """
    return config["region"]


def save_config(path: str | Path, config: dict) -> None:
    """Write config to a JSON file with indent=2.

    Hint:
        with open(path, "w") as f:
            json.dump(config, f, indent=2)
    """
    with open(path, "w") as f:
        json.dump(config, f, indent=2)
