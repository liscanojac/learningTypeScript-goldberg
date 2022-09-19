// Interfaces are preferred for their more readable error messages, speedier compiler performance, and better interoperability with classes
// interfaces are speedier although are only for objects and classes

interface Poet {
  name: string;
}

interface Book {
  author?: string;
  pages: number;
}

const ok: Book = {
  author: "John Doe",
  pages: 140
};

const missing: Book = {
  pages: 321
}

// Readonly Properties 

interface Pages {
  readonly text: string;
}

type PagesType = {
  readonly text: string;
}

function showPages(pages: PagesType) {
  
  console.log(pages.text)
}

// FUNCTIONS AND METHODS

// you can declare property functions and methods in interfaces, lets declare one that has them both

interface HasBothFunctionTypes {
  property: () => string;
  method(): string;
}
//this is the syntax to declare property functions and/or methods in interfaces

const hasBoth: HasBothFunctionTypes = {
  property: () => "",
  method() {
    return "";
  },
}
// here we are testing the implementations of the interface in an object

// as anything else, they can be optional either property functions and methods

interface OptionalFunctionTypes {
  optionalProperty?: () => string;
  optionalMethod?(): string;
}

const hasBothOptional: OptionalFunctionTypes = {
  optionalProperty: () => "",
}
//and here we van skip declaring any of them, because they have the optional (?) operator 

// CALL SIGNATURES
// Interfaces can declare functions too, lets compare them to the function types
// in this case they are named call signatures

type FunctionAlias = (input: string) => number;

interface CallSignature {
  (input: string): number;
};

const typedFunctionAlias: FunctionAlias = (input) => input.length;

const typedCallSignature: CallSignature = (input) => input.length;

// So whats the point in using call signatures? Well, they can declare and read properties within a function

interface FunctionWithCount {
  count: number;
  (): void;
}

let hasCallCount: FunctionWithCount;

function keepTrackOfCalls() {
  keepTrackOfCalls.count += 1;
  console.log(`I've called this function ${keepTrackOfCalls.count} times!`);
}

keepTrackOfCalls.count = 0;

// here is the moment of truth, if we declared keepTrackOfCalls correctly we can make it equal to hasCallCount that is a variable declared with its interface and it shouldnt have any issues

hasCallCount = keepTrackOfCalls;
// and here you can see that it doesnt throw any errors 

// On the other hand, if we declare a fucntion but not its property within we will have an error:

function doesNotHaveCount() {
  console.log('I dont have a count property!');
}

// hasCallCount = doesNotHaveCount;
// and here it throws an error because it misses the count property
// so its type checking work properly

// INDEX SIGNATURES 
// When you have an object that's going to be filled with many props but you are not sure what props names are going to be but you know the type of that prop
// or you have an object with many props all the same type you can use this type of interface
// so you declare the key as the type of it because the key of an object will always be a string, and then declare its type

interface WordCounts {
  [i: string]: number;
};

// this is a good way to define an object where you dont know the name of the properties 

export {}