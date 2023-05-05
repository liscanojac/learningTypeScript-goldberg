
// here you can see an example of a class with and without a constructor
class Greeter {
  greet(name: string) {
    console.log(`${name}, do your stuff!`)
  }
}

new Greeter().greet('Juan');

class Greeted {
  constructor(message: string) {
    console.log(`As I always say: ${message}!`);
  }
}

new Greeted('take chances, make mistakes, get messy');

// CLASS PROPERTIES
// to read or write a property on a class in TS, they must be explicitly declared in the class

class FieldTrip {
  destination: string;

  constructor(destination: string) {

    this.destination = destination;
    console.log(`We are going to ${this.destination}!`);

    this.nonexistent = destination
    // this prop throws an error because it wasn't previously declared in the class
  }
}

const trip = new FieldTrip('planetarium');

trip.destination;
// TS lets you use the constructor but it doesnt declare the nonexistent prop 

// trip.nonexistent;
// this one throws an error, although here we are allowed to make and use the constructor, the inner error would punish us in runtime errors

class FieldTripFixed {
  destination: string;
  existent: string;

  constructor(destination: string) {
    this.destination = destination;
    console.log(`We are going to ${this.destination}!`);

    this.existent = destination;
    // here it works with no issues because it was a prop previously declared
  }
}

// FUNCTION PROPERTIES 

// Methods
// In JS and TS when you build a class the method approach assings the function to the class prototype, so all class instances use the same function definition

class WithMethod {
  myMethod() {}
}

new WithMethod().myMethod === new WithMethod().myMethod // true
// because both instances of the class WithMethod are using the same function definition of myMethod, because the mthod belongs to the class prototype

// Function Properties
// when you use a property that is equal to an arrow function this creates a new function per instance of the class, this differetiation can be useful with some usage of the this statement.
// Although we have to take into accoutn that with function properties the higher memory consumption

class WithProperty {
  myProperty: () => {}
}

new WithProperty().myProperty === new WithProperty().myProperty // false
// because both interfaces have its own unique function property definition

// INITIALIZATION CHECKING
// TS will check that each property declared whose type doesnt include undefined is assgned a value in the constructor 
// The following class WithValue doesnt assign a value to its unused property, which TS recognises as a type error

class WithValue {
  immediate = 0; // OK -- immediate is already initialised
  later: number; // OK (set in the constructor)
  mayBeUndefined: number | undefined; // OK (allowed to be undefined)
  unused: number; // Error: property unused has no initializer. And is not definitely assigned in the constructor

  constructor() {
    this.later = 1;
  }
}

new WithValue().unused.toString() // In compiling time, this throws an error

// readonly properties

class Quote {
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  emphasize() {
    this.text += '!';
  } // this prototype method throws an error because the text property is defined as a readonly property
}

const quote = new Quote('This is brilliant')

quote.emphasize();

quote.text = "Ha!" // this also throws an error because of the readonly keyword

class RandomQuotes {
  readonly explicit: string = 'Home is the nicest word there is.';
  // in this property definition we are defining that it could be any string in its type 
  readonly implicit = 'Home is the nicest word there is.';
  // although thsi property TS also takes it as string but only admits it as a the literal string that is defined with

  constructor () {
    if (Math.random() > 0.5) {
      this.explicit = 'We start learning the minute we are born.';
      // as you can see TS doesnt throw an error at us because we widened the prop as to be a string
      this.implicit = 'We start learning the minute we are born.'
      // as you can see, TS only admits here the implicit property to be only the string that is defined with 
    }
  }
}

const quoteRandom = new RandomQuotes();

quoteRandom.explicit; // Type: string
quoteRandom.implicit; // Type: 'Home is the nicest word there is.'

// CLASSES AS TYPES
// in TS you can define variable types with classes

class Teacher {
  sayHello() {
    console.log("Take chances, make mistakes, get messy!");
  }
}

let teacher: Teacher; // here we define the variable type of teacher with the class Teacher

teacher = new Teacher(); // Ok

teacher = 'Wohooo' // Here throws an error because its violation the type we defined the variable with

// Also you can add class as types into functions and have the type-checking safety

class SchoolBus {
  getAbilities() {
    return ['magic', 'shapeshifting'];
  }
};

// here we use class as a type, to define a variable in this function
function withSchoolBus(bus: SchoolBus) {
  console.log(bus.getAbilities());
}

