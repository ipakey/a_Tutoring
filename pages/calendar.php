<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="description" content="160 chr of eyecatchin SEO content for google search written in good english">
    <meta name="keywords" content="keyword1, keyword2, etc">
    <author name="author" content="Yfke"></author>
    <meta name="robots" content="index">
    <meta http-equiv="refresh" content="" 5;url="#">

    <title>ts . Yfke</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Aboreto&family=Alex+Brush&family=Caveat&family=Condiment&family=Explora&display=swap+Dosis:wght@200&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Yaldevi&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../format/style.css" />


</head>
<?php
function build_calendar($month, $year)
{
    if (isset($_GET['month'])) {
        $month = $_GET['month'];
        $year = $_GET['year'];
    }

    $mysqli = new mysqli('localhost', 'root', '', 'bookingcalendar');
    $stmt = $mysqli->prepare("SELECT *from bookings where MONTH(date)=? AND YEAR(date)=?");
    $stmt->bind_param('ss', $month, $year);
    $bookings = array();
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $bookings[] = $row['date'];
            }
            $stmt->close();
        }
    }

    //First create an array of days of the week
    $daysOfWeek = array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

    //get the first day of the month
    $firstDayOfMonth = mktime(0, 0, 0, $month, 1, $year);

    //get number of days in month
    $numberOfDays = date('t', $firstDayOfMonth);

    //get other information about the first day of this month
    $dateComponents = getDate($firstDayOfMonth);
    $monthName = $dateComponents['month'];
    $dayOfWeek = $dateComponents['wday'];
    $dateToday = date('Y-m-d');


    //create html table

    $calendar = "<table class='month'>";
    $calendar .= "<center><h2 class='month'>$monthName $year</h2></tr>
    <tr><center>";
    $calendar .= "<a class='month-btns' href='?month=" . date("m", mktime(0, 0, 0, $month - 1, 1, $year)) . "&year=" . date("Y", mktime(0, 0, 0, $month - 1, 1, $year)) . "'> <img class='arrow prev' src='./images/navigateLeftBlue.png' alt='left arrow'> Previous Month</a>";

    $calendar .= "<a class='month-btns' href='?month=" . date("m") . "&year=" . date("Y") . "'>Current Month</a>";

    $calendar .= "<a class='month-btns' href='?month=" . date("m", mktime(0, 0, 0, $month + 1, 1, $year)) . "&year=" . date("Y", mktime(0, 0, 0, $month + 1, 1, $year)) . "'> Next Month <img class='arrow next' src='./images/navigateRightBlueIcon.png' alt='right arrow'> </a></center>";

    $calendar .= "<tr class='weekdays'>";
    //calendar headers
    foreach ($daysOfWeek as $day) {
        $calendar .= "<th class='dayName'>$day</th>";
    }
    $calendar .= "</tr>";
    $calendar .= "<tr>";
    //the variable $daysOfWeek will ensure 7 columns in table
    if ($dayOfWeek > 0) {
        for ($k = 0; $k < $dayOfWeek; $k++) {
            $calendar .= "<td></td>";
        }
    }

    //initiate day counter
    $currentDay = 1;
    $month = str_pad($month, 2, "0", STR_PAD_LEFT);


    while ($currentDay <= $numberOfDays) {

        // if 7th coumn reachedthen start a new row
        if ($dayOfWeek == 7) {
            $dayOfWeek = 0;
            $calendar .= "</tr><tr>";
        }

        $currentDayRel = str_pad($currentDay, 2, "0", STR_PAD_LEFT);
        $date = "$year-$month-$currentDayRel";
        $dayName = strtolower(date('I', strtotime($date)));
        $eventNum = 0;

        $today = $date == date('Y-m-d') ? "today" : "";
        if ($date < date('Y-m-d')) {
            $calendar .= "<td><button class='btn btn-na'><h4>$currentDay</h4>N/A</button></td>";
        } else {
            $calendar .= "<td class='" . $today . "'><button id='submit-bkg' type='submit'class='btn btn-bk'><a class='date-book ' href='./assets/pages/book.php?date=" . $date . "'><h4 >$currentDay</h4>Book</a></button></td>";
        }

        //increment counters
        $currentDay++;
        $dayOfWeek++;
    }

    if ($dayOfWeek != 7) {
        $remainingDays = 7 - $dayOfWeek;
        for ($i = 0; $i < $remainingDays; $i++) {
            $calendar .= "<td></td>";
        }
    }

    $calendar .= "</tr>";
    $calendar .= "</table>";

    echo $calendar;
}


?>



<container>
    <div class="row">
        <div class="page">
            <?php
            $dateComponents = getDate();
            $month = $dateComponents['mon'];
            $year = $dateComponents['year'];
            echo build_calendar($month, $year);
            ?>
        </div>
    </div>
    <div class="left">
        <div class="calendar">
            <div class="month">
                <img class="arrow prev" src="./icons/navigateLeftBlue.png" alt="left arrow">
                <div class="date"></div>
                <img class="arrow next" src="./icons/navigateRightBlueIcon.png" alt="right arrow">
            </div>
            <div class="weekdays">
                <div class="dayName">Mon</div>
                <div class="dayName">Tue</div>
                <div class="dayName">Wed</div>
                <div class="dayName">Thu</div>
                <div class="dayName">Fri</div>
                <div class="dayName">Sat</div>
                <div class="dayName">Sun</div>
            </div>
            <div class="days"></div>
            <!--!we will add the days with js  -->
            <div class="goto-today">
                <div class="goto event-btn">
                    <input type="text" class="date-input" placeholder="MM/YYYY" />
                    <button class=" goto-btn event-btn">go
                    </button>
                </div>
                <button class="event-btn today-btn">Goto today</button>
            </div>
        </div>
    </div>
    <div class="right">
        <div class="today-date">
            <div class="event-day"></div>
            <div class="event-date"></div>
        </div>
        <div class="events">
            <!--! We will add events through js script -->
        </div>
        <div class="add-event-wrapper">
            <div class="add-event-header">
                <div class="title">Add Event</div>
                <img class="arrow" src="./icons/taskGoldClock.png" alt="event Icon arrow">
            </div>
            <div class="add-event-body">
                <div class="add-event-input">
                    <input type="text"
                        id="event-name"
                        class="event-name" placeholder="Event Name" required>
                </div>
                <div class="halfway">
                    <div class="add-event-input">
                        <label for="time-input-from">From:</label>
                        <input type="text" id="time-input-from" name="from-time"
                            step="600" class="event-time" value="09:00" required>
                        <span class="validity"></span>
                    </div>
                    <div class="add-event-input">
                        <label for="time-input-to">To:</label>
                        <input type="text" id="time-input-to" name="to-time" class="event-time" step="600" value="09:30" required pattern="[0-9]{2}:[0-9]{2}" />
                        <span class="validity"></span>
                    </div>
                </div>
                <div class="add-event-input">
                    <input type="text"
                        id="event-details" class="event-details" placeholder="Event Details">
                </div>

            </div>
            <div class="add-event-footer">
                <button class="add-event-btn event-btn add-btn ">Add event</button>
                <!-- <button class="edit-event-btn event-btn edit-btn ">Edit event</button> -->
                <button class="close-event-btn event-btn close-btn ">Close event</button>
            </div>
        </div>
        <div class="menu-buttons">
            <button class="manage-events-btn event-btn " id="event-form">Manage Events
            </button>
        </div>
    </div>
</container>
<footer>
    <p>
    </p>
</footer>
</body>

</html>
</body>

</html>