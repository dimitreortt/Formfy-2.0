import { formsActions } from '../features/forms/formsSlice';
import { registriesActions } from '../features/registries/registriesSlice';
import { uiActions } from '../features/ui/uiSlice';

export const actionCreators = {
  ...formsActions,
  ...registriesActions,
  ...uiActions,
};
