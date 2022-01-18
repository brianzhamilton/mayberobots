/* Maybe Robots Website JavaScript
     Author:   Brian Hamilton
     Date:     02/17/2020
     Filename: podcast.js
*/

// global variables
var daysOfWeek = [  "Sunday", "Monday", "Tuesday", 
                    "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = [   "January", "February", "March", "April", 
                    "May", "June", "July", "August", 
                    "September", "October", "November", "December"];
var today = new Date();
var tableCell = document.getElementsByTagName("td");

// add month-year caption to calendar
function addCalCaption() {
     var caption = document.getElementsByTagName("caption");
     caption[0].innerHTML = monthName[today.getMonth()] + " " + today.getFullYear();
}

// function for assigning days of the week to calendar headers
function addDaysOfWeek() {
     var weekHeader = document.getElementsByTagName("th");
     if (screen.width < 450) {
          daysOfWeek = [ "Su", "Mo", "Tu", 
                         "We", "Th", "Fr", "Sa"];
     } else if (screen.width >= 450 && screen.width < 768) {
          daysOfWeek = [ "Sun", "Mon", "Tue", 
                         "Wed", "Thu", "Fri", "Sat"];
     }
     for (var i = 0; i < weekHeader.length; i++) {
          weekHeader[i].innerHTML = daysOfWeek[i];
     }
}

// assigning class names to table cells
function addClassNames() {
     var day = 0;
     for (var i = 0; i < tableCell.length; i++) {
          tableCell[i].className = daysOfWeek[day];
          day++;
          if (day > 6) {
               day -= 7
          }
     }
}

// adds calendar dats
function addCalendarDates() {
     var thisYr = today.getFullYear();
     var thisMo = today.getMonth();
     var daysInMonth;

     // appendChild <p> tags to table cells
     for (var i = 0; i < tableCell.length; i++) {
          var cellDate = document.createElement("p");
          cellDate.setAttribute("class", "dateTag");
          tableCell[i].appendChild(cellDate);
     }

     // determine number of days in the month
     // accounting for leap years and centennial leap years
     if (thisMo === 1) { // if month is February
          if (thisYr % 4 === 0) { // if year is leap year
               if (thisYr % 100 === 0) { // if year ending in 00
                    if (thisYr % 400 === 0) { // except if year divisible by 400
                         daysInMonth = 29;
                    } else {
                         daysInMonth = 28;
                    }
               } else {
                    daysInMonth = 29;
               }
          } else {
               daysInMonth = 28;
          }
     } else if (thisMo === 3 || thisMo === 5 || thisMo === 8 || thisMo === 10) {
          daysInMonth = 30;          
     } else {
          daysInMonth = 31;
     }

     // populates dates based upon current month and weekday
     var cellDate = document.querySelectorAll("p.dateTag");
     var startDate = (today.getDay() + 1) - today.getDate();
     while (startDate < 0) {
          startDate += 7
     }
     for (var i = 1; i <= daysInMonth; i++) {
          cellDate[(i - 1) + startDate].innerHTML = i;
     }
}

// populates release date 
function addReleaseDates() {
     var cellDate = document.querySelectorAll("p.dateTag");
     var eventInsert = "";
     if (screen.width < 450) {
          eventInsert = "New BFS Ep.";
     } else if (screen.width >= 450 && screen.width < 768) {
          eventInsert = "New BFS Episode!";
     } else {
          eventInsert = "New Breakfast Surreal Episode!";
     }
     // appendChild <p> tags to table cells
     for (var i = 0; i < tableCell.length; i++) {
          var cellTag = document.createElement("span");
          cellTag.setAttribute("class", "cellTag");
          tableCell[i].appendChild(cellTag);
     }
     for (var i = 0; i < tableCell.length; i++) {
          cellTag = document.querySelectorAll("span.cellTag");
          if ((tableCell[i].className === "Monday" || tableCell[i].className === "Mon" || tableCell[i].className === "Mo") && cellDate[i].innerHTML !== "") {
               cellTag[i].innerHTML = eventInsert;
          }
     }
}

// remove unnecessary table cells
function removeCells() {
     var extraRow = document.getElementsByTagName("tr");
     var extraCell = document.getElementsByTagName("td");
     for (var i = 30; i < tableCell.length; i++) {
          if (i > 30 && extraCell[i].innerHTML === '<p class="dateTag"></p><span class="cellTag"></span>') {
               extraRow[6].removeChild(extraCell[41]);
               extraRow[6].removeChild(extraCell[40]);
               extraRow[6].removeChild(extraCell[39]);
               extraRow[6].removeChild(extraCell[38]);
               extraRow[6].removeChild(extraCell[37]);
               extraRow[6].removeChild(extraCell[36]);
               extraRow[6].removeChild(extraCell[35]);
          }
     }
}

// function to set up page
function setUpPage() {
     addCalCaption();
     addDaysOfWeek();
     addClassNames();
     addCalendarDates();
     addReleaseDates();
     removeCells();
}

// runs setUpPage() function when page loads
if (window.addEventListener) {
     window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
     window.attachEvent("onload", setUpPage);
}