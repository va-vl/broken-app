module.exports = (res, code) => (error) => res.status(code).send(`Error: ${error.message}`);
