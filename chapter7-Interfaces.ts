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

// this is a good way to define an object where you dont know the name of the properties but its type

const counts: WordCounts = {};

counts.apple = 2;
counts.bananas = 1;

// counts.cherry = false;
// and logically this throws an error, because the type boolean is not assignable to type number

// although that use this very carefully because is not 100% type safe 
// Lets see an example of this

interface DatesByName {
  [i: string]: Date;
};

const publishDates: DatesByName = {
  Frankenstein: new Date("1 January 1818")
};
// so, we declared this object pusblishDates by the interface DatesByName and a prop Frankenstein that indeed its a Date
// so, there is not issues on reading that property or apply Date methods to it, like toString()

publishDates.Frankenstein;
// no issues here
publishDates.Frankenstein.toString();
// no issues here either

// here comes the trouble
publishDates.Beloved;
// this prop Beloved has a defined type, Date, but a runtime value of undefined!!!
// and this not all
// because it has a type of Date, you can apply mehods to it! which are going to lead to runtime errors that TS is not catching by type checking

publishDates.Beloved.toString();
// this line will throw an error, because you cant apply toString to undefined

// MIXING PROPERTIES AND INDEX SIGNATURES
// you can declare named properties and catchall props 
// Here, HistoricalNovels declares that all properties are type number and additionally the Oroonoko property must exist

interface HistoricalNovels {
  Oroonoko: number;
  [i: string]: number
};

// and now you can declare an object with properties of any name as long they are equal to a number but you have to make sure that Oroonoko exists as a prop and its equal to a number

const novels: HistoricalNovels = {
  Outlander: 1991,
  Oroonoko: 1688
}

// const missingOroonoko: HistoricalNovels = {
//   Outlander: 1991
// }
// this variable throws an error because it is missing a required property (Oroonoko)

// One more trick is to be even more specific about properties in interfaces
// Here, ChapterStarts has a property perface that not only must exists but also has to be equal to 0

interface ChapterStarts {
  preface: 0;
  [i: string]: number
}

// as a result everytime you use the ChapterStarts interface to declare an object with, that object must have a property 'preface' and it has to be equal to 0

const correctPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5
}

// const wrongPreface: ChapterStarts = {
//   preface: 1,
//   test: 2
// }
// and here you can see no matter if you declare 'preface' that prop has to be equal to 0 and it equally thows an error if that prop is not even declared

// NUMERIC INDEX SIGNATURES
// Despite JS implicitly converts object properties lookup keys to strings, its is sometimes desirable to only allow numbers as keys for an object

interface MoreNarrowNumbers {
  [i: number]: string;
  [i: string]: string | undefined;
};

const mixesNumbersAndString: MoreNarrowNumbers = {
  0: '',
  key1: '',
  key2: undefined
}
// All good so far

mixesNumbersAndString[1] = ''
// also you can declare props with numeric keys like this 

// NESTED INTERFACES
// Just like objects you can nest properties and interfaces 

interface Novel {
  author: {
    name: string;
  };
  setting: Setting
}
// here you can see an interface is nested inside another interface

interface Setting {
  place: string;
  year: number;
}

// INTERFACE EXTENSIONS
// sometimes, nto not be so repetitive with interfaces you can extend one interface with another so setting a 'base interface' that  just get added more propeties

interface Writing {
  title: string;
}

interface Novella extends Writing {
  pages: number;
}

// so myNovella will need pages prop that comes from Novella, its own interface and title prop that comes from Writing, the interface that Novella extends to
let myNovella: Novella = {
  pages: 195,
  title: 'Ethan Frome',
}

// as any interface this will throw an error with either a missing property or an extra property 

// let missingProperty: Novella = {
//   title: 'The Awakening'
// }
// and this one throws an error because it misses the property pages

// let extraProperties: Novella = {
//   pages: 12,
//   title: 'testNovella',
//   extra: false
// }
// this one throws an error because prop extra is not declared either in Novella or Writing interface

// EXTENDS TO MULTIPLE INTERFACES
// TS allows to to extend an interface to multiple ones

interface GivesNumber {
  giveNumber(): number;
}

interface GivesString {
  giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
  giveEither(): number | string;
}

// INTERFACE MERGING
// one of the most powerful features about interfaces is their ability to be merged. If two interfaces on the same scope are declared with the same name they'll join into a bigger interface with all the declared fields

interface Merged {
  fromFirst: string;
}

interface Merged {
  fromSecond: number;
}

//this is equivalent to
interface NotMerged {
  fromFirst: string;
  fromSecond: number;
}

// Interface merging is not a feature used very often in day-to-day TS development. It's even recommended to avoid it when possible to not have interfaces declared many times throughout the code 
// Types are not able to merge, so if the goal is to avoid it at all costs, just use types

export {}