import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('name should be a string'),
      email: Yup.string('email should be a string').email(
        'provided email is invalid'
      ),
      birthdate: Yup.date('birthdate should be a date'),
      height: Yup.number('height should be a number'),
      weight: Yup.number('weight should be a number'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
