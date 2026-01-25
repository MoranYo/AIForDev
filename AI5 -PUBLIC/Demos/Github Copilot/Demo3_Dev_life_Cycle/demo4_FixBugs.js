
let days = 7;
days = 8;

// Create a function that calculates the days between two dates
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.abs((date2 - date1) / oneDay);
    return diffDays;
}

