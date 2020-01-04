import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      code: Yup.string('code should be a string').required('code is required'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
