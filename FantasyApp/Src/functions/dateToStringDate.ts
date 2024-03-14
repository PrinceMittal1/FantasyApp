const dateToStringDate = (date) => {
    let currentDateAndTime = new Date();
    let laterDateForTime = new Date(date.getTime() + (2 * 60 * 60 * 1000));
    let laterDateForDays = new Date(date.getTime() + (2 * 60 * 60 * 1000)); // Adding 2 hours
    let day = date?.getDay() === 0 ?
        "Sunday" :
        date?.getDay() === 1 ? "Monday" :
            date?.getDay() === 2 ? "Tuesday" :
                date?.getDay() === 3 ? "Wednesday" :
                    date?.getDay() === 4 ? "Thursday" :
                        date?.getDay() === 1 ? "Friday" :
                            "Saturday"

    return {
        day: day,
        startingdate: date.getDate(),
        startingmonth: date.getMonth() + 1,
        startingyear: date.getFullYear(),
        endingdate: laterDateForDays.getDate(),
        endingmonth: laterDateForDays.getMonth() + 1,
        endingyear: laterDateForDays.getFullYear(),
        startinghour: currentDateAndTime.getHours() % 12 < 10 ? `0${currentDateAndTime.getHours() % 12}` : currentDateAndTime.getHours() % 12,
        startingtime: currentDateAndTime.getMinutes() < 10 ? `0${currentDateAndTime.getMinutes()}`:currentDateAndTime.getMinutes(),
        endinghour: laterDateForTime.getHours() % 12 < 10 ? `0${laterDateForTime.getHours() % 12}` : laterDateForTime.getHours() % 12,
        endingtime: laterDateForTime.getMinutes() < 10 ? `0${laterDateForTime.getMinutes()}`:laterDateForTime.getMinutes(),
        startingschedule : currentDateAndTime.getHours() > 11 ? "PM":"AM",
        endingschedule : laterDateForTime.getHours() > 11 ? "PM":"AM", 
    }
}

export { dateToStringDate }