// ! Create the calendar

// ? variables

const calendar = document.querySelector('.calendar'),
  date = document.querySelector('.date'),
  daysContainer = document.querySelector('.days'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  todayBtn = document.querySelector('.today-btn'),
  gotoBtn = document.querySelector('.goto-btn'),
  dateInput = document.querySelector('.date-input'),
  eventDay = document.querySelector('.event-day'),
  eventDate = document.querySelector('.event-date'),
  eventsContainer = document.querySelector('.events')

addEventBtn = document.querySelector('.manage-events-btn ')
addEventCloseBtn = document.querySelector('.close-event-btn')
addEventWrapper = document.querySelector('.add-event-wrapper')

addEventTitle = document.querySelector('#event-name')
addEventFrom = document.querySelector('#time-input-from')
addEventTo = document.querySelector('#time-input-to')
addEventDetails = document.querySelector('#event-details')
console.log('L28 vars eTitle: ' + addEventTitle.value + ' eFrom: ' + addEventFrom.value + ' eTo: ' + addEventTo.value + ' eDetails' + addEventDetails.value)

addEventSubmit = document.querySelector('.add-event-btn')

// ? check source data
console.log(
  'variables:  calendar: ' +
    calendar.classList +
    ' date: ' +
    date.classList +
    ' daysContainer: ' +
    daysContainer.classList +
    ' prev: ' +
    prev.classList +
    ' next: ' +
    next.classList +
    ' todayBtn: ' +
    todayBtn.classList +
    ' gotoBtn: ' +
    gotoBtn.classList +
    ' dateInput: ' +
    dateInput.classList +
    ' addEventBtn: ' +
    addEventBtn.classList +
    ' addEventCloseBtn: ' +
    addEventCloseBtn.classList +
    '  addEventContainer: ' +
    addEventWrapper.classList
)

// ? initialise data

let today = new Date()
let activeDay
let month = today.getMonth()
let year = today.getFullYear()
console.log('hello  month:  ' + month + ' year: ' + year)

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// ? default events array
const eventsArr = [
  {
    day: 16,
    month: 05,
    year: 2023,
    events: [
      {
        title: 'Put cats out',
        from: '09:50',
        to: '10:00',
        details: 'make sure Suky goes out',
      },
      {
        title: 'Load dishwasher',
        from: '10:00',
        to: '10:10',
        details: 're-salt the reservoir',
      },
    ],
  },
  {
    day: 05,
    month: 05,
    year: 2023,
    events: [
      {
        title: 'Put cats out',
        from: '9:50',
        to: '10:00',
        details: 'make sure Suky goes out',
      },
      {
        title: 'Scouts',
        from: '7:00',
        to: '10:10',
        details: 'take your smile with you',
      },
    ],
  },
]

// ?function to add days

function initCalendar() {
  // to get starting data for current month display
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)
  const prevDays = prevLastDay.getDate()
  const day = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const nextDays = 7 - lastDay.getDay()

  console.log('first day: ' + firstDay + ' last day: ' + lastDay + ' prev last day: ' + prevLastDay + ' prev days: ' + prevDays + 'last date: ' + lastDate + ' day: ' + day + ' next days: ' + nextDays)

  // update date at top of calendar
  // console.log(date +' L58');
  date.innerHTML = months[month] + ' ' + year

  let days = ''

  // prev months days
  if (day == 0) {
    let sunday = 6
    for (let x = sunday; x > 0; x--) {
      days += `<div class='day prev-day'>${prevDays - x + 2}</div>`
    }
  } else
    for (let x = day; x > 1; x--) {
      days += `<div class='day prev-day'>${prevDays - x + 2}</div>`
    }
  // console.log( 'days L70: ' + days);

  // current month days
  for (let i = 1; i <= lastDate; i++) {
    // check if event present on current date
    let event = false
    eventsArr.forEach((eventObj) => {
      if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
        // if event is found
        event = true
      }
    })

    //if day is today add class 'today'
    if (i == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()) {
      activeDay = i
      getActiveDay(i)
      updateEvents(i)

      //if event found also add event classes today and active
      //
      if (event) {
        days += `<div class='day active today event'>${i}</div>`
        console.log('Event found on: ' + i)
      } else {
        days += `<div class='day today active'>${i}</div>`
        //console.log("Event not found on: " + i);
      }
    }
    // add remaining days this month
    else {
      if (event) {
        days += `<div class='day event'>${i}</div>`
        console.log('Event found on: ' + i)
      } else {
        days += `<div class='day'>${i}</div>`
        //console.log("Event not found on: " + i);
      }
    }
  }
  // add next month days
  if (nextDays < 7) {
    for (let j = 1; j < nextDays + 1; j++) {
      days += `<div class='day next-day'>${j}</div>`
    }
  }
  // console.log( 'days L101: ' + days);
  daysContainer.innerHTML = days
  //add listener to created days
  addListener()
}

