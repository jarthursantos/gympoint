import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('name should be a string').required('name is required'),
      email: Yup.string('email should be a string')
        .email('provided email is invalid')
        .required('email is required'),
      password: Yup.string('password should be a string').required(
        'password is required'
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
