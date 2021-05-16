import express from 'express';
import patientsService from '../services/patientsServices';
import { NewEntry, NewPatient } from '../types';
import { toNewEntryType, toNewPatientType } from '../utils';

const router = express.Router();

router.get('/', (_req,res) => {
  res.send(patientsService.getPatientsWithoutSsn());
});

router.get(`/:id`, (req,res)=>{
  const patient = patientsService.findById(req.params.id);
  if(patient)
    res.send(patient);
  else
    res.sendStatus(404);
});

router.post('/', (req,res) => {
 try{
   const newPatient : NewPatient = toNewPatientType(req.body);
   const addPatient = patientsService.addPatient(newPatient);
   res.send(addPatient);
 }catch(e){
   res.status(400).send(e.message);
 }
});

router.post(`/:id/entries`, (req,res) => {
  try{
    const id = req.params.id;
    const newEntry : NewEntry = toNewEntryType(req.body);
    const patient = patientsService.addEntry(id,newEntry);
    res.send(patient);
  }catch(e){
    res.status(400).send(e.message);
    console.error(e.message);
  }

});

export default router;