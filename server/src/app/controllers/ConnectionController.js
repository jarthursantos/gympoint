import Student from '../models/Student';

class SessionController {
  async store(req, res) {
    const { code } = req.body;

    const student = await Student.findOne({
      where: { alternative_id: code },
    });

    if (!student) {
      return res.status(400).json({ error: 'student not found' });
    }

    const { id, name } = student;

    return res.json({ id, name });
  }
}

export default new SessionController();
