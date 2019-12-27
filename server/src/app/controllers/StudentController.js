import Student from '../models/Student';

class StudentController {
  async show(req, res) {
    const student = await Student.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'birthdate', 'height', 'weight'],
    });

    return res.json(student);
  }

  async index(_req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'email', 'birthdate', 'height', 'weight'],
      order: ['name', 'birthdate', 'email'],
    });

    return res.json(students);
  }

  async store(req, res) {
    const { name, email, birthdate, height, weight } = req.body;

    const emailAlreadyExists = await Student.findOne({
      where: { email },
    });

    if (emailAlreadyExists) {
      return res.status(400).json({ error: 'email already in use' });
    }

    const student = await Student.create({
      name,
      email,
      birthdate,
      height,
      weight,
      created_by: req.user_id,
    });

    return res.json(student);
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const { name, email, birthdate, height, weight } = req.body;

    if (email && email !== student.email) {
      const emailInUse = await Student.findOne({
        where: { email },
      });

      if (emailInUse) {
        return res.status(400).json({ error: 'email already in use' });
      }
    }

    await student.update({
      name,
      email,
      birthdate,
      height,
      weight,
    });

    const updatedStudent = await Student.findByPk(req.params.id);

    return res.json(updatedStudent);
  }
}

export default new StudentController();
