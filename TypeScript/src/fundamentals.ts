// let sales:number = 123456789;
// let course:string = "TypeScript Fundamentals";
// let is_published:boolean = true;



//Also below one is correct
let sales = 123456789;
let course = "TypeScript Fundamentals";
let is_published = true;


// "Any" type allows you to assign any value to a variable, but it is not recommended as it defeats the purpose of TypeScript's type safety.

// function render(document) {
//     console.log(document);
// }

//Error occurs if the tsconfig.json file is not set to "noImplicitAny": false

//else 
function render(document: any) {
    console.log(document);
}


//Arrays


let numbers: number[] = [1, 2, 3, 4, 5];
let numbers2  = [1, 3, '5'];


//tuples
let user:[number, string] = [1, "John"];
user.push(2); // This will not cause an error, but it's not type-safe
//Restrict the tuple to only two elements otherwise it is difficult to understand

//Enum
const small = 1;
const medium = 2;
const large = 3;

const enum Size { Small = 1, Medium , Large }
//vs // enum Size { Small = 1, Medium , Large 
let mySize: Size = Size.Medium;
console.log(mySize);


//functions
function calculateTax(income: number, taxYear: number) : number{
    if (taxYear  < 2025) {
        return income * 1.2;
    }

    return income * 1.3;
}

calculateTax(10000, 2024);//Typescript take care of no.of arguments passed to the function
//But in JavaScript, it will not throw an error if you pass more or less arguments than expected.