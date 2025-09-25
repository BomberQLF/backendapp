const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");

const UserObject = require("../models/user");

const config = require("../config");

const JWT_MAX_AGE = "6m"; // 6 months

router.post("/signin", async (req, res) => {
  let { password, email } = req.body;
  email = (email || "").trim().toLowerCase();

  if (!email || !password)
    return res.status(400).send({
      ok: false,
      code: "EMAIL_AND_PASSWORD_REQUIRED",
      message: "Email and password are required",
    });

  try {
    const user = await UserObject.findOne({ email });

    if (!user)
      return res.status(401).send({
        ok: false,
        code: "INVALID_USER",
        message: "Email or password is invalid",
      });

    const match =
      config.ENVIRONMENT === "development" ||
      (await user.comparePassword(password));
    if (!match)
      return res.status(401).send({
        ok: false,
        code: "EMAIL_OR_PASSWORD_INVALID",
        message: "Email or password is invalid",
      });

    user.set({ last_login_at: Date.now() });
    await user.save();

    const token = jwt.sign({ _id: user.id }, config.SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

//...

router.put(
  "/:id",
  passport.authenticate(["user", "admin"], {
    session: false,
    failWithError: true,
  }),
  async (req, res) => {
    try {
      if (req.user._id !== req.params.id && req.user._type !== "admin")
        return res.status(403).send({ ok: false, code: "FORBIDDEN" });

      const user = await UserObject.findById(req.params.id);
      const { first_name, last_name } = req.body;
      user.set({ first_name, last_name });
      await user.save();
      res.status(200).send({ ok: true, data: user });
    } catch (error) {
      console.log(error);
      res.status(500).send({ ok: false, code: SERVER_ERROR, error });
    }
  }
);

module.exports = router;
