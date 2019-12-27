import Plan from '../models/Plan';

class PlanController {
  async show(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    return res.json(req.finded.plan);
  }

  async index(_req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['title'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const { title, duration, price } = req.body;

    const planExists = await Plan.findOne({
      where: { title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'title already in use' });
    }

    const plan = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json(plan);
  }

  async update(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    let { title, duration, price } = req.body;

    if (title && title !== plan.title) {
      const titleInUse = await Plan.findOne({
        where: { title },
      });

      if (titleInUse) {
        return res.status(400).json({ error: 'title already in use' });
      }
    }

    ({ title, duration, price } = await plan.update({
      title,
      duration,
      price,
    }));

    return res.json({ id, title, duration, price });
  }

  async destroy(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    await plan.destroy();

    return res.json();
  }
}

export default new PlanController();
