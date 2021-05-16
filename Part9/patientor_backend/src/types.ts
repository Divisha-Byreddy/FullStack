export interface Diagonse{
  code : string,
  name : string,
  latin? : string
}

export enum Gender{
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagonse['code']>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryTypes  {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry{
  type : "OccupationalHealthcare";
  employerName : string;
  sickLeave? : {
    startDate : string;
    endDate : string;
  }
}

export interface Discharge {
  date : string;
  criteria : string;
}

interface HospitalEntry extends BaseEntry{
  type : "Hospital";
  discharge : Discharge
}

export type Entry = | HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;

export interface Patient{
  id : string,
  name : string,
  dateOfBirth : string,
  ssn : string,
  gender : string,
  occupation : string,
  entries : Entry[]
}

export type PublicPatient = Omit<Patient,'ssn' | 'entries' >;

export type NewPatient = Omit<Patient,'id'>;