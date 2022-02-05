import { formsActions } from '../features/forms/formsSlice';
import { formFieldsActions } from '../features/formFields/formFieldsSlice';
import { registriesActions } from '../features/registries/registriesSlice';
import { uiActions } from '../features/ui/uiSlice';

export const actionCreators = {
  ...formsActions,
  ...formFieldsActions,
  ...registriesActions,
  ...uiActions,
};
