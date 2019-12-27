import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string('title should be a string'),
      duration: Yup.number('duration should be a number')
        .integer('duration should be a integer')
        .min(1, 'min duration is 1 month'),
      price: Yup.number('price should be a number'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
