import diagnosesData from '../../data/diagnoses.json';
import { Diagonse } from '../types';

const diagnoses: Array<Diagonse> = diagnosesData as Array<Diagonse>;

const getDiagnoses = () : Array<Diagonse>=>{
  return diagnoses;
};

export default{
  getDiagnoses
};