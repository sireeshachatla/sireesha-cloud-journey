/**
 * Week 8 — Lambda behind an HTTP address.
 * GET /hello?name=Sireesha
 */
exports.handler = async (event) => {
  const name = (event.queryStringParameters && event.queryStringParameters.name) || "Sireesha";
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ok: true,
      message: `hello ${name} from week 8`,
      path: event.rawPath || event.path || "/",
    }),
  };
};
