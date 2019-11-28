import Plan from '../models/Plan';

class PlanController {
  async index(_req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'title already in use' });
    }

    const student = await Plan.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    const { title } = req.body;

    if (title) {
      const titleInUse = await Plan.findOne({
        where: { title },
      });

      if (titleInUse) {
        return res.status(400).json({ error: 'title already in use' });
      }
    }

    plan.update(req.body);

    return res.json(plan);
  }

  async destroy(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    plan.destroy();

    return res.json(plan);
  }
}

export default new PlanController();
