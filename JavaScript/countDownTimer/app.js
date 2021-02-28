let submitButton = document.getElementById('submitButton');

//button click event

submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    let eventName = document.getElementById('eventName').value;
    let eventNameUpdate = document.getElementById('eventNameUpdate');
    eventNameUpdate.innerText = `Event Name: ${eventName}`;
    document.getElementById('eventTimeLeft').innerText = 'Total Event Time Left';

    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let endTime = document.getElementById('endTime').value;

    let targetDate = new Date(endDate + ' ' + endTime);
    let now = new Date(new Date(startDate).toDateString());
    let timeDiff = targetDate - now;
    let remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // weekdays calculation

    let weekdays = 0;
    let currentDay = new Date().getDay();

    for (let i = 0; i < remainingDays; i++) {
        if (currentDay !== 0 && currentDay !== 6) {
            weekdays++;
        }
        currentDay++;
        if (currentDay === 7) {
            currentDay = 1;
        }
    }

    let x;
    if (weekdays > 1) {
        x = 'days';
    } else {
        x = 'day';
    }

    document.getElementById('weekDays').innerText = `Weekdays Left: ${weekdays} ${x}`;

    //calling the function 

    myTotalCounter();
});

function myTotalCounter() {

    // setInterval

    let timeInterval = setInterval(function () {
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;
        let endTime = document.getElementById('endTime').value;
        let targetDate = new Date(endDate + ' ' + endTime).getTime();

        let currentHour = new Date().getHours();
        let currentMinutes = new Date().getMinutes();
        let currentSeconds = new Date().getSeconds();
        let currentTime = `${currentHour}:${currentMinutes}:${currentSeconds}`;

        let now = new Date(startDate + ' ' + currentTime).getTime();
        let timeDiff = targetDate - now;

        // calculation of the days, hours, mins and secs
        let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // CountDown Result
        document.getElementById('days').innerText = days + 'd';
        document.getElementById('hours').innerText = hours + 'h';
        document.getElementById('mins').innerText = minutes + 'm';
        document.getElementById('secs').innerText = seconds + 's';

        if (timeDiff < 1000) {
            clearInterval(timeInterval);
            document.getElementById('days').innerText = '';
            document.getElementById('hours').innerText = '';
            document.getElementById('mins').innerText = '';
            document.getElementById('secs').innerText = '';
            document.getElementById('eventUpdate').innerText = 'Time Up!';
        }

    }, 1000);
}