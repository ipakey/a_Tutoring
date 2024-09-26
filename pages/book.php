<?php

if (isset($_GET['date'])) {
    $date = $_GET['date'];
}

if (isset($_POST['submit-booking'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $student = $_POST['student'];
    $type = $_POST['type'];
    $timeslot = $_POST['timeslot'];
    $uid = $_POST['uid'];
    $location = $_POST['location'];
    $paid = "N";
    $completed = "N";

    $mysqli = new mysqli('localhost', 'root', '', 'bookingcalendar');
    $stmt = $mysqli->prepare("INSERT INTO bookings(email, uid, student, location , subject , grpind, date, timeslot, paid, completed ) VALUES (?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param('ssssssssss', $email, $uid, $student, $location, $subject, $type, $date, $timeslot, $paid, $completed);
    $stmt->execute();
    $msg = "<div class='alert alert-success'>Booking Successful</div>";
    $stmt->close();
    $mysqli->close();
}

$duration = 25;
$cleanup = 5;
$start = "15:00";
$end = "21:00";

function timeslots($duration, $cleanup, $start, $end)
{
    $start = new DateTime($start);
    $end = new DateTime($end);
    $interval = new DateInterval("PT" . $duration . "M");
    $cleanupinterval = new DateInterval("PT" . $cleanup . "M");
    $slots = array();
    for ($intStart = $start; $intStart < $end; $intStart->add($interval)->add($cleanupinterval)) {
        $endPeriod = clone $intStart;
        $endPeriod->add($interval);
        if ($endPeriod > $end) {
            break;
        }

        $slots[] = $intStart->format("g:ia") . "-" . $endPeriod->format("g:ia");
    }
    return $slots;
}
