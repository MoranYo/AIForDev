/**
 * AI5 Math Operations
 * A collection of basic mathematical operations and utilities
 */

// Basic arithmetic operations
function AI5_add(a, b) {
    return a + b;
}

function AI5_subtract(a, b) {
    return a - b;
}

function AI5_multiply(a, b) {
    return a * b;
}

function AI5_divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
}

// Power and root operations
function AI5_power(base, exponent) {
    return Math.pow(base, exponent);
}

function AI5_squareRoot(number) {
    if (number < 0) {
        throw new Error("Cannot calculate square root of negative number");
    }
    return Math.sqrt(number);
}

function AI5_cubeRoot(number) {
    return Math.cbrt(number);
}

// Percentage operations
function AI5_percentage(value, percentage) {
    return (value * percentage) / 100;
}

function AI5_percentageOf(part, whole) {
    if (whole === 0) {
        throw new Error("Cannot calculate percentage with zero denominator");
    }
    return (part / whole) * 100;
}

// Min/Max operations
function AI5_maximum(...numbers) {
    if (numbers.length === 0) {
        throw new Error("At least one number is required");
    }
    return Math.max(...numbers);
}

function AI5_minimum(...numbers) {
    if (numbers.length === 0) {
        throw new Error("At least one number is required");
    }
    return Math.min(...numbers);
}

// Average and statistical operations
function AI5_average(...numbers) {
    if (numbers.length === 0) {
        throw new Error("At least one number is required");
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

function AI5_median(...numbers) {
    if (numbers.length === 0) {
        throw new Error("At least one number is required");
    }
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    return sorted.length % 2 !== 0 
        ? sorted[mid] 
        : (sorted[mid - 1] + sorted[mid]) / 2;
}

// Rounding operations
function AI5_roundTo(number, decimals = 0) {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function AI5_ceiling(number) {
    return Math.ceil(number);
}

function AI5_floor(number) {
    return Math.floor(number);
}

// Absolute value and sign
function AI5_absoluteValue(number) {
    return Math.abs(number);
}

function AI5_sign(number) {
    return Math.sign(number);
}

// Factorial operation
function AI5_factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Prime number check
function AI5_isPrime(number) {
    if (number < 2) {
        return false;
    }
    if (number === 2) {
        return true;
    }
    if (number % 2 === 0) {
        return false;
    }
    
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

// Even/Odd check
function AI5_isEven(number) {
    return number % 2 === 0;
}

function AI5_isOdd(number) {
    return number % 2 !== 0;
}

// Random number generation
function AI5_randomNumber(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

function AI5_randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage and demonstration
function AI5_demonstrateMathOperations() {
    console.log("=== AI5 Math Operations Demo ===");
    console.log(`Addition: 5 + 3 = ${AI5_add(5, 3)}`);
    console.log(`Subtraction: 10 - 4 = ${AI5_subtract(10, 4)}`);
    console.log(`Multiplication: 6 * 7 = ${AI5_multiply(6, 7)}`);
    console.log(`Division: 15 / 3 = ${AI5_divide(15, 3)}`);
    console.log(`Power: 2^3 = ${AI5_power(2, 3)}`);
    console.log(`Square root of 16 = ${AI5_squareRoot(16)}`);
    console.log(`Average of 1,2,3,4,5 = ${AI5_average(1, 2, 3, 4, 5)}`);
    console.log(`Factorial of 5 = ${AI5_factorial(5)}`);
    console.log(`Is 17 prime? ${AI5_isPrime(17)}`);
    console.log(`Random number between 1-10: ${AI5_randomInteger(1, 10)}`);
}

// Export functions for use in other modules (if using Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AI5_add,
        AI5_subtract,
        AI5_multiply,
        AI5_divide,
        AI5_power,
        AI5_squareRoot,
        AI5_cubeRoot,
        AI5_percentage,
        AI5_percentageOf,
        AI5_maximum,
        AI5_minimum,
        AI5_average,
        AI5_median,
        AI5_roundTo,
        AI5_ceiling,
        AI5_floor,
        AI5_absoluteValue,
        AI5_sign,
        AI5_factorial,
        AI5_isPrime,
        AI5_isEven,
        AI5_isOdd,
        AI5_randomNumber,
        AI5_randomInteger,
        AI5_demonstrateMathOperations
    };
}

// Run demonstration if file is executed directly
if (typeof window === 'undefined' && require.main === module) {
    AI5_demonstrateMathOperations();
}