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
import { IForm } from "../../../domain/Form";
import { IFormField } from "../../../domain/FormField";
import { useActions } from "../../../application/hooks/useActions";

type Params = {
  formId: string;
};

export const FormFieldsManageTable = () => {
  const { setForms } = useActions();
  const { formId } = useParams<Params>();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const selectForm = () => {
    if (forms === "not_initialized") return;
    return forms.find((form) => form.id.toString() === formId);
  };
  const form = selectForm();

  const { moveFieldUp } = useMoveFieldUp(parseInt(formId || "0"));

  const [formFields, setFormFields] = useState<IFormField[] | null>(null);

  useEffect(() => {
    if (!form) return;
    // if (formFields) return;
    setFormFields(
      [...form.fields].sort((fieldA, fieldB) => fieldA.index - fieldB.index)
    );
  }, [form]);

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

  const handleMoveUp = (clickedField: IFormField) => {
    if (!formFields) return;
    if (clickedField.index <= 0) return;

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

  const getNext = (clickedField: IFormField) => {
    return { ...formFields![clickedField.index + 1] };
  };

  const handleMoveDown = (item: any) => {
    console.log("clicked move down");
  };

  return (
    <div>
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {formFields &&
              [...formFields]
                // .sort((fieldA, fieldB) => fieldA.index - fieldB.index)
                .map((field) => (
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
