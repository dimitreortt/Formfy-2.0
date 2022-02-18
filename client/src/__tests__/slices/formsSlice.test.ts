import { IFormField } from './../../domain/entities/FormField';
import { IForm } from '../../domain/entities/Form';
import formsReducer, {
  formsActions,
} from '../../application/store/slices/formsSlice';

test('Should return initial state', () => {
  //   const initialState = {
  //     // awaiting num sei o q
  //   };
  //   expect(formsReducer(undefined, {})).toMatchObject(initialState);
});

test('Should remove deleted field, and update the other fields indexes', () => {
  const field1: IFormField = {
    index: 0,
    label: 'field 1',
    id: 49,
    type: 'Short Text',
    options: [],
  };

  const field2: IFormField = {
    index: 1,
    id: 30,
    label: 'field 2',
    type: 'Long Text',
    options: [],
  };

  const field3: IFormField = {
    index: 2,
    id: 66,
    label: 'field 3',
    type: 'Date and Time',
    options: [],
  };

  const initialFields: IFormField[] = [field3, field1, field2];

  const FORM_ID = 1;
  const initialState = {
    forms: [
      {
        id: FORM_ID,
        name: 'Test form',
        fields: initialFields,
      },
    ],
    loadingForms: false,
    loadFormsFail: false,
    deleteFormFail: false,
    awaitingDeleteForm: false,
    deleteFormSuccess: false,
  };

  const newState = formsReducer(
    initialState,
    formsActions.removeDeletedField([FORM_ID, field1])
  );

  expect(typeof newState.forms[0]).not.toBe('string');
  const fields = newState.forms[0].fields;
  expect(fields.length).toBe(2);
  expect(fields.find((f: any) => f.label === 'field 2')).toMatchObject(
    expect.objectContaining({
      index: 0,
    })
  );
  expect(fields.find((f: any) => f.label === 'field 3')).toMatchObject(
    expect.objectContaining({
      index: 1,
    })
  );
});
