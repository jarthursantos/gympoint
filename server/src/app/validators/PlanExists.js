import Plan from '../models/Plan';

export default function planExists(resolveID) {
  return async (req, res, next) => {
    const plan = await Plan.findByPk(resolveID(req));

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    return next();
  };
}
