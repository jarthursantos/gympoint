import Plan from '../models/Plan';

class PlanController {
  async index(_req, res) {
    const plans = await Plan.findAll({
      attributes: [
        'id',
        'title',
        'duration',
        'price',
        'deprecated',
        'deprecated_at',
      ],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const planExists = await Plan.findOne({
      where: { title: req.body.title, deprecated_at: null },
    });

    if (planExists) {
      return res.status(400).json({ error: 'title already in use' });
    }

    const { id, title, duration, price, deprecated_at } = await Plan.create({
      ...req.body,
      created_by: req.user_id,
    });

    return res.json({ id, title, duration, price, deprecated_at });
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    if (plan.deprecated_at) {
      return res.status(400).json({ error: 'plan has been deprecated' });
    }

    const { title } = req.body;

    if (title && title !== plan.title) {
      const titleInUse = await Plan.findOne({
        where: { title, deprecated_at: null },
      });

      if (titleInUse) {
        return res.status(400).json({ error: 'title already in use' });
      }
    }

    await plan.update(req.body);

    const {
      id,
      title: current_title,
      duration,
      price,
      deprecated,
    } = await Plan.findByPk(req.params.id);

    return res.json({
      id,
      title: current_title,
      duration,
      price,
      deprecated,
    });
  }

  async destroy(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    await plan.update({
      deprecated_at: new Date(),
    });

    return res.json();
  }
}

export default new PlanController();
