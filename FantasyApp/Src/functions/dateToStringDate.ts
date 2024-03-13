const dateToStringDate = (date) =>{
    let day = date.getDay() === 0 ? 
    "Sunday" : 
    date.getDay() === 1 ? "Monday" : 
    date.getDay() === 2 ? "Tuesday" : 
    date.getDay() === 3 ? "Wednesday" : 
    date.getDay() === 4 ? "Thursday" : 
    date.getDay() === 1 ? "Friday" : 
    "Saturday"

    console.log("date.getYear(), ", date.getFullYear())
    
    return `${day} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export {dateToStringDate}