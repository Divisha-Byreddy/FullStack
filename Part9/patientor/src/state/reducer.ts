import { State } from "./state";
import { Diagnosis,  Patient } from "../types";

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
      type : "GET_PATIENT";
      payload : Patient;
    }
  | {
      type : "GET_DIAGNOSES",
      payload : Diagnosis[]
    }
  | {
      type : "ADD_ENTRY",
      payload : Patient
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
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patient :  action.payload
      };
    case "GET_DIAGNOSES":
      return{
        ...state,
        diagnoses : action.payload
      };  
    case "ADD_ENTRY":
      return {
        ...state,
        patient :  action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi : Patient[]) : Action=> {
  return{
    type : "SET_PATIENT_LIST",
    payload : patientListFromApi
  };
};

export const getPatient = ( patient : Patient) : Action=> {
  return{
    type : "GET_PATIENT",
    payload : patient
  };
};

export const addPatient = ( patient : Patient ) : Action => {
  return{
    type : "ADD_PATIENT",
    payload : patient
  };
};

export const getDiagnoses = ( diagnoses : Diagnosis[]) : Action => {
  return{
    type : "GET_DIAGNOSES",
    payload : diagnoses
  };
};

export const addEntry = ( patient : Patient ) : Action => {
  return{
    type : "ADD_ENTRY",
    payload : patient
  };
};
