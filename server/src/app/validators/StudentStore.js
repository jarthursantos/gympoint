const Yup = require('yup');
// import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birthdate: Yup.date().required(),
      height: Yup.number()
        .min(0.1)
        .required(),
      weight: Yup.number()
        .min(0.1)
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
