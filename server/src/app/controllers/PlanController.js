import Plan from '../models/Plan';

class PlanController {
  async index(_req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }

  async store(req, res) {
    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'title already in use' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({ id, title, duration, price });
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    const { title } = req.body;

    if (title && title !== plan.title) {
      const titleInUse = await Plan.findOne({
        where: { title },
      });

      if (titleInUse) {
        return res.status(400).json({ error: 'title already in use' });
      }
    }

    await plan.update(req.body);

    const { id, title: current_title, duration, price } = await Plan.findByPk(
      req.params.id
    );

    return res.json({ id, title: current_title, price, duration });
  }

  async destroy(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    plan.destroy();

    return res.json();
  }
}

export default new PlanController();
