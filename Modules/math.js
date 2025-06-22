// // Function definitions
// const add = (a, b) => {
//   return a + b;
// }

// const subtract = (a, b) => { 
//   return a - b;
// }

// const multiply = (a, b) => {
//   return a * b;
// }

// const divide = (a, b) => {
//   if (b === 0) {
//     throw new Error("Cannot divide by zero");
//   }
//   return a / b;
// }

// // Exporting all functions together
// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide
// };


// or

exports.add = (a, b) => {
  return a + b;
}   
exports.subtract = (a, b) => {
  return a - b;
}
exports.multiply = (a, b) => {
  return a * b;
}
exports.divide = (a, b) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}





















// const add = (a, b) => {
//   return a + b;
// }

// module.exports = add; // module.exports is the object that is actually returned as the module

// //or 

// // exports.add = add; // this is the same as module.exports but you can add more functions to the same object

// const subtract = (a, b) => { 
//   return a - b;
// }

// module.exports = subtract; // you can add more functions to the same object by using module.exports

// const multiply = (a, b) => {
//   return a * b;
// }

// module.exports = multiply;
// // const divide = (a, b) => {
// //   if (b === 0) {
// //     throw new Error("Cannot divide by zero");
// //   }
// //   return a / b;
// // }
// // module.exports = {
// //     M:multiply,
// //     D: divide, 
// // }

