const bank = [
  { msg: "missing params", code: 400 },
  { msg: "internal server errors", code: 500 },
  { msg: "something went wrong!", code: 500 },
  { msg: "Not Found!", code: 404 },
];

const errorhandler = (error, req, res, next) => {
  console.log(error);
  const { msg, code } = bank.filter(({ msg }) => msg === error)[0];
  if (!msg) return res.status(500).send("something went wrong!");
  res.status(code).send(msg);
};
module.exports = errorhandler;
