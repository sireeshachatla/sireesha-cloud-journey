"""Week 2 warm-up exercises.

Fill in each TODO, then run:

    python week2/warmup.py

Each exercise prints PASS or FAIL. Work top to bottom.
Leave the check section at the bottom alone.
"""

# ---------------------------------------------------------------------------
# 1. Variables and types
# ---------------------------------------------------------------------------
# Create a variable holding your AWS region as a string.
region = "us-east-1"# TODO: set this to "us-east-1"

# Create a variable holding how many hours per week you study, as an integer.
hours_per_week = 8  # TODO: set this to 8


# ---------------------------------------------------------------------------
# 2. Strings
# ---------------------------------------------------------------------------
# An f-string inserts variables into text: f"hello {name}"
# Build the string "Studying 8 hours per week in us-east-1" using your
# two variables above. Do not hardcode the numbers or the region.
summary = f"Studying {hours_per_week} hours per week in {region}" # TODO: use an f-string


# ---------------------------------------------------------------------------
# 3. Lists
# ---------------------------------------------------------------------------
services = ["lambda", "s3", "dynamodb"]

# Add "sqs" to the end of the list.
services.append("sqs")

# Set this to how many items the list now holds. Use len().
service_count = len(services)

# ---------------------------------------------------------------------------
# 4. Dictionaries
# ---------------------------------------------------------------------------
# A dictionary maps keys to values. AWS tags are dictionaries.
tags = {"Owner": "sireesha", "Environment": "dev"}

# Add a "Project" key with the value "learning".
tags["Project"] = "learning"

# Read the value of "Owner" out of the dictionary into this variable.
owner = tags["Owner"]

# ---------------------------------------------------------------------------
# 5. Conditionals
# ---------------------------------------------------------------------------
def is_production(environment):
    """Return True if environment is "prod", otherwise False."""
    if environment == "prod":
        return True
    else:
        return False


# ---------------------------------------------------------------------------
# 6. Loops
# ---------------------------------------------------------------------------
def uppercase_all(items):
    """Return a new list with every string in items uppercased.

    Example: ["s3", "sqs"] -> ["S3", "SQS"]
    Do not change the original list.
    """
    result = []
    for item in items:
        result.append(item.upper())
    return result


# ---------------------------------------------------------------------------
# 7. Functions with arguments
# ---------------------------------------------------------------------------
def monthly_cost(hourly_rate, hours):
    """Return hourly_rate multiplied by hours."""
    return hourly_rate * hours


# ---------------------------------------------------------------------------
# 8. Exceptions
# ---------------------------------------------------------------------------
def safe_divide(a, b):
    """Return a divided by b.

    If b is zero, return the string "cannot divide by zero" instead of
    crashing. Use try / except ZeroDivisionError.
    """
    try:
        return a / b
    except ZeroDivisionError:
        return "cannot divide by zero"


# ===========================================================================
# CHECK SECTION - do not edit below this line
# ===========================================================================
def _check(label, actual, expected):
    if actual == expected:
        print(f"PASS  {label}")
        return True
    print(f"FAIL  {label}")
    print(f"        expected: {expected!r}")
    print(f"        actual:   {actual!r}")
    return False


def main():
    results = [
        _check("1. region", region, "us-east-1"),
        _check("1. hours_per_week", hours_per_week, 8),
        _check("2. summary", summary, "Studying 8 hours per week in us-east-1"),
        _check("3. services list", services, ["lambda", "s3", "dynamodb", "sqs"]),
        _check("3. service_count", service_count, 4),
        _check(
            "4. tags",
            tags,
            {"Owner": "sireesha", "Environment": "dev", "Project": "learning"},
        ),
        _check("4. owner", owner, "sireesha"),
        _check("5. is_production('prod')", is_production("prod"), True),
        _check("5. is_production('dev')", is_production("dev"), False),
        _check("6. uppercase_all", uppercase_all(["s3", "sqs"]), ["S3", "SQS"]),
        _check("7. monthly_cost", monthly_cost(0.5, 100), 50.0),
        _check("8. safe_divide(10, 2)", safe_divide(10, 2), 5.0),
        _check("8. safe_divide(1, 0)", safe_divide(1, 0), "cannot divide by zero"),
    ]

    passed = sum(1 for r in results if r)
    total = len(results)
    print()
    print(f"{passed} of {total} passing")
    if passed < total:
        print("Keep going - fix the first FAIL above, then run again.")
    else:
        print("All exercises pass. Move on to Block B (tags.py).")


if __name__ == "__main__":
    main()
