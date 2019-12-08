import { Op } from 'sequelize';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Registration from '../models/Registration';

class HelpOrderController {
  async index(req, res) {
    const { id: student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id,
      },
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id: student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const haveActiveRegistration = await Registration.findOne({
      where: {
        student_id,
        end_date: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (!haveActiveRegistration) {
      return res
        .status(400)
        .json({ error: "student don't have active registration" });
    }

    const helpORder = await HelpOrder.create({
      ...req.body,
      student_id,
    });

    return res.json(helpORder);
  }
}

export default new HelpOrderController();
