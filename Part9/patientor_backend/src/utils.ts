import { BaseEntry, Discharge,  EntryTypes, Gender,  NewEntry, NewPatient } from "./types";

const isString = (text : unknown) : text is string =>{
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date : string) : boolean =>{
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (value : any) : value is Gender=>{
  return Object.values(Gender).includes(value);
};

const parseName = ( name : unknown) : string => {
  if(!name || !isString(name))
    throw new Error('Invalid or missing name');

  return name;
};

const parseOccupation = ( occupation : unknown) : string => {
  if(!occupation || !isString(occupation))
    throw new Error('Invalid or missing occupation');

  return occupation;
};

const parseSsn = ( ssn : unknown) : string => {
  if(!ssn || !isString(ssn))
    throw new Error('Invalid or missing ssn');

  return ssn;
};

const parseDate = (date : unknown) : string =>{
  if(!date || !isString(date) || !isDate(date))
    throw new Error('Missing or Invalid date format');

  return date;
};

const parseGender = (gender : unknown) : Gender =>{
  if(!gender || !isGender(gender))
    throw new Error(`Invalid or missing ${gender}`);

  return gender;
};

export const toNewPatientType = ( patient : NewPatient) : NewPatient => {
  const newPatient : NewPatient = {
    name : parseName(patient.name),
    dateOfBirth : parseDate(patient.dateOfBirth),
    ssn : parseSsn(patient.ssn),
    gender : parseGender(patient.gender),
    occupation : parseOccupation(patient.occupation),
    entries : patient.entries ?? []
  };

  return newPatient;
};

const parseDescription = (description : unknown) :string => {
  if(!description || !isString(description)){
    throw new Error(`Invalid or missing description`);
  }
  return description;
};

const parseSpecialist = (specialist : unknown) :string => {
  if(!specialist || !isString(specialist)){
    throw new Error(`Invalid or missing description`);
  }
  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = ( type : any) : type is EntryTypes =>{
  return Object.values(EntryTypes).includes(type);
};


const parseDischarge = (discharge : Discharge) : Discharge =>{
  if(!discharge || !discharge.date || ! discharge.criteria)
    throw new Error(`Invalid or missing Discharge type`);
  console.log(isDate(discharge.date));
  
  if(!isDate(discharge.date))
    throw new Error(`Invalid discharge date`);

  if(!isString(discharge.criteria))
    throw new Error(`Invalid discharge criteria`);

  return discharge;
};

const parseSickLeave= (startDate : unknown, endDate : unknown ) => {
  if(startDate === "" && endDate === "")
    return;
  if(!isString(startDate) || !isString(endDate) ||  !isDate(startDate) || !isDate(endDate) || isDate(startDate) > isDate(endDate))
    throw new Error(`Invalid sick leave dates, End date should be greater than start date`);
};

export const toNewEntryType = (entry : NewEntry) : NewEntry => {
  const newEntry : Omit<BaseEntry,'id'> = {
    description : parseDescription(entry.description),
    date : parseDate(entry.date),
    specialist : parseSpecialist(entry.specialist),
    diagnosisCodes : entry.diagnosisCodes
  };

  if(!entry.type || !isEntryType(entry.type))
    throw new Error(`Invalid or missing type`);
  

  switch (entry.type) {
    case "HealthCheck":
      if(Number(entry.healthCheckRating) === undefined)  
        throw new Error(`Invalid or missing healthCheckRating`);
      return {...newEntry, type : entry.type, healthCheckRating : entry.healthCheckRating};
    case "OccupationalHealthcare":
      if(!entry.employerName || !isString(entry.employerName))
        throw new Error(`Invalid or missing employeeName`);
      if( !entry.sickLeave || parseSickLeave(entry.sickLeave?.endDate,entry.sickLeave?.startDate))
        throw new Error(`Invalid or missing sick leave dates`);
      
      return {...newEntry, type : entry.type , employerName : entry.employerName, sickLeave : entry.sickLeave };
    case "Hospital":
       return{...newEntry, type : entry.type , discharge : parseDischarge(entry.discharge)};
    default:
      throw new Error('Invalid type');
  }
};