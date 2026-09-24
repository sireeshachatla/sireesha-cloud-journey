import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  findMissingTags,
  makeName,
  normalizeEnvironment,
} from "./tags.js";

describe("makeName", () => {
  it("joins parts with hyphens", () => {
    assert.equal(makeName("acme", "dev", "bucket"), "acme-dev-bucket");
  });

  it("lowercases everything", () => {
    assert.equal(makeName("ACME", "Dev", "Bucket"), "acme-dev-bucket");
  });
});

describe("normalizeEnvironment", () => {
  it("passes through short form", () => {
    assert.equal(normalizeEnvironment("dev"), "dev");
  });

  it("maps long aliases", () => {
    assert.equal(normalizeEnvironment("production"), "prod");
    assert.equal(normalizeEnvironment("staging"), "stage");
  });

  it("ignores case and spaces", () => {
    assert.equal(normalizeEnvironment("  Production  "), "prod");
  });

  it("rejects unknown values", () => {
    assert.throws(() => normalizeEnvironment("banana"), /Unknown environment/);
  });
});

describe("findMissingTags", () => {
  it("returns empty when complete", () => {
    assert.deepEqual(
      findMissingTags({
        Owner: "sireesha",
        Environment: "dev",
        Project: "learning",
      }),
      [],
    );
  });

  it("lists absent keys in order", () => {
    assert.deepEqual(findMissingTags({ Owner: "sireesha" }), [
      "Environment",
      "Project",
    ]);
  });

  it("handles empty input", () => {
    assert.deepEqual(findMissingTags({}), [
      "Owner",
      "Environment",
      "Project",
    ]);
  });
});
