import Plan from '../models/Plan';

export default function find(extractID, saveProp = 'plan') {
  return async (req, res, next) => {
    const plan = await Plan.findByPk(extractID(req));

    if (!plan) {
      return res.status(400).json({ error: "plan don't exists" });
    }

    req[saveProp] = plan;

    return next();
  };
}
