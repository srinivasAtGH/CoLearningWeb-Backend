var router = require("express").Router({mergeParams: true});

router.use("/", require("./users"));
router.use("/", require("./learningconnections"));
router.use("/", require("./skills"));
router.use("/", require("./languages"));

router.use(function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
