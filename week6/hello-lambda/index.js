/**
 * Tiny Lambda-style handler (Node).
 * Not deployed in Week 6 — for reading only / Week 7+.
 */
export const handler = async (event) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ok: true,
      message: "hello from week6 lambda sketch",
      inputKeys: event && typeof event === "object" ? Object.keys(event) : [],
    }),
  };
};
