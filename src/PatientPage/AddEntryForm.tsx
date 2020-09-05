import React from "react";
import { Formik, Form, Field } from "formik";
import { HealthCheckEntry } from "../types";
import {
  TextField,
  NumberField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: Omit<HealthCheckEntry, "id">) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0,
        type: "HealthCheck",
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

        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
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
        initialValues,
        initialTouched,
        getFieldMeta,
      }) => {
        return (
          <Form className="form ui">
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="healthCheckRating"
              min={-1}
              max={3}
              name="healthCheckRating"
              component={NumberField}
            />
            <DiagnosisSelection
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              diagnoses={Object.values(diagnoses)}
            />
            {console.log(getFieldMeta("date"))}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button onClick={onCancel} type="button" color="red">
                  Cancel
                </Button>
              </Grid.Column>
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
