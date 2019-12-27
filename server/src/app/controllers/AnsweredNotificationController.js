import Student from '../models/Student';
import AnsweredNotification from '../schemas/AnsweredNotification';

class AnsweredNotificationController {
  async index(req, res) {
    const { student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const notifications = await AnsweredNotification.find({
      student: student_id,
    }).sort({ createdAt: 'desc' });

    return res.json(notifications);
  }

  async update(req, res) {
    const { id, student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const notificationExists = await AnsweredNotification.find({
      student: student_id,
      help_order: id,
    });

    if (!notificationExists) {
      return res.status(400).json({ error: "notification don't exists" });
    }

    const notification = await AnsweredNotification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new AnsweredNotificationController();
