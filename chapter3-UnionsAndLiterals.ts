let mathematician = Math.random() > 0.5
  ? undefined
  : "Mark Wahlberg"
// what type is mathematician? undefined or string? It's neither here where the union types come handy
// hovering over mathematician you will see the same union type of string | undefined
mathematician

let mathematician2: string | undefined = Math.random() > 0.5
  ? undefined
  : "Mark Ruffalo";

  // here we are literally stating that mathematician2 can be a string or undefined

  // Assignment Narrowing 

// NARROWING

let admiral: string | number;

admiral = "Grace Hopper";

admiral.toUpperCase()
// this one works with no issues because a string was assigned as its value

// admiral.toFixed()
// this one throws an error because toFixed() is an integer method and a string was assigned to the variable admiral

let inventor: number | string = "Heidy Klum";

inventor.toUpperCase();
// here again it works with no issues because the variable inventor when declared it was given a string value

// inventor.toFixed()
// this one here throws an error because the string was declared with an initial value that was a string

// CONDITIONAL CHECKS

let scientist = Math.random() > 0.5
  ? "Rosamund Pike"
  : 51;

if (scientist === "Rosamund Pike") {
  scientist.toUpperCase()
  // here this method works with no issues because the if above makes sure that scientist is a string
}

// scientist.toUpperCase()
// this one throws an error because the toUpperCase method doesnt exist for string and number types 
// and scientist here could be a string or a number

// TYPEOF CHECKS

let scientific = Math.random() > 0.5
  ? "Carey Mulligan"
  : 36;

if (typeof scientific === "string")  {
  scientific.toUpperCase()
  // here again this method works because the if above makes sure the type of scientific is string and the method is a string method
} else {
  scientific.toFixed()
  // here this one works because scientific can be either a string or a number and toFixed is a number method
}

// and the conditions work equallly with ternary operators

typeof scientific === "string"
  ? scientific.toUpperCase()
  : scientific.toFixed()
  // each of the ternary cases obey to the type method condition

// LITERAL TYPES

const philosopher = "Hypathia"
// what is the type of philosopher? you would say string, and yes its string but no any string is "Hypathia" this is a literal type because the primitive type of string represents all the possible string combinations whistl the literal type of "Hypathia" represents just that one string
// If you declare a const in TS and give a literal value, TS will take that as its literal value

// Union type annotations can mix literals and primitives 

let lifespan: number | "ongoing" | "uncertain";
// here as you can see lifespan can be any number or any of two literal string "ongoing" or "uncertain"

lifespan = 89;
lifespan = "ongoing";
// reassigning the variable with these values is not issue at all.

// lifespan = true;
// however this throws an error because the union type of the variable doesnt include true | boolean

// LITERAL ASSIGNABILITY

let specificallyAda: "Ada";
// here you are setting a literal type so this variable can only have one value assigned, "Ada"

specificallyAda = "Ada";

// specificallyAda = "Byron";
// as expected this throws an error because it doesnt match the type of the variable

let someString = ""
// the type of this variable is string

// specificallyAda = someString;
// this throws an error because the types do not match 

let someAdaString = "Ada";
// the type of this variable is also string

// specificallyAda = someAdaString;
// and as you can see TS takes it one step further, even though the value of someAdaString is "Ada" cant be assigned equal to specificallyAda because the types do not match "Ada" !== "string"

// STRICT NULL CHECKING

// const firstName3: string = null;
// as you can see TS is also strict checking strict values

// THRUTHINESS NARROWING

let genetist = Math.random() > 0.5
  ? "Barbara Palvin"
  : undefined;

if (genetist) {
  genetist.toUpperCase()
  // here as you can see if is not a falsey value (undefined) then it lets me use string methods because if is not a falsey then its a string
}

// genetist.toUpperCase();
// this one throws an error because genetist could be undefined and toUpperCase method wouldn't work with it

genetist && genetist.toUpperCase();
// this one works because it makes sure that is not a falsey with the && operator

genetist?.toUpperCase() 
// also works with the ? operator because this operator makes sure that is not a falsey



// VARIABLES WITHOUT INITIAL VALUE

let mathematician3: string;

// mathematician3?.length
// this one throws an error because any variable is undefined until a value is assigned so TS is not dummy asumming is not undefined

// but if you do assign a value to mathematician3 it works

mathematician3 = "Mark Menchen"

mathematician3.length
// and then the length prop works because is a string type and has a string assigned as its value


// how to workaround this?
// well you can define the variable type as string | undefined and the using the ? operator to determine if the variable is not falsey

let mathematician4: string | undefined;

mathematician4?.length
// here it works with no issues the length property because TS understand that the variable could be undefined on purpose

mathematician4 = "Marc Marquez"

mathematician4.length;


// TYPE ALIASES
// in TS you can define type Aliases where you can union multiple types

let rawData: boolean | number | string | null | undefined;
// how to avoid all this verbosity?

// lets define the type of data
// types are by convention in PascalCase

type RawData = boolean | number | string | null | undefined;

let rawData2: RawData;
// and now you can reuse type aliases

// type aliases are purely on the type system of TS so you can't console.log them, they dont exist in runtime

type someType = string | undefined;

// console.log(someType)
// here it throws an error

// COMBINING TYPE ALIASES

type Id = number | string;

type IdMaybe = Id | undefined | null;
// Equivalent to => number | string | undefined | null


