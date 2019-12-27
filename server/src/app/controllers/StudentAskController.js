import { Op } from 'sequelize';

import User from '../models/User';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Registration from '../models/Registration';

class StudentAskController {
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
    const { question } = req.body;

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

    const help_order = await HelpOrder.create(
      {
        question,
        student_id,
      },
      {
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
      }
    );

    // TODO: const short_question = help_order.question.substr(0, 50);
    // const overflow_limit = short_question.length >= 50;

    // HelpOrderNotification.create({
    //   help_order: id,
    //   title: `${help_order.student.name} solicitou ajuda`,
    //   message: `"${short_question}${overflow_limit ? '...' : ''}"`,
    //   question,
    // });

    return res.json(help_order);
  }
}

export default new StudentAskController();
