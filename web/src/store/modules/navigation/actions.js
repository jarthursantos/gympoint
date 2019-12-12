import types from './types';

export function navigate(activeTab) {
  return {
    type: types.NAVIGATE,
    payload: { activeTab },
  };
}
