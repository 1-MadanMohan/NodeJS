"use strict";
function kgToLbs(weight) {
    if (typeof weight === 'number') {
        return weight * 2.2;
    }
    else {
        return parseInt(weight) * 2.2;
    }
}
let weight1 = kgToLbs(10);
let weight2 = kgToLbs('10kg');
//# sourceMappingURL=objects.js.map