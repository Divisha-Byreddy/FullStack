import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import {   Button, Header, Icon, SemanticCOLORS } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import AddEntryModal, { AddHospitalEntryModal, AddOccupationalHCEntryModal } from "../AddEntryModal";
import { apiBaseUrl } from "../constants";
import {  getDiagnoses, getPatient, useStateValue } from "../state";
import { Diagnosis,  Entry,  Gender,  HealthCheckRating,  NewEntry,  Patient } from "../types";

const EntryDetails : React.FC<{entry : Entry}> = ({entry}) => {
  const entryStyle = {
    border : "2px solid lightGrey",
    padding : "10px",
    borderRadius : "10px"
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const healthCheckRating = ( value : HealthCheckRating ) : SemanticCOLORS =>{
    switch(value){
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return "blue";
    }
  };

  switch (entry.type) {
    case "HealthCheck":
      return(
        <div style ={entryStyle}>
          <Header as = "h3">
            <div>{entry.date} <Icon name = "user doctor" size = "big"/></div>
            <HeaderSubHeader><i>{entry.description}</i></HeaderSubHeader>
            <div><Icon name = "heart" size = "small" color = {healthCheckRating(entry.healthCheckRating)}/></div>
          </Header>
        </div>
      );
    case "OccupationalHealthcare":
      return(
        <div style ={entryStyle}>
          <Header as = "h3">
            <div>{entry.date} <Icon name = "stethoscope" size = "big"/> <strong>FBI</strong></div>
            <HeaderSubHeader><i>{entry.description}</i></HeaderSubHeader>
          </Header>
        </div>
      );
      case "Hospital":
        return(
          <div style ={entryStyle}>
            <Header as = "h3">
              <div>{entry.date} <Icon name = "hospital" size = "big"/> <strong>FBI</strong></div>
              <HeaderSubHeader><i>{entry.description}</i></HeaderSubHeader>
            </Header>
          </div>
        );
    default:
      return assertNever(entry);
      break;
  }

};

const PatientInfoPage = () => {
  const [{patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [ohcModalOpen, setOhcModalOpen] = React.useState<boolean>(false);
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{diagnoses}]= useStateValue();
  const { id } = useParams<{id : string}>();

  console.log(patient);
  
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };
  
  const openOhcModal = (): void => setOhcModalOpen(true);

  const closeOhcModal = (): void => {
    setOhcModalOpen(false);
  };

  const openHospitalModal = (): void => setHospitalModalOpen(true);

  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
  };
 
  React.useEffect(() => {
    const fetchPatient = async () => {
     try{
       if(!(patient && patient.id === id)){
        const { data : patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(getPatient(patientInfo));
       }
     }catch(e){
       console.log(e.response);
       setError(e.response?.data?.error || 'Unknown error');
     }
    };
    void fetchPatient();
  },[id]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try{
        const {data : diagnosesList} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(getDiagnoses(diagnosesList));
      }catch(e){
        console.log(e.message);
      }
    };
    void fetchDiagnoses();
  },[]);

  const genderType = (gender : Gender) =>{
    switch(gender){
      case Gender.Male:
        return "mars stroke";
        break;
      case Gender.Female:
        return "venus";
        break;
      default:
        return "genderless";
    }
  };

  const submitNewEntry = async ( values : NewEntry ) => {
    console.log('in');
    console.log(values);
    try{
      const { data : newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`, values
      );
      dispatch({type : "ADD_ENTRY", payload : newEntry});
      setError(undefined);
      closeModal();
      closeHospitalModal();
      closeOhcModal();
    }catch(e){
      console.error(e.response.data);
      setError(e.response?.data || 'Unknown error');
    }
    
  };

  if(patient){   
   return(
      <div>
        <Header as = 'h2'>
          {patient.name} <Icon name = {genderType(patient.gender)}/>
        </Header>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h3>entries</h3>
        {
          patient.entries?.map(e => (
            <div key = {e.id}>
              <EntryDetails entry = {e}/>
              <ul>
              {
                e.diagnosisCodes?.map(d => <li key = {d}>{d} {diagnoses.find(diag => diag.code === d)?.name}</li>)
              }
              </ul>
            </div>
          ))
        }
        <AddEntryModal 
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New HealthCare Entry</Button>
        <AddOccupationalHCEntryModal 
          modalOpen={ohcModalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeOhcModal}
        />
        <Button onClick={() => openOhcModal()}>Add New OccasionalHC Entry</Button>
        <AddHospitalEntryModal 
          modalOpen={hospitalModalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeHospitalModal}
        />
        <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
      </div>
    );
  }

 return <div>patinet not found</div>;
};

export default PatientInfoPage;