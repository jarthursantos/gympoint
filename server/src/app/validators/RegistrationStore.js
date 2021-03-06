import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      student_id: Yup.number('student_id shoult be a number').required(
        'student_id is required'
      ),
      plan_id: Yup.number('plan_id shoult be a number').required(
        'plan_id is required'
      ),
      start_date: Yup.date('start_date shoult be a date').required(
        'start_date is required'
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
