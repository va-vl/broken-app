// attribution:
// https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware

export default (func) => (req, res, next) =>
  Promise
    .resolve(func(req, res, next))
    .catch(next);

