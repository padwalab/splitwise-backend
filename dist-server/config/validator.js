// import validator from "express-validator";
// // const { validationResult } = validator;
// export const registerValidation = [
//   validator.check("name", "First name can't be blank").not().isEmpty(),
//   validator.check("email", "Enter a valid email").isEmail(),
//   validator
//     .check("password", "Password must be 6 or more characters long")
//     .isLength({
//       min: 6,
//     }),
//   (req, res, next) => {
//     const errors = validator.validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(422).json({ errors: errors.array() });
//     next();
//   },
// ];
"use strict";