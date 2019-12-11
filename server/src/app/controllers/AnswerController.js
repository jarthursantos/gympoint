import HelpOrder from '../models/HelpOrder';

import User from '../models/User';
import Student from '../models/Student';

import AnsweredNotification from '../schemas/AnsweredNotification';

import HelpOrderAnsweredJob from '../jobs/HelpOrderAnsweredMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async store(req, res) {
    const { id: help_order_id } = req.params;

    let help_order = await HelpOrder.findByPk(help_order_id);

    if (!help_order) {
      return res.status(400).json({ error: "help order don't exists" });
    }

    const { answer_at: alreadAnswed } = help_order;

    if (alreadAnswed) {
      return res.status(400).json({ error: 'help order already answered' });
    }

    await help_order.update({
      ...req.body,
      answer_at: new Date(),
      replier_by: req.user_id,
    });

    const {
      id,
      question,
      answer,
      answer_at,
      createdAt: created_at,
      replier,
      student,
    } = await HelpOrder.findByPk(help_order_id, {
      include: [
        {
          model: User,
          as: 'replier',
          attributes: ['name'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'alternative_id'],
        },
      ],
      attributes: ['id', 'question', 'answer', 'answer_at', 'createdAt'],
    });

    help_order = {
      id,
      question,
      answer,
      answer_at,
      created_at,
      replier,
      student,
    };

    await Queue.add(HelpOrderAnsweredJob.key, { help_order });

    const short_question = question.substr(0, 50);
    const overflow_limit = short_question.length >= 50;

    AnsweredNotification.create({
      student: student.id,
      answer: id,
      message: `Seu pedido de ajuda "${short_question}${
        overflow_limit ? '...' : ''
      }" obteve uma resposta.`,
    });

    return res.json(help_order);
  }
}

export default new AnswerController();

// TODO: student avaliate a answer
