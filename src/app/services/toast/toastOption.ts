import { PredefinedColors } from '@ionic/core';

type Position = 'top' | 'middle' | 'bottom';

export type ToastStatus = 'default' | 'success' | 'error' | 'warning';

type ToastOption = Record<
  ToastStatus,
  { color: PredefinedColors; position: Position; duration: number }
>;

export const toastOption: ToastOption = {
  default: {
    color: 'medium',
    position: 'bottom',
    duration: 2000,
  },
  success: {
    color: 'success',
    position: 'bottom',
    duration: 2000,
  },
  error: {
    color: 'danger',
    position: 'bottom',
    duration: 2000,
  },
  warning: {
    color: 'warning',
    position: 'bottom',
    duration: 2000,
  },
};
