"use strict";
let sales = 123456789;
let course = "TypeScript Fundamentals";
let is_published = true;
function render(document) {
    console.log(document);
}
let numbers = [1, 2, 3, 4, 5];
let numbers2 = [1, 3, '5'];
let user = [1, "John"];
user.push(2);
const small = 1;
const medium = 2;
const large = 3;
let mySize = 2;
console.log(mySize);
function calculateTax(income, taxYear) {
    if (taxYear < 2025) {
        return income * 1.2;
    }
    return income * 1.3;
}
calculateTax(10000, 2024);
//# sourceMappingURL=fundamentals.js.map