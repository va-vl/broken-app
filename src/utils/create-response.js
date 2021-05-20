const createErrorResponseHandler = (res, code) =>
  (error) =>
    res.status(code).send(`Error: ${error.message}`);

const createErrorResponse = (res, code, message) =>
  res.status(code).send(`Error: ${message}`);

export {
  createErrorResponse,
  createErrorResponseHandler,
};
