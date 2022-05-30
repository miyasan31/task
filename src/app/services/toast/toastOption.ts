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
    position: 'top',
    duration: 2000,
  },
  success: {
    color: 'success',
    position: 'top',
    duration: 2000,
  },
  error: {
    color: 'danger',
    position: 'top',
    duration: 2000,
  },
  warning: {
    color: 'warning',
    position: 'top',
    duration: 2000,
  },
};
