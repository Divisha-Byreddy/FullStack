import patientData from '../../data/patients';
import {v1 as uuid} from 'uuid';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';

const patients : Array<Patient> = patientData ;

const getPatientsWithoutSsn = () : Array<PublicPatient> => {
  return patients.map(({id,name,dateOfBirth,gender,occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient : NewPatient) : Patient =>{
  const id : string = uuid();
  const newPatient : Patient = {
    id :id,
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};

const findById = ( id : string) : Patient | undefined =>{  
  return patients.find(p => p.id === id);
};

const addEntry = (id : string, entry : NewEntry) => {
  const updatedPatient = patients.find(p => p.id === id);
  const entryId : string = uuid();
  const newEntry : Entry = {
    id : entryId,
    ...entry
  };
  updatedPatient?.entries.push(newEntry);
  return updatedPatient;
};

export default {
  getPatientsWithoutSsn,
  addPatient,
  findById,
  addEntry
};