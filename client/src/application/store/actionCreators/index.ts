import { formsActions } from '../slices/formsSlice';
import { formFieldsActions } from '../slices/formFieldsSlice';
import { registriesActions } from '../slices/registriesSlice';
import { uiActions } from '../slices/uiSlice';

export const actionCreators = {
  ...formsActions,
  ...formFieldsActions,
  ...registriesActions,
  ...uiActions,
};
