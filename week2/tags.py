"""AWS resource tagging helpers.

Every function here is unfinished. The tests in test_tags.py describe exactly
what each one must do. Work through them in order, top to bottom.

Run the tests with:

    pytest week2/ -v
"""

REQUIRED_TAG_KEYS = ("Owner", "Environment", "Project")

ENVIRONMENT_ALIASES = {
    "dev": "dev",
    "develop": "dev",
    "development": "dev",
    "stage": "stage",
    "staging": "stage",
    "prod": "prod",
    "production": "prod",
}


def make_name(prefix, environment, resource):
    """Build a resource name by joining the three parts with hyphens.

    The result is always lowercase.

    Example: make_name("Acme", "dev", "bucket") -> "acme-dev-bucket"
    """
    raise NotImplementedError("TODO: implement make_name")


def normalize_environment(environment):
    """Convert an environment alias into its canonical short form.

    Look the value up in ENVIRONMENT_ALIASES, ignoring case and surrounding
    whitespace. If it is not a known alias, raise ValueError.

    Example: normalize_environment("Production") -> "prod"
    """
    raise NotImplementedError("TODO: implement normalize_environment")


def find_missing_tags(tags):
    """Return the REQUIRED_TAG_KEYS that are absent from tags, in order.

    Returns a list. An empty list means nothing is missing.

    Example: find_missing_tags({"Owner": "sireesha"}) -> ["Environment", "Project"]
    """
    raise NotImplementedError("TODO: implement find_missing_tags")


def count_by_environment(resources):
    """Count how many resources belong to each environment.

    resources is a list of dictionaries, each with an "Environment" key.
    Return a dictionary mapping environment name to count. Resources without
    an "Environment" key are skipped.

    Example:
        [{"Environment": "dev"}, {"Environment": "dev"}, {"Environment": "prod"}]
        -> {"dev": 2, "prod": 1}
    """
    raise NotImplementedError("TODO: implement count_by_environment")