initCalendar()

// ! button functionality

// last month
function prevMonth() {
  month--
  if (month < 0) {
    month = 11
    year--
  }
  initCalendar()
}

// next month

function nextMonth() {
  month++
  if (month > 11) {
    month = 0
    year++
  }
  initCalendar()
}

// add eventlistener on prev and next
prev.addEventListener('click', prevMonth)
next.addEventListener('click', nextMonth)

// add goto date and goto today functionality

todayBtn.addEventListener('click', () => {
  console.log('today input event listener activated L137 classes: ' + todayBtn.classList)
  today = new Date()
  month = today.getMonth()
  year = today.getFullYear()
  initCalendar()
  return
})

dateInput.addEventListener('input', (e) => {
  //only allow numbers remove anything else
  console.log('date input event listener activated L145')
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, '')
  if (dateInput.value.length == 2) {
    // add a slash if two numbers entered
    dateInput.value += '/'
  }
  if (dateInput.value.length > 7) {
    //don't allow more than 7 characters
    dateInput.value = dateInput.value.slice(0, 7)
  }
  //if backspace is pressed
  if (e.inputType == 'deleteContentBackward') {
    if (dateInput.value.length == 3) {
      dateInput.value = dateInput.value.slice(0, 2)
    }
  }
})

gotoBtn.addEventListener('click', gotoDate)
//   console.log('goto button event listener activated L172');

function gotoDate() {
  const dateArr = dateInput.value.split('/')
  console.log(dateArr)
  // some data validation
  if (dateArr.length == 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1
      year = dateArr[1]
      initCalendar()
      return
    }
  }
  // for an invalid date
  alert('invalid date')
}

// !Manage Events button functionallity

addEventBtn.addEventListener('click', () => {
  //console.log(' addEventBtn clicked' + addEventWrapper.classList);
  addEventWrapper.classList.add('show')
  //console.log(' addEventWrapper: ' + ' ' +addEventWrapper.classList);
})

addEventCloseBtn.addEventListener('click', () => {
  //console.log(' addEventCloseBtn clicked' + addEventWrapper.classList);
  addEventWrapper.classList.remove('show')
  //console.log(' addEventCloseBtn: ' + ' ' +addEventWrapper.classList);
})

document.addEventListener('click', (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    //console.log(' outside area clicked and addEventWrapper classList: ' + addEventWrapper.classList);
    addEventWrapper.classList.remove('show')
  }
  //console.log(' outside area clicked and addEventWrapper classList: ' + ' ' +addEventWrapper.classList);
})

// ! Event validation

// only allow 50 chr in title field

addEventTitle.addEventListener('input', (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 50)
})

// Time format for From & To times

addEventFrom.addEventListener('input', (e) => {
  // remove anything but numbers
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/)
  if (addEventFrom.value.length === 2) {
    // if 2 numbers entered add :
    addEventFrom.value += ':'
  }
  if (addEventFrom.value.length > 5) {
    // dont let users add more than 5 char
    addEventFrom.value = addEventFrom.value.slice(0, 5)
  }
})

addEventTo.addEventListener('input', (e) => {
  // remove anything but numbers
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/)
  if (addEventFrom.value.length === 2) {
    // if 2 numbers entered add :
    addEventTo.value += ':'
  }
  if (addEventFrom.value.length > 5) {
    // dont let users add more than 5 char
    addEventTo.value = addEventTo.value.slice(0, 5)
  }
})

// ! add event listener for days after render

function addListener() {
  const days = document.querySelectorAll('.day')
  days.forEach((day) => {
    day.addEventListener('click', (e) => {
      // set current day as active day
      activeDay = Number(e.target.innerHTML)
      console.log('Active day: ' + activeDay)

      // call active day after click
      getActiveDay(e.target.innerHTML)
      updateEvents(Number(e.target.innerHTML))

      //remove active from already active day
      days.forEach((day) => {
        day.classList.remove('active')
        // console.log("L344 addListener() classlist for day selected: " +  day.classList);
      })
      // if prev month day clicked go to previous month and add active
      if (e.target.classList.contains('prev-day')) {
        prevMonth()

        setTimeout(() => {
          //select all days of that month
          const days = document.querySelectorAll('.day')

          //after going to the prev month add active to the clicked day
          days.forEach((day) => {
            if (!day.classList.contains('prev-day') && day.innerHTML === e.target.innerHTML) {
              day.classList.add('active')
              console.log('active day L356: ' + day.classList + '  ' + day.innerHTML)
            }
          })
        }, 100)
      } else if (e.target.classList.contains('next-day')) {
        nextMonth()

        setTimeout(() => {
          //select all days of that month
          const days = document.querySelectorAll('.day')

          //after going to the prev month add active to the clicked day
          days.forEach((day) => {
            if (!day.classList.contains('next-day') && day.innerHTML === e.target.innerHTML) {
              day.classList.add('active')
              console.log('active day L356: ' + day.classList + '  ' + day.innerHTML)
            }
          })
        }, 100)
      }
      // remaining current month days
      else e.target.classList.add('active')
    })
  })
}

