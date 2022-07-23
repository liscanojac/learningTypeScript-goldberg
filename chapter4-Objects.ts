
const poet  = {
  name: "Mary Oliver",
  born: 1935
}

console.log(poet['name']);
console.log(poet.name);

let poet2: {
  born: number,
  name: string
};

poet2 = {
  born: 1993,
  name: "Mary Lamond"
};

// ALIASED OBJECT TYPES

type Poet = {
  born: number,
  name: string
}

let poet3: Poet;

poet3 = {
  born: 1867,
  name: "Sarah Michelle Gellar"
}

// STRUCTURAL TYPING
// you can have different structure types on the same object as following:

type ObjectWithFirstName = {
  firstName: string;
};

type ObjectWithLastName = {
  lastName: string;
};

const person = {
  firstName: "Louis",
  lastName: "Armstrong"
};

let withFirstName: ObjectWithFirstName = person;
let withLastName: ObjectWithLastName = person;

withFirstName;
withLastName;
// here as you can see both objects are equal but withFirstName only suggest firstName prop and withLastName only suggest lastName prop


// USAGE CHECKING
// when you declare a type and assign that type to an object the object expects to have the required properties

type FirstAndLastNames = {
  first: string;
  last: string;
};

const hasBoth: FirstAndLastNames = {
  first: "Kaworu",
  last: "Nagisa"
}

// const hasOnlyOne: FirstAndLastNames = {
//   first: "Rei"
// }
// this object throws an error because misses the 'last' prop

// EXCESS PROPERTY CHECKING
// if you declare an object with a type TS also complaisn if that object has more properties that expected

type Poet2 = {
  name: string;
  born: number;
};

const poetMatch: Poet2 = {
  name: "Maya Angelou",
  born: 1945
}

// const poetWithExtraProperty: Poet2 = {
//   activity: "Walking",
//   name: "Mary Oliver",
//   born: 1928
// }
// here TS complaints because activity is not defined in the object type 

//  NESTED OBJECT TYPES

type Poem = {
  author: {
    firstName: string;
    lastName: string;
  };
  name: string;
}

const poem: Poem = {
  author: {
    firstName: "Sylvia",
    lastName: "Plath"
  },
  name: "Tulips"
};

// a better way for the type Poem is to have also the type Author so we have one type per object

type Author = {
  firstName: string;
  lastName: string;
}

type BetterPoem = {
  author: Author;
  name: string;
};


// OPTIONAL PROPERTIES

type Book = {
  author?: string;
  pages: number;
};

// UNION OF OBJECT TYPES

const poem2 = Math.random() > 0.5
  ? {
    name: "The Double Image",
    pages: 7
  }
  : {
    name: "Her Kid",
    rhymes: true
  };

// TS will assign this type to the poem2 object like the following:

type InferredType = {
  name: string;
  pages: number;
  rhymes?: boolean;
} | {
  name: string;
  pages?: number;
  rhymes: boolean;
}
// if you hover over poem2 you will see that the type assigned is the same as InferredType
// here you can see if I assign it to the same variable it works with zero issues

const poem3: InferredType = Math.random() > 0.5
  ? {
    name: "The Double Image",
    pages: 7
  }
  : {
    name: "Her Kid",
    rhymes: true
  };
// EXPLICIT OBJECT-TYPE UNIONS
// TS allows you giving you control over object types 

type PoemWithPages = {
  name: string;
  pages: number;
};
type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
};

type Poem2 = PoemWithPages | PoemWithRhymes;

const poem4: Poem2 = Math.random() > 0.5
  ? {
    name: "The Double Image",
    pages: 7
  } : {
    name: "Her Kind",
    rhymes: true
  };

if ("pages" in poem4) {
  poem4.pages;
} else {
  poem4.rhymes;
}
// as you can see TS is smart enough to know what Type side props have

// INTERSECTION TYPES
// & operator intersection type

type Artwork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: number;
  name: string;
};

type WrittenArt = Artwork & Writing;
// This is equivalent to:
// {
//   genre: string;
//   name: string;
//   pages: number;
// }

// INTERSECTION TYPES CAN BE COMBINED

type ShortPoem = { author: string; } & (
  {
    kigo: string;
    type: "haiku";
  }
  | {
    meter: number;
    type: "villanelle";
  }
)
// as you can see you can combine operators of intersection types

const morningGlory: ShortPoem = {
  author: "Fukuda",
  kigo: "Morning Glory",
  type: "haiku"
  // you can see the types event are suggested by the snippets
}

// const oneArt: ShortPoem = {
//   author: "Elizabeth Bishop",
//   type: "villanelle"
// }
// as you can see this one throws an error, because it misses the prop 'meter'

// this is to avoid collision of variable names in other files, the export force it to be a module and now you dont have to worry about tyhe same variable names in other files
export {};