#!/usr/bin/env bash
# Delete the Week 7 Lambda and its IAM role.
set -euo pipefail

REGION="us-east-1"
FUNCTION_NAME="sireesha-week7-hello"
ROLE_NAME="sireesha-week7-lambda-role"
POLICY_ARN="arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"

echo "Deleting function (ok if already gone)..."
aws lambda delete-function \
  --function-name "$FUNCTION_NAME" \
  --region "$REGION" \
  >/dev/null 2>&1 || echo "function already deleted"

echo "Detaching role policy (ok if already gone)..."
aws iam detach-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-arn "$POLICY_ARN" \
  >/dev/null 2>&1 || echo "policy already detached"

echo "Deleting role (ok if already gone)..."
aws iam delete-role --role-name "$ROLE_NAME" >/dev/null 2>&1 || echo "role already deleted"

echo "Cleanup finished."
