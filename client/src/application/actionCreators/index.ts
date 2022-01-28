import { formsActions } from '../features/forms/formsSlice';
import { uiActions } from '../features/ui/uiSlice';

export const actionCreators = {
  ...formsActions,
  ...uiActions,
};
