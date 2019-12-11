import HelpOrderNotification from '../schemas/HelpOrderNotification';

class HelpOrderNotificationController {
  async index(_req, res) {
    const notifications = await HelpOrderNotification.find({ answered: false })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await HelpOrderNotification.findByIdAndUpdate(
      req.params.id,
      { answered: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new HelpOrderNotificationController();
