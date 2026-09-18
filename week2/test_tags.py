"""Tests for tags.py.

Read these to learn what each function must do, then implement it.
Do not change this file - change tags.py until these pass.
"""

import pytest

from tags import (
    count_by_environment,
    find_missing_tags,
    make_name,
    normalize_environment,
)


# --- make_name -------------------------------------------------------------


def test_make_name_joins_parts_with_hyphens():
    assert make_name("acme", "dev", "bucket") == "acme-dev-bucket"


def test_make_name_lowercases_everything():
    assert make_name("ACME", "Dev", "Bucket") == "acme-dev-bucket"


# --- normalize_environment -------------------------------------------------


def test_normalize_environment_passes_through_short_form():
    assert normalize_environment("dev") == "dev"


def test_normalize_environment_maps_long_aliases():
    assert normalize_environment("production") == "prod"
    assert normalize_environment("staging") == "stage"


def test_normalize_environment_ignores_case_and_spaces():
    assert normalize_environment("  Production  ") == "prod"


def test_normalize_environment_rejects_unknown_values():
    # pytest.raises asserts that the code inside DOES raise the given error.
    with pytest.raises(ValueError):
        normalize_environment("banana")


# --- find_missing_tags -----------------------------------------------------


def test_find_missing_tags_returns_empty_when_complete():
    tags = {"Owner": "sireesha", "Environment": "dev", "Project": "learning"}
    assert find_missing_tags(tags) == []


def test_find_missing_tags_lists_absent_keys_in_order():
    assert find_missing_tags({"Owner": "sireesha"}) == ["Environment", "Project"]


def test_find_missing_tags_handles_empty_input():
    assert find_missing_tags({}) == ["Owner", "Environment", "Project"]


def test_find_missing_tags_ignores_extra_keys():
    tags = {
        "Owner": "sireesha",
        "Environment": "dev",
        "Project": "learning",
        "CostCenter": "1234",
    }
    assert find_missing_tags(tags) == []


# --- count_by_environment --------------------------------------------------


def test_count_by_environment_counts_each_environment():
    resources = [
        {"Environment": "dev"},
        {"Environment": "dev"},
        {"Environment": "prod"},
    ]
    assert count_by_environment(resources) == {"dev": 2, "prod": 1}


def test_count_by_environment_skips_resources_without_environment():
    resources = [{"Environment": "dev"}, {"Name": "orphan"}]
    assert count_by_environment(resources) == {"dev": 1}


def test_count_by_environment_returns_empty_for_empty_list():
    assert count_by_environment([]) == {}
