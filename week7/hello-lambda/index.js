/**
 * Week 7 Lambda handler (CommonJS — easiest for AWS zip deploy).
 *
 * AWS calls exports.handler when the function runs.
 */
exports.handler = async (event) => {
  const name = (event && event.name) || "Sireesha";
  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      message: `hello ${name} from week 7 lambda`,
    }),
  };
};
