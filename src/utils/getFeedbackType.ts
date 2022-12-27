import type { TFeedbackType } from "../interfaces";

// TODO: Refact this code
export const getFeedbackType = (type?: TFeedbackType) => {
  if (type === 'error') return 'text-feedback-error';
  if (type === 'info') return 'text-feedback-info';
  if (type === 'success') return 'text-feedback-success';
  if (type === 'warning') return 'text-feedback-warning';

  return 'text-feedback-info';
}