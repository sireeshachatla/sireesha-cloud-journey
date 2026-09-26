#!/usr/bin/env bash
set -euo pipefail
ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
BUCKET="sireesha-learning-${ACCOUNT}"
echo "$BUCKET"
