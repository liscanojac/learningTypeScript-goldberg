const firstName = "Georgia"

// const nameLenght = firstName.length()
// this line throws an error because lenght is not callable

const nameLenght = firstName.length

function sayMyName(firstName) {
  console.log(`You acting kind of shady, ain't callin' me ${firstName}`);
}

// sayMyName("Beyonce", "Knowles");
// this function call also throws an error because I'm passing it two arguments when it was defined with just one