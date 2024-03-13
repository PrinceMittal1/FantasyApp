const sortingAllContest = (data: any) => {
    data.sort((a, b) => {
        // Compare starting years
        if (a.startingyear !== b.startingyear) {
            return a.startingyear - b.startingyear;
        }
        // Compare starting months
        if (a.startingmonth !== b.startingmonth) {
            return a.startingmonth - b.startingmonth;
        }
        // Compare starting dates
        if (a.startingdate !== b.startingdate) {
            return a.startingdate - b.startingdate;
        }
        // Compare starting hours
        if (a.startinghour !== b.startinghour) {
            return a.startinghour - b.startinghour;
        }
       
        return 0;
    });
    return data
}

export default sortingAllContest