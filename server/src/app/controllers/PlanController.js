import Plan from '../models/Plan';

class PlanController {
  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id, {
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plan);
  }

  async index(_req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['title'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    let { id, title, duration, price } = req.body;

    const planExists = await Plan.findOne({
      where: { title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'title already in use' });
    }

    ({ id, title, duration, price } = await Plan.create({
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
    });
  }

  async update(req, res) {
    let { id } = req.params;

    const plan = await Plan.findByPk(id);

    let { title, duration, price } = req.body;

    if (title && title !== plan.title) {
      const titleInUse = await Plan.findOne({
        where: { title },
      });

      if (titleInUse) {
        return res.status(400).json({ error: 'title already in use' });
      }
    }

    ({ id, title, duration, price } = await plan.update({
      title,
      duration,
      price,
    }));

    return res.json({ id, title, duration, price });
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Plan.destroy({
      where: {
        id,
      },
    });

    return res.json();
  }
}

export default new PlanController();
