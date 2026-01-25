// Create a function that receives an array of numbers
// and reuturns their sum



function sumArray(numbers) {
    try {
        if (!Array.isArray(numbers)) {
            throw new Error("Input must be an array");
        }
        return numbers.reduce((acc, curr) => acc + curr, 0);
    } catch (error) {
        console.error("An error occurred:", error.message);
        return null;
    }
}