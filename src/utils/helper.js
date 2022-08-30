
const daysInAMonth = { 1: 31, 2: 31, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 }

export function handleDatesToDate(date) {

    let calculatedDate = "";

    const today = new Date();
    const target = new Date(date);

    let todayDate = today.getDate();
    let targetDate = target.getDate();

    let monthDiff = today.getMonth() - target.getMonth();

    if(monthDiff === 0) {
        const diff = todayDate - targetDate;
        if(diff === 0) {
            calculatedDate = "Today";
        } else {
            calculatedDate = diff + " days ago";
        }
    } 
    if(monthDiff === 1) {
        const getLastMonthDays = daysInAMonth[target.getMonth() + 1];
        todayDate += getLastMonthDays;
        const diff = todayDate - targetDate;

        if(diff === getLastMonthDays) {
            calculatedDate = "1 Month ago";
        } else {
            calculatedDate = diff + " days ago";
        }
    } else {
        calculatedDate = `May ${target.getDate()}, ${target.getFullYear()}`
    }

    return calculatedDate;
}