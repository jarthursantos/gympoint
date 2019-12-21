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
    let { id, title, duration, price, deprecated_at } = req.body;

    const planExists = await Plan.findOne({
      where: { title, deprecated_at: null },
    });

    if (planExists) {
      return res.status(400).json({ error: 'title already in use' });
    }

    ({ id, title, duration, price, deprecated_at } = await Plan.create({
      title,
      duration,
      price,
      created_by: req.user_id,
    }));

    return res.json({
      id,
      title,
      duration,
      price,
      deprecated_at,
    });
  }

  async update(req, res) {
    let { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (plan.deprecated_at) {
      return res.status(400).json({ error: 'plan has been deprecated' });
    }

    let deprecated = null;
    let { title, duration, price } = req.body;

    if (title && title !== plan.title) {
      const titleInUse = await Plan.findOne({
        where: { title, deprecated_at: null },
      });

      if (titleInUse) {
        return res.status(400).json({ error: 'title already in use' });
      }
    }

    ({ id, title, duration, price, deprecated } = await plan.update({
      title,
      duration,
      price,
    }));

    return res.json({ id, title, duration, price, deprecated });
  }

  async destroy(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    await plan.update({
      deprecated_at: new Date(),
    });

    return res.json();
  }
}

export default new PlanController();
