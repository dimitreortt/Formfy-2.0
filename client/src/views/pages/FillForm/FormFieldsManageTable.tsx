import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { TransitionGroup } from "react-transition-group";
import { CustomTableRow } from "./CustomTableRow";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";
import { useParams } from "react-router-dom";
import { useMoveFieldUp } from "../../../application/usecase/useMoveFieldUp";
import { IFormField } from "../../../domain/FormField";
import { useActions } from "../../../application/hooks/useActions";

type Params = {
  formId: string;
};

export const FormFieldsManageTable = () => {
  const { formId } = useParams<Params>();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const selectForm = () => {
    if (forms === "not_initialized") return;
    return forms.find((form) => form.id.toString() === formId);
  };
  const form = selectForm();
  const { awaitingMoveUp, moveUpFail, moveUpSuccess } = useSelector(
    (state: RootState) => state.formFields
  );

  const { moveFieldUp } = useMoveFieldUp(parseInt(formId || "0"));

  const [formFields, setFormFields] = useState<IFormField[] | null>(null);
  const [lastMoveUpClicked, setLastMoveUpClicked] = useState<IFormField>();

  useEffect(() => {
    if (!form) return;
    if (formFields) return;
    setFormFields(
      [...form.fields].sort((fieldA, fieldB) => fieldA.index - fieldB.index)
    );
  }, [form]);

  useEffect(() => {
    if (awaitingMoveUp) return;
    if (moveUpFail) return;
    if (!moveUpSuccess) return;
    execMoveUpTransition(lastMoveUpClicked!);
  }, [awaitingMoveUp]);

  const getPrevious = (clickedField: IFormField) => {
    return { ...formFields![clickedField.index - 1] };
  };

  const removeClicked = (clickedField: IFormField) => {
    const without = [...formFields!].filter(
      (field) => field.index !== clickedField.index
    );
    return without;
  };

  const swapIndexes = (field1: IFormField, field2: IFormField) => {
    let temp = field1.index;
    field1.index = field2.index;
    field2.index = temp;
  };

  const reInsertClicked = (
    withoutClicked: IFormField[],
    newClicked: IFormField
  ) => {
    const newState = [...withoutClicked];
    newState.splice(newClicked.index, 0, newClicked);
    return newState;
  };

  const ratifyFieldInState = (state: IFormField[], field: IFormField) => {
    state[field.index] = field;
  };

  const isFirstField = (field: IFormField) => field.index <= 0;

  const handleMoveUp = (clickedField: IFormField) => {
    if (isFirstField(clickedField)) return;
    setLastMoveUpClicked(clickedField);
    moveFieldUp(clickedField.index);
  };

  const execMoveUpTransition = (clickedField: IFormField) => {
    if (!formFields) return;
    let previous = getPrevious(clickedField);
    const withoutClicked = removeClicked(clickedField);
    setFormFields(withoutClicked);
    let newClicked = { ...clickedField };
    swapIndexes(newClicked, previous);
    let newState = reInsertClicked(withoutClicked, newClicked);
    ratifyFieldInState(newState, previous);
    setTimeout(() => {
      setFormFields([...newState]);
    }, 300);
  };

  const getNext = (clickedField: IFormField) => ({
    ...formFields![clickedField.index + 1],
  });

  const handleMoveDown = (clickedField: IFormField) => {
    if (!formFields) return;
    if (clickedField.index >= formFields.length - 1) return;
    let next = getNext(clickedField);
    const withoutClicked = removeClicked(clickedField);
    setFormFields(withoutClicked);
    let newClicked = { ...clickedField };
    swapIndexes(newClicked, next);
    let newState = reInsertClicked(withoutClicked, newClicked);
    ratifyFieldInState(newState, next);
    setTimeout(() => {
      setFormFields([...newState]);
    }, 300);
  };

  return (
    <div>
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {formFields &&
              [...formFields].map((field) => (
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
