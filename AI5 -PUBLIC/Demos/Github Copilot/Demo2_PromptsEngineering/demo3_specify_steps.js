// Your goal is to write a function that returns the factorial of a given number.
// steps:
// 1. Define a function named 'factorial' that takes one parameter 'n'.
// 2. Inside the function, check if 'n' is less than 0. If it is, return 'undefined'.
// 3. If 'n' is 0, return 1 (since the factorial of 0 is 1).
// 4. Initialize a variable 'result' to 1.
// 5. Use a for loop to iterate from 1 to 'n', multiplying 'result' by the loop index in each iteration.
// 6. After the loop, return the 'result'.

function factorial(n) {
    if (n < 0) {
        return undefined;
    }
    if (n === 0) {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}