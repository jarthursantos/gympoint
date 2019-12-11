import mongoose from 'mongoose';

const AnsweredNotificationSchema = mongoose.Schema(
  {
    student: {
      type: Number,
      required: true,
    },
    answer: {
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
  'AnsweredNotification',
  AnsweredNotificationSchema
);