//show the active day events and date at top

function getActiveDay(date) {
  console.log(date)
  const day = new Date(year, month, date)
  const dayName = day.toString().split(' ')[0]
  eventDay.innerHTML = dayName
  eventDate.innerHTML = date + ' ' + months[month] + ' ' + year
}

//? function to show events of the day

function updateEvents(date) {
  console.log('F updateEvents L410 input date:  ' + date)

  let events = ''
  eventsArr.forEach((event) => {
    // get events for active day only
    if (date == event.day && month + 1 == event.month && year == event.year) {
      //show event on document
      event.events.forEach((event) => {
        events += `
        <div class="event">
          <div class="title">
              <img class="list-icon
              " src="./icons/cogs.png" alt="" srcset="">
              <h3 class="event-title">${event.title}
              <h3 class="event-time">${event.from} - ${event.to}</h3>
          </div>
          <div class="event-details">
              <p>${event.details}</p>
          </div>
        </div>`
        // console.log(events + "F updateEvents L434 after event rendered to html");
      })
    }
  })
  //if nothing found
  if (events === '') {
    events = ` <div class="no-event">
          <p>No Events</p></div>`
  }
  console.log('no events  L452')
  eventsContainer.innerHTML = events
}

// ? Add an event

addEventSubmit.addEventListener('click', () => {
  const eventTitle = addEventTitle.value
  const eventTimeFrom = addEventFrom.value
  const eventTimeTo = addEventTo.value
  const eventDetails = addEventDetails.value

  console.log('L464 vars eTitle: ' + addEventTitle.value + ' eFrom: ' + addEventFrom.value + ' eTo: ' + addEventTo.value + ' eDetails' + addEventDetails.value)

  // some validation

  if (eventTitle == '' || eventTimeFrom == '' || eventTimeTo == '') {
    alert('Please fill in the compulsory (*) fields')
    return
  }

  const timeFromArr = eventTimeFrom.split(':')
  const timeToArr = eventTimeTo.split(':')

  if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59) {
    alert('Invalid Time Format: ')
    return
  }

  const timeFrom = convertTime(eventTimeFrom)
  const timeTo = convertTime(eventTimeTo)
  // const timeFrom = eventTimeFrom;
  // const timeTo = eventTimeTo;
  const eDetails = eventDetails
  console.log('L495 after conv timeFrom: ' + timeFrom + ' timeTo: ' + timeTo)

  newEvent = {
    title: eventTitle,
    time: timeFrom + ' - ' + timeTo,
    details: eDetails,
  }

  let eventAdded = false

  //check if eventArr is not empty
  if (eventsArr.length > 0) {
    //check if current day has already got any event and then add to that array
    eventsArr.forEach((item) => {
      if (item.day == activeDay && item.month == month + 1 && item.year == year) {
        item.events.push(newEvent)
        eventAdded = true
      }
      console.log('New Event: ' + newEvent)
    })
  }

  // if event array empty or current day has no event create new

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    })
  }

  //remove active from add event form
  addEventWrapper.classList.remove('active')
  //clear the fields
  addEventTitle.value = ''
  addEventFrom.value = ''
  addEventTo.value = ''
  addEventDetails = ''

  //show current added evenent
  updateEvents(activeDay)

  //also add event class to newly added day if not already

  const activeDayElem = document.querySelector('.day.active')
  if (!activeDayElem.classList.contains('event')) {
    activeDayElem.classList.add('event')
  }
})

function convertTime(time) {
  let timeArr = time.split(':')
  let timeHour = timeArr[0]
  //console.log("Time calc L552: " + timeHour);
  let timeMinute = timeArr[1]
  //console.log("Time calc L554: " + timeMinute);
  let timeFormat = timeHour >= 12 ? 'PM' : 'AM'
  timeHour = timeHour % 12 || 12
  time = timeHour + ':' + timeMinute + ' ' + timeFormat
  console.log('Time calc L558: ' + time)
  return time
}
