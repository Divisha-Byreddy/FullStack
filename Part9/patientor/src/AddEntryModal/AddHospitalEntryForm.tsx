import { Field, Form, Formik } from "formik";
import { NewEntry } from "../types";
import React from "react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Button, Grid } from "semantic-ui-react";
import { useStateValue } from "../state";

interface Props{
  onSubmit : ( values : NewEntry) => void;
  onCancel : () => void;
}

export const AddHospitalEntry  = ({ onSubmit, onCancel } : Props) =>{
  const [{ diagnoses }] = useStateValue();
  return(
    <Formik 
      initialValues = {{
        type : "Hospital",
        description: "",
        date : "",
        specialist : "",
        diagnosisCodes : [],
        discharge : {
          date : "",
          criteria : ""
        }
      }}
      onSubmit = {onSubmit}
      validate = { values  => {
        const requiredError = 'Field is required';
        const errors : {[ field : string] : string} ={};
        if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          return errors;
      }}
    >
     {({ isValid, dirty, setFieldValue, setFieldTouched }) =>{
       return(
         <Form className = "form ui">
           <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
              readOnly
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
         </Form>
       );
     }}
    </Formik> 
  );
};