import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form, Input, Label } from "semantic-ui-react";
import { Diagnosis, Gender, EntryTypes, NewEntry } from "../types";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

export type EntryTypeOption = {
  value: EntryTypes;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

type SelectEntryTypeProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
  setValues: (values: NewEntry) => void;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  max,
  min,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type="number" min={min} max={max} />

    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const SelectEntryType: React.FC<SelectEntryTypeProps> = ({
  label,
  options,
  name,
  setValues,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="dropdown ui">
      {options.map((op) => (
        <option
          onClick={() => {
            if (op.value === EntryTypes.Hospital) {
              setValues({
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                discharge: {
                  criteria: "",
                  date: "",
                },
              });
            } else if (op.value === EntryTypes.HealthCheck) {
              setValues({
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                healthCheckRating: 1,
              });
            } else if (op.value === EntryTypes.OccupationalHealthcare) {
              setValues({
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                employerName: "",
              });
            }
          }}
          key={op.value}
          value={op.value}
        >
          {op.label || op.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const OptionalSickLeave = ({
  setFieldTouched,
  fieldName,
  label,
  setFieldValue,
}: {
  setFieldTouched: FormikProps<{
    [fieldName: string]: string;
  }>["setFieldTouched"];
  fieldName: string;
  label: string;
  setFieldValue: FormikProps<{ [fieldName: string]: string }>["setFieldValue"];
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldTouched(fieldName, true);
    setFieldValue(fieldName, e.target.value);
  };

  return (
    <Form.Field>
      <Label>{label}</Label>
      <Input type="text" onChange={onChange} />
    </Form.Field>
  );
};
