import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('name should be a string').required('name is required'),
      email: Yup.string('email should be a string')
        .email('provided email is invalid')
        .required('email is required'),
      birthdate: Yup.date('birthdate should be a date').required(
        'birthdate is required'
      ),
      height: Yup.number('height should be a number').required(
        'height is required'
      ),
      weight: Yup.number('weight should be a number').required(
        'weight is required'
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
