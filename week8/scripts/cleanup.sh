#!/usr/bin/env bash
# Delete the Week 8 HTTP API, Lambda, and IAM role.
set -euo pipefail

REGION="us-east-1"
FUNCTION_NAME="sireesha-week8-hello"
ROLE_NAME="sireesha-week8-lambda-role"
API_NAME="sireesha-week8-http"
POLICY_ARN="arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

API_ID="$(aws apigatewayv2 get-apis --region "$REGION" \
  --query "Items[?Name=='${API_NAME}'].ApiId | [0]" --output text 2>/dev/null || true)"
if [ -n "${API_ID:-}" ] && [ "$API_ID" != "None" ]; then
  echo "Deleting API $API_ID"
  aws apigatewayv2 delete-api --api-id "$API_ID" --region "$REGION"
else
  echo "API already gone"
fi

echo "Deleting function"
aws lambda delete-function --function-name "$FUNCTION_NAME" --region "$REGION" >/dev/null 2>&1 \
  || echo "function already deleted"

echo "Detaching and deleting role"
aws iam detach-role-policy --role-name "$ROLE_NAME" --policy-arn "$POLICY_ARN" >/dev/null 2>&1 \
  || echo "policy already detached"
aws iam delete-role --role-name "$ROLE_NAME" >/dev/null 2>&1 \
  || echo "role already deleted"

rm -f "$ROOT/week8/.api-url"
echo "Cleanup finished."
