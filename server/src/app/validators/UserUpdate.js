import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('name should be a string'),
      email: Yup.string('email should be a string').email(
        'provided email is invalid'
      ),
      old_assword: Yup.string('old_password should be a string'),
      password: Yup.string('password should be a string').when(
        'old_assword',
        (old_assword, field) =>
          old_assword ? field.required('old_assword is required') : field
      ),
      confirm_password: Yup.string(
        'confirm_password should be a string'
      ).when('password', (password, field) =>
        password
          ? field.required('password is required').oneOf([Yup.ref('password')])
          : field
      ),
      avatar_id: Yup.number('avatar_id should be a number').integer(
        'avatar_id should be a integer'
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
