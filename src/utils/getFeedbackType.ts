import type { TFeedbackType } from '../interfaces';

const feedback = {
  error: 'text-feedback-error',
  info: 'text-feedback-info',
  success: 'text-feedback-success',
  warning: 'text-feedback-warning',
};

export const getFeedbackType = (type?: TFeedbackType) => feedback[type || 'info'];
