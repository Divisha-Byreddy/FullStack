/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface Result{
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

export interface ExerciseInput{
  target : number,
  hours : Array<number>  
}

const ratingDescription = (average : number, target : number) : string =>{
    if(average < target/2)
      return "poor";
    else if(average < target)
      return "average";
    else
      return "Excellent";
};

const calculateExercises  = (noOfHours : Array<number>, target : number) : Result => {
  const average = (
      noOfHours.reduce((sum,x) => (
          sum + x
      ),0)/noOfHours.length
  );
  const rating = average> target ? 3 : (average <1 ? 1 : 2);
  const description = ratingDescription(average,target);
  let days = 0;
  noOfHours.map(n => n !==0 ? days++ : null );
  return{
    periodLength: noOfHours.length,
    trainingDays: days,
    success: average > target ? true : false,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average
  };
};

const parseExerciseArguments = ( args : Array<string>) : ExerciseInput =>{
  if(args.length < 4 )
    throw new Error('Not enough arguments');
  if(isNaN(Number(args[2])))
    throw new Error('Invalid arguments');
  let target  = Number(args[2]);
  const hours : Array<number> = [];
  args = args.slice(3);
  args.map(i => {
    if(isNaN(Number(i)))
      throw new Error('Arguments should be of type number');
    if(!target)
      target = Number(i);
    
    hours.push(Number(i));
  });
  return{
    target : target,
    hours : hours
  };
};

try{
  const inputs = parseExerciseArguments(process.argv);
  console.log(calculateExercises(inputs.hours,inputs.target));
}catch(e){
  console.log('Error, message', e.message);
}

export const ExerciseCalculator = (dailyExercises : Array<number>, target : number) =>{
  return calculateExercises(dailyExercises,target);
};