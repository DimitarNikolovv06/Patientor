import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_NEW_ENTRY";
      payload: { id: string; entry: Entry };
    };

export const addPatientAction = (payload: Patient): Action => ({
  type: "ADD_PATIENT",
  payload,
});

export const setPatientListAction = (payload: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload,
});

export const setDiagnosesListAction = (payload: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSES_LIST",
  payload,
});

export const addNewEntryAction = (payload: {
  id: string;
  entry: Entry;
}): Action => {
  return {
    type: "ADD_NEW_ENTRY",
    payload,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: [...state.diagnoses, ...action.payload],
      };

    case "ADD_NEW_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [
              ...state.patients[action.payload.id]?.entries,
              action.payload.entry,
            ],
          },
        },
      };

    default:
      return state;
  }
};
