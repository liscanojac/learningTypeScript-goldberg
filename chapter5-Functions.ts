function sing(song) {
  console.log(`Singing: ${song}`);
};
// here is the problem with JS, thst we aren't sure what to expect from this function, is expection a string as a parameter, a number or is it an object?

function sing2(song: string) {
  console.log(`Singing: ${song}`);
};

// REQUIRED PARAMETERS
// Unlike JS, TS is very strict in the numers of paramas you can pass through a function. No more no less than the number of params the function was declared with

function sing3(first: string, second: string) {
  console.log(`${first} / ${second}`);
};

// sing3("Balls and Chains");
// this one throws an error because you are passing less parameters than expected

sing3("I will survive", "HigherLove");
// this one works alright because it expects twi arguments, both of them, strings


// sing3("I will survive", "HigherLove", "Dreams");
// this one also throws an error because you are passing more arguments (3) than expected (2)

// OPTIONAL PARAMETERS
// Despite Ts enforcing to obey the number of params we have to pass and the type of them, we can still pass them optional parameters that can be the valuye we pass, or undefined

function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

// So we pass to this function one or two params and it would work fine
// these three calls of the function work just fine

announceSong("Greensleeves");

announceSong("Greensleeves", undefined);

announceSong("Greensleeves", "Sia");

// NOTE: If you are going to define any optinal params the have to be defined as the last parameters, otherwise this will throw an error:

// function announceSong2(song?: string, singer: string) {
//   console.log(`Song: ${song}`);

//   if (singer) {
//     console.log(`Singer: ${singer}`);
//   }
// }
// this function throws an error becuse a parameter cant be preceded from an optional param

// DEFAULT PARAMETERS

function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars`);
}

rateSong("Photograph");
// Photograph gets 0/5 starts
rateSong("Set Fire to the Rain", 5);
// Set Fire to the Rain gets 5/5 stars
rateSong("Fire", undefined);
// this works ok because rateSong is expecting rating to be a number or undefined
// Fire gets 0/5 stars

// REST PARAMETERS 
// JS allows to defined functions to be called with any number of arguments using the spread operator
// In TS we can use the spread operator on the last argument and have to indicate that is an array

function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

// Remember that using the spread operator allows us to also not pass the second argument so TS and JS assume it as an empty array 

singAllTheSongs("Alicia Keys");
// as you can see this works ok even though I didnt pass anything to the spread operator argument

singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face")
// this one works fine because it transforms all the arguments from the second one on array entries

// singAllTheSongs("Ella Fitzgerald", 2000);
// as you can see this throws an error because TS is expection strings as its second argument and onwards

// RETURN TYPES

function numberOfSongs(songs: string[]) {

  return songs.length;
}

// FUNCTION TYPES

// this function type describes a function with no parameters that returns a string value
let nothingInGivesString: () => string;

// and we can be more descriptive on the function types 
let inputAndOutput: (songs: string[], count?: number) => number;

// One of the most usefun things about function types is when a function is the argument of another function, so whe have to declare its type

const songs = ["Juice", "Shake it Off", "What's Up"];

function runOnSongs(getSongAt: (index: number) => string) {
  // here this function is declared to be passed an argument that is 
  // a function that receives a number and returns a string

  for (let i = 0; i < songs.length; i++) {
    // and here we are using the argument function, passing through it, a number
    console.log(getSongAt(i))
  }
}

function getSongAt(index: number) {
  return `${songs[index]}`;
}

runOnSongs(getSongAt);
// here it works ok because it ticks all the boxes on the argument definitions

function logSongs(song: string) {
  return `${song}`;
}

// runOnSongs(logSongs);
// as you can see it throws an error because the argument thet runOnSongs expects is a function that expects a number and returns a string
// whereas logSongs expects a string as argument

// FUNCTION TYPE PARENTHESIS

let returnsStringOrUndefined: () => string | undefined;
// this type is a function the returns string or undefined and not receives any argument

let maybeReturnsAString: (() => string) | undefined;
// this type refers to a variable that is either undefined or a function that returns a string

// FUNCTION TYPE ALIASES 

type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;

stringToNumber = (input) => input.length;

// stringToNumber = (input) => input.toUpperCase;
// this one would throw an error because the returned type is not a number

type NumberToString = (input: number) => string;

function usesNumberToString(numberToString: NumberToString) {
  console.log(`The string is: ${numberToString(1234)}`)
}

usesNumberToString((input) => `${input}!`)
// here its ok, because usesNumberToString is recibing a fucntion that returns a string

// usesNumberToString((input) => input * 2)
// this one throws an error, because as the function type is defined it shouls get a number and return a number, but it is getting that number and returning a number


// VOID RETURN TYPES
// void type returns are when no return is typed or only the return keyword

function logSong(song: string | undefined): void {

  if (!song) {
    return;
  }
  console.log(`${song}`);
}
// as you can see this function works ok with TS because the only the return keyword or the absence of a return is a void type

// Distinction of void and undefined

let songLogger: (song: string) => undefined;

// songLogger = (song) => console.log(`${song}`);
// here you can see that type void is not the same as undefined

// NEVER RETURNS 
// when a function purpose is to throw an error its return type is never in TS

function reportFailure(message: string): never {
  throw new Error(`Failure type: ${message}`);
}

// FUNCTION OVERLOADS

function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;

function createDate(monthOrTimestamp: number, day?: number, year?: number) {

  if (!day || !year) {
    return new Date(monthOrTimestamp)
  }
  return new Date(year, monthOrTimestamp, day);
}
// so this function is meant to return a Date in both cases but is meant to be called either with a timestamp or with three arguments, a month and a day

createDate(5534658); // works ok

createDate(12, 7, 1987); // works ok

// createDate(23, 2);
// throws an error because expects either 3 arguments or 1

// Doing the same function as above
type CreateDateWithTimestamp = (timestamp: number) => Date;
type CreateDate = (month: number, day: number, year: number) => Date;

const createDate2: CreateDate & CreateDateWithTimestamp = 
  // the & type intersection is the one that makes the function work either way
  (monthOrTimeStamp: number, day?: number, year?: number): Date => {
    if (!day || !year) {
      return new Date(monthOrTimeStamp);
    }
    return new Date(year, monthOrTimeStamp, day);
}

createDate2(5534658);

createDate2(12, 7, 1987);

// createDate2(23, 24);
// throws an error

// WARNING remember that function overloads should be used as last resort to describe funcions. It's better to keep functions as simple as possible

// this is to avoid collision of variable names in other files, the export force it to be a module and now you dont have to worry about tyhe same variable names in other files
export {};