withSchoolBus(new SchoolBus()); // and here the function works because you are passing to it a class from the SchoolBus constructor

// although you have to think about the class as an object, so if you pass to the function withSchoolBus an object with the method getAbilities and that method returns an Array<string> TS will admit it

withSchoolBus({
  getAbilities: () => ['transmogrification'],
  // and as you can see, it works with this object that has a getAbilities method instead of a class that has the sema method as a prototype method
})

withSchoolBus({
  getAbilities: () => 123,
  // However here it throws an error because the class as a type was declared with a method getAbilities that returns an Array<string>
})

// CLASSES AND INTERFACES
// this is how to declare the type of a class using an interface through the implements keyword

interface Learner {
  name: string;
  study(hours: number): void;
};

class Student implements Learner {
  name: string;
  // although you have implemented the interface or the type into this class, this is just for type checking purposes
  // you still got to declare the variables and their types as showed here
  constructor(name: string) {
    this.name = name;
  }

  study(hours: number): void {
    for (let i = 0; i < hours; i += 1) {
      console.log('...studying...');
    }
  }
}

class Student2 implements Learner {
  // as you can see here without its neccesary property initialization TS witll throw you errors because the interface implementation does not make you skip that part
  constructor(name: string) {
    this.name = name;
  }

  study(hours: number): void {
    console.log(`${this.name} studied ${hours} hours`);
  }
}

class Slacker implements Learner {
  name = 'Rocky';
  study(hours: number): void {
    console.log(this.name + 'studies this amount of ' + hours + ' hours');
  }
}

class Slacker2 implements Learner {
  name = 'Rocko';
  // although having the name already initialazed its missing the study method
}

class Student3 implements Learner {
  name;
  study(hours) {

  }
  // although implementing an interface into a class we should declare the class properties properly otherwise you could get away with it declaring inconrrectly some classes
}

const student3 = new Student3();

// IMPLEMENTING MULTIPLE INTERFACES

interface Graded {
  grades: Array<number>;
}

interface Reporter {
  report: () => string;
}

class ReportCard implements Graded, Reporter {
  grades: number[];

  constructor (grades: Array<number>) {
    this.grades = grades;
  }

  report() {
    return this.grades.join('');
  };
  // here as you cann see you are implementing multiple interfaces to the same class
}

// EXTENDING A CLASS

class Teacher2 {
  teach() {
    console.log('The surest test of discipline is its absence');
  }
}

class StudentTeacher extends Teacher2 {
  learn() {
    console.log('I cannot afford the luxury of a closed mind');
  }
}

const teacher2 = new StudentTeacher();

teacher2.teach(); // Ok
teacher2.learn(); // Ok

teacher2.haveAHobby() // throws an error because not only on its class neither in its extended inherited class haveAHobby method is defined

// EXTENSION ASSIGNABILITY

class Lesson {
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson extends Lesson {
  url: string;

  constructor(subject: string, url: string) {
    super(subject);
    this.url = url;
  }
}

let lesson: Lesson;
lesson = new Lesson("coding"); // this works just fine, with the type declaration because its using the class straight away

lesson = new OnlineLesson("coding", "oreilly.com"); // this also works fine because OnlineLesson its a class that inherits from Lesson

// Although the inheritance doesnt work downwards as you can see here
let onlineLesson: OnlineLesson;
onlineLesson = new OnlineLesson("coding", "oreilly.com"); // Ok

onlineLesson = new Lesson("coding"); // Here it throws an error because OnlineLesson inherits from Lesson and inheritance doesnt work downwards

// Although when all the props in your extended class are optional you can use the inherited class even when declared the type of the subclass, here's an example:

class PastGrades {
  grades: Array<number> = [];
}

class LabeledPastGrades extends PastGrades {
  label?: string;
}

let subclass: LabeledPastGrades;

subclass = new LabeledPastGrades(); // Ok, the class matches the declared type

subclass = new PastGrades(); // Ok, as LabeledPastGrades has all properties as optional PastGrades matches all its properties and it doesnt throws an error

// OVERRIDING CONSTRUCTORS

class GradeAnnouncer {
  message: string;

