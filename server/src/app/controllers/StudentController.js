import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'email already in use' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }
}

export default new StudentController();
