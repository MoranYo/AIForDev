
/**
 * Calculates the number of days between two dates.
 *
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} The absolute number of days between the two dates.
 */

function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.abs((date2 - date1) / oneDay);
    return diffDays;
}
