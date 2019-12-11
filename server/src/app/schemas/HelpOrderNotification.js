import mongoose from 'mongoose';

const HelpOrderNotificationSchema = mongoose.Schema(
  {
    help_order: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    answered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  'HelpOrderNotification',
  HelpOrderNotificationSchema
);
