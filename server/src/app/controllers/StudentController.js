import Student from '../models/Student';

class StudentController {
  async index(_req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
    });
    return res.json(students);
  }

  async store(req, res) {
    const emailAlreadyExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (emailAlreadyExists) {
      return res.status(400).json({ error: 'email already in use' });
    }

    const { id, name, email, age, height, weight } = await Student.create({
      ...req.body,
      created_by: req.user_id,
    });

    return res.json({ id, name, email, age, height, weight });
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const { email } = req.body;

    if (email && email !== student.email) {
      const emailInUse = await Student.findOne({
        where: { email },
      });

      if (emailInUse) {
        return res.status(400).json({ error: 'email already in use' });
      }
    }

    await student.update(req.body);

    const {
      id,
      name,
      email: currentEmail,
      age,
      height,
      weight,
    } = await Student.findByPk(req.params.id);

    return res.json({ id, name, email: currentEmail, age, height, weight });
  }
}

export default new StudentController();
