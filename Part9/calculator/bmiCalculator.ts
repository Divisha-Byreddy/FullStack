/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface bmi{
  weight : number,
  height : number
}

const calculateBmi = (height : number, mass : number) : string=> {
  if(isNaN(height) || isNaN(mass))
    throw new Error('Invalid input');

  height = height*0.01;
  const bmi = mass/(height*height);
  if(bmi < 25 )
    return 'Normal (healthy weight)';
  else if(bmi >= 25 && bmi <= 29)
    return 'Overweight';

  return 'Obese';
};

const parseArguments = (args : Array<string>) : bmi => {
  
  if(args.length < 4 )
    throw new Error('Invalid number of arguments');
  
  if(isNaN(Number(args[2])) || isNaN(Number(args[3])))
    throw new Error('Invalid arguments, arguments should be numbers');

  return{
    weight : Number(args[3]),
    height : Number(args[2])
  };
  
};

try{
  const inputs = parseArguments(process.argv);
  console.log(calculateBmi(inputs.height, inputs.weight));
}catch(e){
  console.log('Error, message:',e.message);
}

export const BmiCalculator = (height : number , weight : number) => {
  return calculateBmi(height, weight);
};
