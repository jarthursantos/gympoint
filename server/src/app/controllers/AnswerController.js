import HelpOrder from '../models/HelpOrder';

class CheckinController {
  async store(req, res) {
    const { id: help_order_id } = req.params;

    const helpOrder = await HelpOrder.findByPk(help_order_id);

    if (!helpOrder) {
      return res.status(400).json({ error: "help order don't exists" });
    }

    const { answer_at: alreadAnswed } = helpOrder;

    if (alreadAnswed) {
      return res.status(400).json({ error: 'help order already answered' });
    }

    await helpOrder.update({
      ...req.body,
      answer_at: new Date(),
    });

    const { id, question, answer, answer_at } = await HelpOrder.findByPk(
      help_order_id
    );

    return res.json({ id, question, answer, answer_at });
  }
}

export default new CheckinController();
