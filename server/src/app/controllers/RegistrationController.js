import { format, parseISO, addMonths } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class RegistrationController {
  async index(_req, res) {
    const registrations = await Registration.findAll();
    return res.json(registrations);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date: start_date_raw } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    const { duration: plan_duration, price } = planExists;

    const start_date = parseISO(start_date_raw);
    const end_date = addMonths(start_date, plan_duration);

    const registration = await Registration.create({
      ...req.body,
      start_date,
      end_date,
      price,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    const { title } = req.body;

    if (title) {
      const titleInUse = await Plan.findOne({
        where: { title },
      });

      if (titleInUse) {
        return res.status(400).json({ error: 'title already in use' });
      }
    }

    plan.update(req.body);

    return res.json(plan);
  }

  async destroy(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    plan.destroy();

    return res.json(plan);
  }
}

export default new RegistrationController();
