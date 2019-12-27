import mongoose from 'mongoose';

const FeedbackNotificationSchema = mongoose.Schema(
  {
    user: {
      type: Number,
      required: true,
    },
    help_order: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
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
  'FeedbackNotification',
  FeedbackNotificationSchema
);
