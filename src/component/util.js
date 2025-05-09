import animals from "./../data/animals.json";

export function getRandomWord() {
   const randomNum = Math.floor(Math.random() * animals.length);
   return animals[randomNum];
}

export function getFarewellText(language){
   const options = [
      `Farewell, ${language}`,
      `Adios ${language}`,
      `We'll miss you, ${language}`,
      `${language}, it's been real`,
      `${language} has left the building`
   ]
   const randomIndex = Math.floor(Math.random() * options.length);

   return options[randomIndex];
}



