import Student from '../models/Student';

class StudentController {
  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id, {
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
    let { id, name, email, birthdate, height, weight } = req.body;

    const emailAlreadyExists = await Student.findOne({
      where: { email },
    });

    if (emailAlreadyExists) {
      return res.status(400).json({ error: 'email already in use' });
    }

    ({ id, name, email, birthdate, height, weight } = await Student.create({
      name,
      email,
      birthdate,
      height,
      weight,
      created_by: req.user_id,
    }));

    return res.json({
      id,
      name,
      email,
      birthdate,
      height,
      weight,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: "student don't exists" });
    }

    let { name, email, birthdate, height, weight } = req.body;

    if (email && email !== student.email) {
      const emailInUse = await Student.findOne({
        where: { email },
      });

      if (emailInUse) {
        return res.status(400).json({ error: 'email already in use' });
      }
    }

    ({ name, email, birthdate, height, weight } = await student.update({
      name,
      email,
      birthdate,
      height,
      weight,
    }));

    return res.json({ id, name, email, birthdate, height, weight });
  }
}

export default new StudentController();
