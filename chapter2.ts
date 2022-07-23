let singer = "Aretha";

let bestSong = Math.random() > 0.5
  ? "Chain of Fools"
  : "Respect";
  // both variables are type string

  // Assignability: TS reads the first vale to determine the type of a variable if that variable is reassigned then it will check if the new vale is the same type as the first value

  let firstName1 = "Joan";
  firstName1 = "Carole";
  // No issues here the variable is reassigned from a string to another string

// let lastName1 = "King";
// lastName1 = true
// here this code will fail because we are reassigning different types from a string in its declaration to a boolean

let firstName2: string = "Tina"
// this is redudant and doesnt add anything to the code because firstName1 is also declared with the type string

let cher = {
  firstName: "Cherilyn",
  lastName: "Sarkisian"
}

// cher.middleName; 
// TS will complain here because middleName prop in cher doesnt exist