#!/usr/bin/env bash
# Create a tiny Lambda in us-east-1 and invoke it once.
# Run from anywhere: bash week7/scripts/deploy-and-invoke.sh
set -euo pipefail

REGION="us-east-1"
FUNCTION_NAME="sireesha-week7-hello"
ROLE_NAME="sireesha-week7-lambda-role"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/week7/hello-lambda"
WORKDIR="$(mktemp -d)"
ZIP="$WORKDIR/function.zip"

cleanup_tmp() { rm -rf "$WORKDIR"; }
trap cleanup_tmp EXIT

echo "Region: $REGION"
echo "Function: $FUNCTION_NAME"

ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
ROLE_ARN="arn:aws:iam::${ACCOUNT}:role/${ROLE_NAME}"

# 1) Role Lambda is allowed to assume
if ! aws iam get-role --role-name "$ROLE_NAME" >/dev/null 2>&1; then
  echo "Creating IAM role $ROLE_NAME"
  aws iam create-role \
    --role-name "$ROLE_NAME" \
    --assume-role-policy-document "file://$ROOT/week7/trust-policy.json" \
    >/dev/null
  aws iam attach-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  echo "Waiting 10s for the new role to become usable..."
  sleep 10
else
  echo "Role already exists: $ROLE_NAME"
fi

# 2) Zip the handler
cp "$SRC/index.js" "$WORKDIR/index.js"
( cd "$WORKDIR" && zip -q function.zip index.js )

# 3) Create or update the function
if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" >/dev/null 2>&1; then
  echo "Updating existing function code"
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file "fileb://$ZIP" \
    --region "$REGION" \
    >/dev/null
else
  echo "Creating function"
  # New roles can take a few seconds; retry once if AWS says the role is not ready.
  if ! aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --runtime nodejs20.x \
    --role "$ROLE_ARN" \
    --handler index.handler \
    --zip-file "fileb://$ZIP" \
    --timeout 10 \
    --region "$REGION" \
    >/dev/null; then
    echo "Retrying create after 10s..."
    sleep 10
    aws lambda create-function \
      --function-name "$FUNCTION_NAME" \
      --runtime nodejs20.x \
      --role "$ROLE_ARN" \
      --handler index.handler \
      --zip-file "fileb://$ZIP" \
      --timeout 10 \
      --region "$REGION" \
      >/dev/null
  fi
fi

echo "Invoking..."
OUT="$WORKDIR/out.json"
aws lambda invoke \
  --function-name "$FUNCTION_NAME" \
  --payload '{"name":"Sireesha"}' \
  --region "$REGION" \
  "$OUT" \
  >/dev/null

echo "Lambda response:"
cat "$OUT"
echo
