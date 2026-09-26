/**
 * Week 4 warm-up — JavaScript basics.
 *
 * Run:
 *   node warmup.js
 *
 * Do not edit the check section at the bottom.
 */

// 1. Variables
let region = "us-east-1";
let hoursPerWeek = 8;

// 2. Template strings (like Python f-strings)
let summary = `Studying ${hoursPerWeek} hours per week in ${region}`;

// 3. Arrays
const services = ["lambda", "s3", "dynamodb"];
services.push("sqs");
let serviceCount = services.length;

// 4. Objects (like Python dicts)
// NOTE: key and value need a colon:  Owner: "sireesha"
const tags = { Owner: "sireesha", Environment: "dev" };
tags.Project = "learning";
let owner = tags.Owner;

// 5. Functions + if
function isProduction(environment) {
  if (environment === "prod") {
    return true;
  } else {
    return false;
  }
}

// 6. Loops
function uppercaseAll(items) {
  const result = [];
  for (const item of items) {
    result.push(item.toUpperCase());
  }
  return result;
}

// 7. Math
function monthlyCost(hourlyRate, hours) {
  return hourlyRate * hours;
}

// ===========================================================================
// CHECK SECTION — do not edit below
// ===========================================================================
function check(label, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    console.log(`PASS  ${label}`);
    return true;
  }
  console.log(`FAIL  ${label}`);
  console.log(`        expected: ${JSON.stringify(expected)}`);
  console.log(`        actual:   ${JSON.stringify(actual)}`);
  return false;
}

const results = [
  check("1. region", region, "us-east-1"),
  check("1. hoursPerWeek", hoursPerWeek, 8),
  check("2. summary", summary, "Studying 8 hours per week in us-east-1"),
  check("3. services", services, ["lambda", "s3", "dynamodb", "sqs"]),
  check("3. serviceCount", serviceCount, 4),
  check("4. tags", tags, {
    Owner: "sireesha",
    Environment: "dev",
    Project: "learning",
  }),
  check("4. owner", owner, "sireesha"),
  check("5. isProduction('prod')", isProduction("prod"), true),
  check("5. isProduction('dev')", isProduction("dev"), false),
  check("6. uppercaseAll", uppercaseAll(["s3", "sqs"]), ["S3", "SQS"]),
  check("7. monthlyCost", monthlyCost(0.5, 100), 50),
];

const passed = results.filter(Boolean).length;
console.log(`\n${passed} of ${results.length} passing`);
if (passed === results.length) {
  console.log("All warm-up checks pass. Move on to tags.js / npm test.");
} else {
  console.log("Keep going — fix the first FAIL above, then run again.");
}
