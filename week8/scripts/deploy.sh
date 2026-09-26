#!/usr/bin/env bash
# Create Lambda + HTTP API. Prints a URL you can curl.
set -euo pipefail

REGION="us-east-1"
FUNCTION_NAME="sireesha-week8-hello"
ROLE_NAME="sireesha-week8-lambda-role"
API_NAME="sireesha-week8-http"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/week8/hello"
WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
ROLE_ARN="arn:aws:iam::${ACCOUNT}:role/${ROLE_NAME}"

echo "1/4 IAM role"
if ! aws iam get-role --role-name "$ROLE_NAME" >/dev/null 2>&1; then
  aws iam create-role \
    --role-name "$ROLE_NAME" \
    --assume-role-policy-document "file://$ROOT/week8/trust-policy.json" \
    >/dev/null
  aws iam attach-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  echo "   waiting 10s for the role..."
  sleep 10
fi

echo "2/4 Lambda function"
cp "$SRC/index.js" "$WORKDIR/index.js"
( cd "$WORKDIR" && zip -q function.zip index.js )
ZIP="$WORKDIR/function.zip"

if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" >/dev/null 2>&1; then
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file "fileb://$ZIP" \
    --region "$REGION" \
    >/dev/null
else
  aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --runtime nodejs20.x \
    --role "$ROLE_ARN" \
    --handler index.handler \
    --zip-file "fileb://$ZIP" \
    --timeout 10 \
    --region "$REGION" \
    >/dev/null || {
      echo "   retrying after 10s..."
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
    }
fi

LAMBDA_ARN="$(aws lambda get-function \
  --function-name "$FUNCTION_NAME" \
  --region "$REGION" \
  --query 'Configuration.FunctionArn' \
  --output text)"

echo "3/4 HTTP API"
API_ID="$(aws apigatewayv2 get-apis --region "$REGION" \
  --query "Items[?Name=='${API_NAME}'].ApiId | [0]" --output text)"
if [ "$API_ID" = "None" ] || [ -z "$API_ID" ]; then
  API_ID="$(aws apigatewayv2 create-api \
    --name "$API_NAME" \
    --protocol-type HTTP \
    --region "$REGION" \
    --query ApiId --output text)"
fi

INTEGRATION_ID="$(aws apigatewayv2 create-integration \
  --api-id "$API_ID" \
  --integration-type AWS_PROXY \
  --integration-uri "$LAMBDA_ARN" \
  --payload-format-version "2.0" \
  --region "$REGION" \
  --query IntegrationId --output text)"

aws apigatewayv2 create-route \
  --api-id "$API_ID" \
  --route-key "GET /hello" \
  --target "integrations/${INTEGRATION_ID}" \
  --region "$REGION" \
  >/dev/null

# $default stage so the URL has no extra path prefix
if ! aws apigatewayv2 get-stage --api-id "$API_ID" --stage-name '$default' --region "$REGION" >/dev/null 2>&1; then
  aws apigatewayv2 create-stage \
    --api-id "$API_ID" \
    --stage-name '$default' \
    --auto-deploy \
    --region "$REGION" \
    >/dev/null
fi

echo "4/4 Allow API Gateway to call Lambda"
aws lambda add-permission \
  --function-name "$FUNCTION_NAME" \
  --statement-id "week8-apigw-${API_ID}" \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${REGION}:${ACCOUNT}:${API_ID}/*" \
  --region "$REGION" \
  >/dev/null 2>&1 || true

URL="https://${API_ID}.execute-api.${REGION}.amazonaws.com/hello"
echo
echo "Your URL:"
echo "$URL"
echo
echo "Try:"
echo "curl -s \"${URL}?name=Sireesha\""
echo
echo "$URL" > "$ROOT/week8/.api-url"
