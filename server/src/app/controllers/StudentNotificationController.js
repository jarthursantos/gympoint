import Student from '../models/Student';
import AnsweredNotification from '../schemas/AnsweredNotification';

class StudentNotificationController {
  async index(req, res) {
    const { student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const notifications = await AnsweredNotification.find({
      student: student_id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const { student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const notification = await AnsweredNotification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new StudentNotificationController();
