import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Registration from '../models/Registration';

class CheckinController {
  async index(req, res) {
    const { id: student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
    });

    return res.json(checkins);
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

    const quota = await Checkin.findAll({
      where: {
        created_at: {
          [Op.gte]: subDays(new Date(), 7),
        },
      },
    });

    if (quota.length >= 5) {
      return res
        .status(400)
        .json({ error: 'checkin student quota has been exceded' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