  constructor(grade: number) {
    this.message = grade <= 65 ? "Maybe next time." : "You pass!";
  }
}

class PassingAnnouncer extends GradeAnnouncer {
  constructor() {
    super(100);
    // Even if the new class doesnt need a constructor, when you are extending it to another that it does, you need to call the constructor with the super in it
  }
}

class FailingAnnouncer extends GradeAnnouncer {
  constructor() {}
  // Here you can see that TS is asking you for a super call
}

class AssistantAnnouncer extends GradeAnnouncer {
  constructor(grade: number) {
    super(grade);
  }
}

class AssistantToTheRegionalCaller extends AssistantAnnouncer {
  constructor() {
    super()
    // Here its throws an error again because even though we called the super, we did not pass the correct number of arguments 
  }
}

// What about the super but without a constructor in the base class?

class GradesTally {
  grades: Array<number> = [];
  addGrades(grades: Array<number>) {
    this.grades.push(...grades);
    return this.grades.length;
  }
}

class ContinuedGradesTally extends GradesTally {
  constructor(previousGrades: Array<number>) {
    this.grades =[...previousGrades];
    // as you can see even though GradesTally doesnt have a constructor it still requires a super to pass argument into its properties
  }
}

class ContinuedGradesTallyFixed extends GradesTally {

  constructor(previousGrades: Array<number>) {
    super()
    this.grades = previousGrades;
    // Here is the same stuff, but with the super, even though there is not constructor in GradesTally to access the propeties in GradesTally in this extended class you need to call the super  
  }
}

// Overridden Methods

// you can declare methods in extended classes with the same names as the base classes as long as the types of the inherited methods match the types of the extended ones

class GradeCounter {
  countGrades(grades: Array<string>, letter: string) {
    return grades.filter(grade => grade === letter).length;
  }
}

class FailureCounter extends GradeCounter {
  countGrades(grades: string[]): number {
    return grades.filter(grade => grade === "F").length;
  }
  // here you can use it without the super because you arent accesing a super property
}

class SuperFailureCounter extends GradeCounter {
  countGrades(grades: string[]): number {
    return super.countGrades(grades, "F");
    // here we are using the super with the method to access it more straightforward
  }
}


// OVERRRIDEN PROPERTIES

class Assignment {
  grade: number;
}

let assignment = new Assignment();
assignment.grade = 5;
// as you can see here, you can declare the property of a class without a conbstructor and then in a variable declared by its class you can give value

class Assignment2 {
  grade?: number;
}

class GradedAssignment extends Assignment2 {
  grade: number;
  // here this grade is overwriting the grade from Assignment2

  constructor(grade: number) {
    super();
    // even though we are not passing data to the Assignment2 class we need to call super to extend the class
    // this super call has to be made here on top of the red of variables
    
    this.grade = grade;
  }
}

// Although you have to mind the union types because in the example above grade coming from assignment is type number | undefined

class NumericGrade {
  grade: number;
}

class VagueGrade extends NumericGrade {
  grade = Math.random() > 0.5 ? 1 : '0'
  // here it throws an error because the NumericGrade class has a property grade declared as type number
}

class NumericGradeAssignment extends NumericGrade {
  grade: number;

  constructor(grade: number | string) {
    super();
    // if you comment the line below everything works great in this class because the super works fine without any argument due to NumericGrade not having a constructor with it

    this.grade = grade;
    // Athough this line throws an error, because the grade property is declared as a number
  }
}

class NumericGrade2 {
  grade = 0;
  // here we are not only declaring the type of this property but also its value;
}

class VagueGrade2 extends NumericGrade2 {
  // but as you can see in this extended class, you can change the value of the property, although not its type
  grade = Math.random() > 0.5 ? 1 : 2;
}

class VagueGrade3 extends NumericGrade2 {
  grade = Math.random() > 0.5 ? 1 : '2'
  // here it throws again an error because as said, you can change the value of a property in an extended type, but not its type
}

// ABSTRACT CLASSES
// an bastract class is a class that expects the declaration of some methods by a subclass

abstract class School {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  // you have to use the keyword in the method to let TS know that this method will be declared in an extended class
  abstract getStudentTypes(): Array<string>
}

class School2 {
  readonly name: string

  constructor(name: string) {
    this.name = name;
  }

  // and as you can see an abstract method can only exist within an abstract class
  abstract getStudentTypes(): Array<string>
}

class Preschool extends School {
  getStudentTypes(): string[] {
    return ['preschooler'];
  }
}
// as you can see here in Preschool the getStudentTypes method is defined 

class Absence extends School {

