/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { BmiCalculator } from './bmiCalculator';
import { ExerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());
app.get('/hello', (_req,res)=> {
  res.send('Hello Full Stack!');
});

app.get('/bmi',(req,res) =>{
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if(isNaN(height) || isNaN(weight))
    res.send({error: "malformatted parameters"});
  const output = BmiCalculator(height,weight);
  res.send({
     weight : weight,
     height : height,
     bmi : output
  });
});

app.post('/exercises', (req,res) => {
  try{
    const {daily_exercises , target}  = req.body;
    daily_exercises.map((e: any) => {
      if(isNaN(e))
        throw new Error('Invalid input');
    });
    
    
    if(isNaN(target))
     throw new Error('Invalid target value');
    
    res.send(ExerciseCalculator(daily_exercises,target));
  }catch(e){
    res.send({error: "malformatted parameters"});
  }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});