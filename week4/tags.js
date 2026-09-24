/**
 * AWS resource tagging helpers in JavaScript.
 *
 * Same ideas as week2/tags.py.
 * Run tests with: npm test
 */

export const REQUIRED_TAG_KEYS = ["Owner", "Environment", "Project"];

export const ENVIRONMENT_ALIASES = {
  dev: "dev",
  develop: "dev",
  development: "dev",
  stage: "stage",
  staging: "stage",
  prod: "prod",
  production: "prod",
};

/**
 * Join parts with hyphens and lowercase.
 * makeName("Acme", "Dev", "bucket") -> "acme-dev-bucket"
 */
export function makeName(prefix, environment, resource) {
  return `${prefix}-${environment}-${resource}`.toLowerCase();
}

/**
 * Map aliases to short form. Unknown values throw Error.
 * normalizeEnvironment("Production") -> "prod"
 */
export function normalizeEnvironment(environment) {
  const key = environment.trim().toLowerCase();
  if (!(key in ENVIRONMENT_ALIASES)) {
    throw new Error(`Unknown environment: ${environment}`);
  }
  return ENVIRONMENT_ALIASES[key];
}

/**
 * Return required keys missing from tags, in order.
 */
export function findMissingTags(tags) {
  const missing = [];
  for (const key of REQUIRED_TAG_KEYS) {
    if (!(key in tags)) {
      missing.push(key);
    }
  }
  return missing;
}