  constructor(name: string) {
    super(name);
  }
  // here you can see the class Absence is throwing an error because althoug the constructor is well implemented, its missing the getStudentTypes method definition
}

// An abstract class cant be instantiated directly, only concrete classes can

let school: School;

school = new School('School name');

let preschool: School;

preschool = new Preschool('Sunny Daycare');

preschool.name; // Sunny Daycare
// Because if you dont overwrite the constructor in the extended class, it will use the constructor from the class above 

// Also you can extend a class where all its properties or methods are optional so you can instantiate the base class or the subclass even when you declared a type as the subclass
// you can see an example of that below

class PastGrades2 {
  grades: Array<number> = [];
}

class LabeledPastGrades2 extends PastGrades2 {
  label?: string;
}

let subClass: LabeledPastGrades2;

subClass = new LabeledPastGrades2(); // Ok

subClass = new PastGrades2(); // here as you can see I declared subClass type as LabeledPastGrades2 I can instantiate it as PastGrades2 because on the subclass all the property and/or methods are declared as optional (label)

// OVERRIDEN CONSTRUCTORS
// like in JS in TS, in TS subclasses are not required define their own constructor. Subclasses without their own constructor they will use the constructor from their base class (it doesnt matter the level of inheritance to the subclass it will look for the base and get the constructor from there)

class GradeAnnouncer2 {
  message: string;

  constructor(grade: number) {
    this.message = grade >= 65 ? "You pass!" : "Maybe next time."
  }
}

class PassingAnnouncer2 extends GradeAnnouncer2 {
  constructor() {
    super(100);
  }
}

class FailingAnnouncer2 extends GradeAnnouncer2 {
  constructor() {}
  // as you can see as you override the constructor in a subclass, is expecting the super keyword with the number of argumets the constructor in the base class demands
}

// JS and TS rules define that any subclass must call the base constructor through super before accessing any property using the this keyword. And the same rule applies in TS

class GradesTally2 {
  grades: Array<number>;

  addGrades(grades: Array<number>) {
    this.grades.push(...grades);
    // if you use push with the spread operator, it will push the vales to the base array and the whole array

    return this.grades.length;
  }
}

class ContinuedGradesTally2 extends GradesTally2 {
  constructor(previousGrades: Array<number>) {
    this.grades = [...previousGrades];
    //here you can see the error we are describing above

    super();
    console.log(`Starting with length ${this.grades}`)
  }
}

// OVERRRIDEN METHODS
// Subclasses may redeclare new methods with the same name as the base class, as long as the method on the subclass mathches the types of the method in the base

class GradeCounter2 {
  countGrades(grades: Array<string>, gradeToCount: string) {
    return grades.filter(grade => grade === gradeToCount).length;
  }
}

class FailureCounter2 extends GradeCounter2 {
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F");
    // Here it works ok, because its a method that returns a number, just like its base method
  }
}

class AnyFailureChecker extends GradeCounter2 {
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F") !== 0;
    // as you can see here is throwing an error because the method cant be redeclared to return a boolean
  }
}

// MEMBER VISIBILITY

// public (default) -- allowed to be accessed by anybody, anywhere
// protected -- allowed to be accessed by the class itself and its subclasses
// private -- allowed to be accessed only by the class itself

class Base {
  isPublicImplicit = 0;
  public isPublicExplicit = 1;
  protected isProtected = 2;
  private isPrivate = 3;
  #truePrivate = 4;
}

// DIFFERENCES BETWEEN PRIVATE AND TRUE PRIVATE
// the difference is that private exists only in TS type system but it doesnt in runtime, so a private property and a public one will compile the same
// But with # these field are truly private in the type system in run time and compiled.

class SubClass extends Base {
  examples() {
    this.isPublicImplicit; // Ok
    this.isPublicExplicit; // Ok
    this.isProtected; // Ok
    this.isPrivate; // Error
    this.truePrivate; // Error
  }
}

new SubClass().isPublicImplicit; // Ok
new SubClass().isPublicExplicit; // Ok
new SubClass().isProtected; // Error
new SubClass().isPrivate; // Error
new SubClass().truePrivate; // Error


// readonly always comes after the visibility

class TwoKeywords {
  private readonly name: string;

  constructor() {
    this.name = 'Anne Sullivan';
  }

  log() {
    console.log(this.name);
  }
}

const two = new TwoKeywords();

two.name; // Error

two.log(); // Anne Sullivan

class Question {
  static answer: "bash";
}

const question = new Question()
question.bash = 'test'
// class ExtendedQustion extends Question {
//   protected answer: "bash" = 'bash'; 
// }