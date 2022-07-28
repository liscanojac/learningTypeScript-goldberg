
// ARRAY AND FUNCTION TYPES

// CreateStrings type is a function that returns an array of string
type CreateStrings = () => string[];

// StringCreators type is an array of functions that each return a string
type StringCreators = (() => string)[];

// UNION TYPE ARRAYS
// you can use union types in arrays but you have to be careful with using the parenthesis correctly.

// this type refers to a variable that is either a string or an array of numbers
type StringOrArrayOfNumbers = string | number[];

// this type refers to an array of elements that are either a number or a string
type ArrayOfStringsOrNumbers = (string | number)[];

// MULTIDIMENSIONAL ARRAYS
// A 2D Array or an array of arrays will have two sets of "[]"

type ArrayOfNumbersArray = number[][];
// here you can see that setting the double "[]" it goes one level below
let arrayOfArrayOfNumbers: ArrayOfNumbersArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// a tidier way to represent this is with parentheses

type ArrayOfNumbersArray2 = (number[])[]
// so in the parenthesis you are stiting what is in the inner array
let arrayOfArrayOfNumbers2: ArrayOfNumbersArray2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

function withElements(elements: string[]) {
  console.log(elements[9001].length);
}

// withElements(['game', 'over']);
//the code gives no complaints because TS sees any array element member as a string, not as undefined
//although in runtime it will complain becuasue the element is undefined and should be a string

//TUPLES 
// although array types can have any size TS also have the feature to declare an array type pf a fixed size, known as a tuple

type YearAndNameTuple = [number, string];

let yearAndWarrior: YearAndNameTuple = [530, "Tommy"];

// let booleanAndWarrior: YearAndNameTuple = [false, "Tammy"];
// this one throws an error because we defined that the element at 0 should be a number instead of a boolean

// let justYear: YearAndNameTuple = [500];
// this one also throws an error because the array length doesnt match the type of the tuple

// TUPLE ASSIGNABILITY

// you have to remember that tuples are assignable in order 
// for instance lets declare this array

let pairLooseArray = [false, 123];
// the type of this array automatically is (boolean | number)[]

// let pairTupleArray: [boolean, number] = pairLooseArray;
// here you can see it throws an error, even though the array is declared with only one boolean and one number the type of it allows more or few elements into the array whistl the tuple doesnt
// type [boolean, number] !== type (boolean | number)[]


// TUPLES AS REST PARAMETERS
//tuples can be useful used alongside the spread operator ar function parameters because the have a fixed type and length

function logPair(name: string, value: number) {
  console.log(`${name} has ${value}`);
}

const pairArray = ["Amelia", 1];

// logPair(...pairArray);
// this throws an error because this spread operator should be a tuple

const pairTupleIncorrect: [number, string] = [2, "Gerald"];

// logPair(...pairTupleIncorrect);
// as you can see this one also throws an error because the order is important

const pairTupleCorrect: [string, number] = ["Kratos", 3];

logPair(...pairTupleCorrect);
// as you an see this one works correctly because the tuple follows the function params structure


// Remember with tuples you must use the spread operator

function logTrio(name: string, value: [number, boolean]) {
  console.log(`${name} has ${value[0]} & ${value[1]}`);
}

const trios: [string, [number, boolean]][] = [
  ["Amadeus", [1, true]],
  ["Bielefield", [2, false]],
  ["Anne", [3, false]]
];

trios.forEach(trio => logTrio(...trio));

// trios.forEach(logTrio);
// as you can see TS complaints because the innes array wasnt spread into the arguments of the function

// CONST OPERATOR DECLARING TUPLES

const unionArray = [1157, "Tomahawk"];
// Type: (string | number)[]
// this array although cant be redeclared, can be changed in lenght or any of its elements in value with array methods

// readonly array Type: [number, string]
const readonlyTuple = [1157, "Tomcat"] as const;
// the "as const" operator not only assigns a tuple Type: [number, string] but also now the variable is readonly, which means that any of its elements or lenght cant be modified

// remeber tuples cant be changed on length but their values can be mutated

const pairMutable: [number, string] = [1134, "Tomato"];

pairMutable[0] = 999;
// as you can see despite being a tuple you can still mutate the elements in it

// you should not use the tuple type assignment and the "as const" operator together, TS does the type assignment automatically when you use the "as const" operator

// const pairWithTupleAndConst: [number, string] = [1186, "Tarmak"] as const;
// this one throws an error, because when using the "as const operator you shouldnt assign any type to the array"

const pairConstAndUnmutable = [1234, "Truck"] as const;

// pairConstAndUnmutable[0] = 345;
// here you cant change the array values or lenght because is a readonly array

export {}