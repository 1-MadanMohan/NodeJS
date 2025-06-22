//objects are dynamic in javascript, so we can add properties to them at any time

let employee = { id:1};
// employee.name = 'Mosh'//valid in js
let employee2:{ id:1, name:string} = { id: 1, name: 'Mosh'};
employee2.name = 'John'; //valid in ts

let employee3: { id: number, name: string, retire: () => void } = {
    id: 1,
    name: 'Mosh', 
    retire: () => {
        console.log('Employee retired');
    }
};



//type aliases
type Employeee = {
    id: number;
    name: string;
    retire: () => void;
};
let employee4: Employeee = {
    id: 1,
    name: 'Mosh',
    retire: () => {
        console.log('Employee retired');
    }
};


//union types
function kgToLbs(weight: number | string): number {

    //narrowing the type
    if (typeof weight === 'number') {
        return weight * 2.2;
    } else {
        return parseInt(weight) * 2.2;
    }
}
let weight1 = kgToLbs(10); // 22
let weight2 = kgToLbs('10kg'); // 22


//intersection types
type Draggable = {
    drag: () => void;
};
type Resizable = {
    resize: () => void;
};
type UIWidget = Draggable & Resizable;
let textBox: UIWidget = {
    drag: () => console.log('Dragging'),
    resize: () => console.log('Resizing')
};

//literal types
type Quantity = 50 | 100;
let quantity: Quantity = 100; // valid
// quantity = 150; // Error: Type '150' is not assignable to type 'Quantity'.  

// quantity = 50; // valid
// quantity = 100; // valid 

//nullable types
function greet(name: string | null) {
    if (name) {
        console.log('Hello ' + name.toUpperCase());
    } else {
        console.log('Hola');
    }
}
greet(null); // Output: Hola
// greet(undefined); 



//optional chaining
type Customer = {  
    birthday?: Date;
};
function getCustomer(id: number): Customer | null {
    // Simulating a customer lookup
    if (id === 1) {
        return { birthday: new Date('1990-01-01') };
    }
    return null;
}
function getCustomerBirthday(id: number): string {
    const customer = getCustomer(id);
    // Using optional chaining to safely access the birthday property
    return customer?.birthday?.toISOString() || 'Birthday not available';
}
console.log(getCustomerBirthday(1)); // Output: 1990-01-01T00:00:00.000Z
console.log(getCustomerBirthday(2)); // Output: Birthday not available
// console.log(getCustomerBirthday(null)); 
//optioal calling 
