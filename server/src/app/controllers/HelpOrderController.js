import { Op } from 'sequelize';

import User from '../models/User';
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
      include: [
        {
          model: User,
          as: 'replier',
          attributes: ['name'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'alternative_id'],
        },
      ],
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
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

    const { id } = await HelpOrder.create({
      ...req.body,
      student_id,
    });

    const help_order = await HelpOrder.findByPk(id, {
      include: [
        {
          model: User,
          as: 'replier',
          attributes: ['name'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'alternative_id'],
        },
      ],
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
    });

    return res.json(help_order);
  }
}

export default new HelpOrderController();
