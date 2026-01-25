// Basic Math Operations in JavaScript

// Addition
function add(a, b) {
    return a + b;
}

// Subtraction
function subtract(a, b) {
    return a - b;
}

// Multiplication
function multiply(a, b) {
    return a * b;
}

// Division
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

// Modulus (remainder)
function modulus(a, b) {
    return a % b;
}

// Power/Exponentiation
function power(base, exponent) {
    return Math.pow(base, exponent);
}

// Square root
function squareRoot(number) {
    if (number < 0) {
        throw new Error("Cannot calculate square root of negative number");
    }
    return Math.sqrt(number);
}

// Absolute value
function absoluteValue(number) {
    return Math.abs(number);
}

// Round to nearest integer
function roundNumber(number) {
    return Math.round(number);
}

// Ceiling (round up)
function ceiling(number) {
    return Math.ceil(number);
}

// Floor (round down)
function floor(number) {
    return Math.floor(number);
}

// Find maximum of two numbers
function maximum(a, b) {
    return Math.max(a, b);
}

// Find minimum of two numbers
function minimum(a, b) {
    return Math.min(a, b);
}

// Calculate factorial
function factorial(n) {
    if (n < 0) {
        throw new Error("Cannot calculate factorial of negative number");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Check if number is even
function isEven(number) {
    return number % 2 === 0;
}

// Check if number is odd
function isOdd(number) {
    return number % 2 !== 0;
}

// Calculate area of circle
function circleArea(radius) {
    return Math.PI * Math.pow(radius, 2);
}

// Calculate circumference of circle
function circleCircumference(radius) {
    return 2 * Math.PI * radius;
}

// Demo usage
console.log("Math Operations Demo:");
console.log("Add 5 + 3:", add(5, 3));
console.log("Subtract 10 - 4:", subtract(10, 4));
console.log("Multiply 6 * 7:", multiply(6, 7));
console.log("Divide 15 / 3:", divide(15, 3));
console.log("Power 2^3:", power(2, 3));
console.log("Square root of 16:", squareRoot(16));
console.log("Factorial of 5:", factorial(5));
console.log("Circle area (radius 5):", circleArea(5));
console.log("Is 8 even?", isEven(8));
console.log("Maximum of 15 and 23:", maximum(15, 23));