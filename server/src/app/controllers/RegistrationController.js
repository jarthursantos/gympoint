import { parseISO, addMonths } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class RegistrationController {
  async index(_req, res) {
    const registrations = await Registration.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
      attributes: ['id', 'price', 'start_date', 'end_date'],
    });
    return res.json(registrations);
  }

  // TODO: send mail to student notifying the registration
  async store(req, res) {
    const { student_id, plan_id, start_date: start_date_raw } = req.body;

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const studentAlreadyRegistered = await Registration.findOne({
      where: {
        student_id,
      },
    });

    if (studentAlreadyRegistered) {
      return res.status(400).json({ error: 'student already in a plan' });
    }

    const { duration: plan_duration, price: plan_month_price } = planExists;

    const start_date = parseISO(start_date_raw);
    const end_date = addMonths(start_date, plan_duration);
    const price = plan_month_price * plan_duration;

    const { id } = await Registration.create({
      ...req.body,
      start_date,
      end_date,
      price,
    });

    const registration = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
      attributes: ['id', 'price', 'start_date', 'end_date'],
    });

    return res.json(registration);
  }

  // TODO: send mail to student notifying the registration update
  async update(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: "registration don't exists" });
    }

    const { plan_id, start_date: start_date_raw } = req.body;

    const planExists = await Plan.findByPk(plan_id || registration.plan_id);

    if (!planExists) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    const { duration: plan_duration, price: plan_month_price } = planExists;

    const start_date = start_date_raw
      ? parseISO(start_date_raw)
      : registration.start_date;

    const end_date = addMonths(start_date, plan_duration);
    const price = plan_month_price * plan_duration;

    await registration.update({
      ...req.body,
      start_date,
      end_date,
      price,
    });

    const updatedRegistration = await Registration.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
      attributes: ['id', 'price', 'start_date', 'end_date'],
    });

    return res.json(updatedRegistration);
  }

  async destroy(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: "registration don't exists" });
    }

    registration.destroy();

    return res.json();
  }
}

export default new RegistrationController();