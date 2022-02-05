import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { TransitionGroup } from 'react-transition-group';
import { CustomTableRow } from './CustomTableRow';
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { useParams } from 'react-router-dom';
import { useMoveFieldUp } from '../../../application/usecase/useMoveFieldUp';

type Params = {
  formId: string;
};

export const FormFieldsManageTable = () => {
  const { formId } = useParams<Params>();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const selectForm = () => {
    if (forms === 'not_initialized') return;
    return forms.find((form) => form.id.toString() === formId);
  };
  const form = selectForm();

  const { moveFieldUp } = useMoveFieldUp(parseInt(formId || '0'));

  // const reAddFruit = (prevState: any, index: number, item: string) => {
  //   let newState = [...prevState];
  //   newState.splice(index - 1, 0, item);
  //   // newState[index - 1] = item;
  //   setTimeout(() => {
  //     setFruitsInBasket(newState);
  //   }, 250);
  // };

  const handleMoveUp = (fieldIndex: number) => {
    // let newFruitsInBasket = [...fruitsInBasket];
    // const clickedFruitIndex = newFruitsInBasket.indexOf(item);

    // if (clickedFruitIndex === 0) return;
    // setFruitsInBasket((prev: any) => [...prev.filter((i: any) => i !== item)]);
    // reAddFruit(fruitsInBasket, clickedFruitIndex, item);
    console.log('i clicked move up');
    moveFieldUp(fieldIndex);
  };

  const handleMoveDown = () => {
    console.log('i clicked move down');
  };

  console.log(form?.fields);

  return (
    <div>
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {form &&
              form.fields.map((field) => (
                <Collapse key={field.label}>
                  <CustomTableRow
                    field={field}
                    handleMoveUp={handleMoveUp}
                    handleMoveDown={handleMoveDown}
                  />
                </Collapse>
              ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
};
