import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { EntryTypes, NewEntry } from "../types";
import {
  TextField,
  NumberField,
  DiagnosisSelection,
  SelectEntryType,
  EntryTypeOption,
  OptionalSickLeave,
} from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const [addSickLeave, setSickLeave] = useState<boolean>(false);

  const baseValues = {
    description: "",
    date: "",
    specialist: "",
  };

  const entryOptions: EntryTypeOption[] = [
    { label: "HealthCheck", value: EntryTypes.HealthCheck },
    { label: "Hospital", value: EntryTypes.Hospital },
    {
      label: "OccupationalHealthcare",
      value: EntryTypes.OccupationalHealthcare,
    },
  ];

  return (
    <Formik
      initialValues={{
        ...baseValues,
        type: "HealthCheck",
        healthCheckRating: 1,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is missing";
        const errors: { [field: string]: string } = {};

        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!values.description) {
          errors.description = requiredError;
        }

        if (values.type === "HealthCheck" && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }

        if (values.type === "Hospital" && !values.discharge) {
          errors.type = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          errors.type = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }

        return errors;
      }}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        setValues,
        values,
      }) => {
        return (
          <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Current date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            {values.type === "HealthCheck" &&
              values.healthCheckRating !== undefined && (
                <Field
                  label="Rating"
                  min={0}
                  max={3}
                  name="healthCheckRating"
                  component={NumberField}
                />
              )}

            {values.type === "OccupationalHealthcare" &&
              values.employerName !== undefined && (
                <Field
                  label="Employer"
                  placeholder="employerName"
                  name="employerName"
                  component={TextField}
                />
              )}

            {values.type === "Hospital" && values.discharge !== undefined && (
              <>
                <Field
                  label="Discharge criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />

                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
              </>
            )}

            {values.type === "OccupationalHealthcare" && addSickLeave && (
              <>
                <OptionalSickLeave
                  fieldName="sickLeave.startDate"
                  label="Start date for leave"
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                />
                <OptionalSickLeave
                  label="End date for leave"
                  fieldName="sickLeave.endDate"
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                />
              </>
            )}

            <DiagnosisSelection
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectEntryType
              options={entryOptions}
              name="type"
              label="Entry type"
              setValues={setValues}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button onClick={onCancel} type="button" color="red">
                  Cancel
                </Button>
              </Grid.Column>
              {values.type === "OccupationalHealthcare" && (
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="button"
                    color="teal"
                    onClick={() => setSickLeave(!addSickLeave)}
                  >
                    Add Sick Leave
                  </Button>
                </Grid.Column>
              )}

              <Grid.Column floated="right" width={5}>
                <Button
                  disabled={!isValid || !dirty}
                  type="submit"
                  color="green"
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
